import { Component, Optional, Output, EventEmitter, HostBinding, HostListener, OnInit, Input, ViewChild, ViewChildren, Renderer, AfterViewInit, AfterContentInit, OnDestroy, ElementRef, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicFormQuestionOptionComponent } from './../dynamic-form-question-option/dynamic-form-question-option.component';
import { transformPanel, transformTrigger } from './dynamic-form-question-autocomplete.animation';
import { AutocompleteControlService } from './../../../services/autocomplete-control.service';
import { Subscription } from 'rxjs/Subscription';
import { coerceBooleanProperty } from './../../../core/core';
import { ListKeyManager } from './../../../core/a11y/list-key-manager';
import { ConnectedOverlayPositionChange } from './../../../core/overlay/position/connected-position';
import { ENTER, SPACE, TAB } from './../../../core/keyboard/keycodes';


const noop = () => { };
let autocompleteId = 0;

/**
 * Provider Expression that allows df-autocomplete to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const DF_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormQuestionAutocompleteComponent),
	multi: true
};

/**
 *	Autocomplete Question
 *
 *	Selector: df-autocomplete
 *	Example:
 *		<df-autocomplete
 *			class="df-question"
 *			[placeholder]="question.placeholder"
 *			[type]="question.type"
 *			[ariaLabel]="question.label"
 * 			[ariaLabelledby]="question.key"
 *			[items]="question.options"]
 *			[isDisabled]="control.disabled"
 *			[required]="question.required"
 *			[serviceUrl]="question.serviceUrl"
 *			[formControl]="control">
 *		</df-autocomplete>
 *
 *	Unique Model Properties:
 *		@param {'all' | 'search' | 'options'} type - The type of autocomplete
 *		@param {string} serviceUrl - The url of the service the autocomplete will connect to
 *		@param {AutocompleteItem[]} options - The AutocompleteItems available
 *		@param {string} placeholder - The placeholder text
 *	
 */

@Component({
	selector: 'df-autocomplete',
	templateUrl: './dynamic-form-question-autocomplete.component.html',
	styleUrls: ['./dynamic-form-question-autocomplete.component.scss'],
	providers: [DF_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR, AutocompleteControlService],
	animations: [transformPanel, transformTrigger]
})

export class DynamicFormQuestionAutocompleteComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnDestroy {

	// The Viewvalue of the Input Field
	private _viewValue: string;

	// Value of the Autocomplete
	private _value: { id: string, text: string } = { id: null, text: null };

	// Whether the overlay panel is open
	private _panelOpen = false;

	// What option is currently selected - Not really used in autocomplete
	private _selected: DynamicFormQuestionOptionComponent;

	/** Subscriptions to option events. */
	private _subscriptions: Subscription[] = [];

	/** Subscription to changes in the option list. */
	private _changeSubscription: Subscription;

	/** Subscription to tab events while overlay is focused. */
	private _tabSubscription: Subscription;

	/** Whether filling out the select is required in the form.  */
	private _required: boolean = false;

	/** Whether the select is disabled.  */
	private _disabled: boolean = false;

	/** Manages keyboard events for options in the panel. */
	_keyManager: ListKeyManager;

	/** The IDs of child options to be passed to the aria-owns attribute. */
	private _optionIds: string = '';

	/** View -> model callback called when value changes */
	private _onChangeCallback: (_: any) => void = noop;

	/** View -> model callback called when select has been touched */
	private _onTouchedCallback: () => void = noop;

	// Prevents the overlay from opening if the input text is empty, even if autocomplete service
	// is still returning
	private _isReadyToOpen = false;

	/** The value of the select panel's transform-origin property. */
	_transformOrigin: string = 'top';

	// Instances of Currently Available Autocomplete Options	
	@ViewChildren(DynamicFormQuestionOptionComponent) options: QueryList<DynamicFormQuestionOptionComponent>;
	// The array of the autocomplete options
	autocompleteItems: { id: string, text: string }[];

	get viewValue(): any { return this._viewValue; };
	@Input() set viewValue(v: any) {
		this._viewValue = v;
		this.queryControl.setValue(v, { emitEvent: false });
	}

	get value(): { id: string, text: string } { return this._value; };
	@Input() set value(v: { id: string, text: string }) {
		this.viewValue = v.text;
		if (v.id !== this._value.id) {
			this._value = v;
			this._onChangeCallback(v);
		}
	}

	// Aria Values	
	@Input() ariaLabel: string;
	@Input() ariaLabelledby: string;

	// The type of autocomplete - search | options | all	
	@Input() type: string;

	// If autocomplete type is equal to options - these are the options from the question model
	@Input() items: AutocompleteItem[];

	// The ServiceURL the autocomplete will connect to if set to options | all
	@Input() serviceUrl: string;
	@Input() placeholder: string;

	@Input() link: string;

	// The Control for Autocomplete Question
	@Input() formControl: FormControl;

	/** Events emitted when the overlay is open/closed */
	@Output() onOpen = new EventEmitter();
	@Output() onClose = new EventEmitter();

	@Input('isDisabled')
	set isDisabled(v) {
		this.disabled = v;
	}

	@Input()
	get disabled() {
		return this._disabled;
	}
	set disabled(value: any) {
		this._disabled = coerceBooleanProperty(value);
		if (this._disabled) {
			this.queryControl.disable();
		} else {
			this.queryControl.enable();
		}
	}

	@Input()
	get required() {
		return this._required;
	}
	set required(value: any) {
		this._required = coerceBooleanProperty(value);
	}

	// The Internal Control for the Input Field	
	public queryControl: FormControl = new FormControl();

	get panelOpen(): boolean {
		return this._panelOpen;
	}

	/**
	 * This position config ensures that the top "start" corner of the overlay
	 * is aligned with with the top "start" of the origin by default (overlapping
	 * the trigger completely). If the panel cannot fit below the trigger, it
	 * will fall back to a position above the trigger.
	 */
	_positions = [
		{
			originX: 'start',
			originY: 'bottom',
			overlayX: 'start',
			overlayY: 'top',
		},
		{
			originX: 'start',
			originY: 'top',
			overlayX: 'end',
			overlayY: 'top',
		},
	];

	@ViewChild('trigger') trigger: ElementRef;

	@HostBinding('class.df-autocomplete') get isAutocompleteClass() { return true; };
	@HostBinding('class.df-question') get isQuestionClass() { return true; };

	constructor(
		private _element: ElementRef,
		private _renderer: Renderer,
		private autoCompleteService: AutocompleteControlService,

	) {
		// this._renderer.setElementClass(this._element.nativeElement, 'df-autocomplete', true);
		// this._renderer.setElementClass(this._element.nativeElement, 'df-question', true);
	}


	ngOnInit() {
		if (this.items) {
			this.autoCompleteService.options = this.items;
		}
		if (this.serviceUrl) {
			this.autoCompleteService.serviceUrl = this.serviceUrl;
		}
		if (this.type) {
			this.autoCompleteService.serviceType = this.type;
		}
	}

	ngAfterViewInit() {
		/**
		 *	Listens to input updates from the input field
		 */
		this.queryControl.valueChanges.distinctUntilChanged()
			.filter((next) => {
				// If input is empty close the panel and reset the controls value without an emit event
				// to prevent a loop
				if (!next || next === '') {
					this._isReadyToOpen = false;
					this.formControl.setValue('');
					this.close();
				} else {
					// If the user changes the input it will invalidate any previous selection, so we
					// we reset the form controls value
					this.formControl.setValue('', { emitEvent: false });
					this._isReadyToOpen = true;
				}
				return next && next.length > 0;
			})
			.debounceTime(500)
			.subscribe((query) => {
				if (query !== this._viewValue) {
					let searchQuery: any = { query: query };
					if (this.link) {
						searchQuery.link = this.formControl.parent.controls[this.link] || this.formControl.parent;
					}

					this.autoCompleteService.get(searchQuery).subscribe(next => {
						if (next.length > 0 && this._isReadyToOpen) {
							this.autocompleteItems = next;
							this.open();
						}
					});
				}
			});

		this._resetOptions();
		this._changeSubscription = this.options.changes.subscribe(() => this._resetOptions());

		if (this.value) {
			this.queryControl.setValue(this.value.text, { emitEvent: false });
		}

		this.formControl.valueChanges.subscribe((next) => {
			this.value = next;
		})

	}


	/** Unsubscribe from all subscriptions  */
	ngOnDestroy() {
		this._dropSubscriptions();
		this._changeSubscription.unsubscribe();
		// this._tabSubscription.unsubscribe();
	}

	/** Opens the overlay panel. */
	open = (): void => {
		if (this.disabled) {
			return;
		}
		this._panelOpen = true;
	}
	/** Closes the overlay panel and focuses the host element. */
	close(): void {
		this._panelOpen = false;
	}

	/** The currently selected option. */
	get selected(): DynamicFormQuestionOptionComponent {
		return this._selected;
	}

	/** Returns the correct tabindex for the select depending on disabled state. */
	_getTabIndex() {
		return this.disabled ? '-1' : '0';
	}

	_getWidth(): number {
		return this.trigger.nativeElement.getBoundingClientRect().width;
	}

	_getPanelState(): string {
		return 'showing-ltr';
	}

	/** Listens to selection events on each option. */
	private _listenToOptions(): void {
		this.options.forEach((option: DynamicFormQuestionOptionComponent) => {
			const sub = option.onSelect.subscribe((isUserInput: boolean) => {
				if (isUserInput) {
					this.value = { id: option.value, text: option.viewValue };
				}
				this._onSelect(option);
			});
			this._subscriptions.push(sub);
		});
	}

	/** Unsubscribes from all option subscriptions. */
	private _dropSubscriptions(): void {
		this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
		this._subscriptions = [];
	}

	/** When a new option is selected, deselects the others and closes the panel. */
	private _onSelect(option: DynamicFormQuestionOptionComponent): void {
		this._selected = option;
		this._updateOptions();
		this.close();
	}

	/** Drops current option subscriptions and IDs and resets from scratch. */
	private _resetOptions(): void {
		this._dropSubscriptions();
		this._listenToOptions();
		this._setOptionIds();
	}

	// TODO: Cant set the option ids on dynamically created options list for the aria-owns property	
	private _setOptionIds() {
		// this._optionIds = this.options.map(option => option.id).join(' ');
	}

	_onPanelDone(): void {
		if (this.panelOpen && this.options.length > 0) {
			this.options.first.focus();
			this.onOpen.emit();
		} else {
			this._focusHost();
			this.onClose.emit();
		}
	}

	/** Tab to the overlay if tabbing from the input box and its open */
	handleKeydownEvent(event: KeyboardEvent, next: boolean) {
		if (event.keyCode === TAB) {
			if (this.panelOpen && this.options.length > 0) {
				event.preventDefault();
				this.options.first.focus();
			}
		}
	}



	/** Deselect each option that doesn't match the current selection. */
	private _updateOptions(): void {
		this.options.forEach((option: DynamicFormQuestionOptionComponent) => {
			if (option !== this.selected) {
				option.deselect();
			}
		});
	}

	/** Focuses the host element when the panel closes. */
	private _focusHost(): void {
		this._renderer.invokeElementMethod(this._element.nativeElement.querySelector('input'), 'focus');
	}

	/** Gets the index of the provided option in the option list. */
	private _getOptionIndex(option: DynamicFormQuestionOptionComponent): number {
		return this.options.reduce((result: number, current: DynamicFormQuestionOptionComponent, index: number) => {
			return result === undefined ? (option === current ? index : undefined) : result;
		}, undefined);
	}


	/**
	 * Sets the transform-origin property of the panel to ensure that it
	 * animates in the correct direction based on its positioning.
	 */
	_updateTransformOrigin(pos: ConnectedOverlayPositionChange): void {
		this._transformOrigin = pos.connectionPair.originY;
	}

	/** Only set the autocomplete to touched if tabbing when the panel is closed */
	@HostListener('blur')
	_onBlur() {
		if (!this.panelOpen) {
			this._onTouchedCallback();
		}
	}


	/**
   	* Sets the select's value. Part of the ControlValueAccessor interface
   	* required to integrate with Angular's core forms API.
   	*/
	writeValue(value: any): void {
		this._value = value;
	}

	/**
	 * Saves a callback function to be invoked when the select's value
	 * changes from user input. Part of the ControlValueAccessor interface
	 * required to integrate with Angular's core forms API.
	 */
	registerOnChange(fn: any) {
		this._onChangeCallback = fn;
	}

	/**
	 * Saves a callback function to be invoked when the select is blurred
	 * by the user. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 */
	registerOnTouched(fn: any) {
		this._onTouchedCallback = fn;
	}

}
