import { Component, Input, OnInit, HostListener, HostBinding, ChangeDetectorRef, Optional, forwardRef, Renderer, Output, EventEmitter, ViewChild, QueryList, ElementRef, OnDestroy, ContentChildren, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl, FormBuilder } from '@angular/forms';
import { ENTER, SPACE } from './../../../core/keyboard/keycodes';
import { coerceBooleanProperty } from './../../../core/core';

import { DynamicFormQuestionOptionComponent } from './../dynamic-form-question-option/dynamic-form-question-option.component';
import { Subscription } from 'rxjs/Subscription';

import { ListKeyManager } from './../../../core/a11y/list-key-manager';
import { transformPanel, transformTrigger } from './dynamic-form-question-dropdown.animations';
import { Dir } from './../../../core/rtl/dir';

const noop = () => { };

export const DF_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormQuestionDropdownComponent),
	multi: true
};

/**
 *	Dropdwon Component
 *
 *	Selector: df-dropdown
 *	Example:
 *		<df-dropdown
 *			class="df-question"
 *			[placeholder]="question.placeholder"
 *			[formControl]="control"
 *			[isDisabled]="control.disabled"
 *			[required]="question.required"
 *			[attr.aria-label]="question.label"
 *			[attr.aria-labelledby]="question.key">
 *				 <df-option
 *					*ngFor="let option of question.options"
 *					[value]="option">
 *						{{option}}
 *				</df-option>
 *		</df-dropdown>
 *
 *	Unique Model properties:
 *		@param {string[]} options - The Options in the dropdown
 *		@param {string} placeholder - The placeholder text
 */

@Component({
	selector: 'df-dropdown',
	templateUrl: './dynamic-form-question-dropdown.component.html',
	styleUrls: ['./dynamic-form-question-dropdown.component.scss'],
	providers: [DF_DROPDOWN_CONTROL_VALUE_ACCESSOR],
	animations: [transformTrigger, transformPanel ]
})
export class DynamicFormQuestionDropdownComponent implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {

	/** Tab is set to -1/0 depending on whether its disabled or not */
	@HostBinding('attr.tabindex') get tabIndex() {
		return this.disabled ? -1 : 0;
	}

	/** aria role is set to listbox */
	@HostBinding('attr.role') get role() {
		return 'listbox';
	}

	/** Input fields disabled is based based on disabled */
	@HostBinding('attr.disabled') get isComponentDisabled() {
		return this.disabled;
	}

	/** aria-invalid is set based on _required */
	@HostBinding('attr.aria-required') get isAriaRequired() {
		return this.required;
	}

	/** aria-invalid is set based on the controls state */
	@HostBinding('attr.aria-invalid') get isAriaValid() {
		return !this.formControl.valid;
	}

	/** aria-disabled is set based on the dropdowns disabled state */
	@HostBinding('attr.aria-disabled') get isAriaDisabled() {
		return this.disabled;
	}

	/** The placeholder of the dropdown */
	@Input() placeholder: string;

	/** The main form control of the dropdown */
	@Input() formControl: FormControl;

	/** The Internal value of the selected dropdown item */
	private _value: string = '';

	/** Whether the panel is open or closed */
	private _panelOpen = false;

	/** Whether the dropdown is disabled or not */
	private _disabled: boolean = false;

	/** What option is currently selected */
	private _selected: DynamicFormQuestionOptionComponent;

	/** Subscriptions to option events. */
	private _subscriptions: Subscription[] = [];


	/** Subscription to changes in the option list. */
	private _changeSubscription: Subscription;

	/** Subscription to tab events while overlay is focused. */
	private _tabSubscription: Subscription;

	/** Whether filling out the select is required in the form.  */
	private _required: boolean = false;

	/** Manages keyboard events for options in the panel. */
	_keyManager: ListKeyManager;

	/** View -> model callback called when value changes */
	private _onChangeCallback: (_: any) => void = noop;

	/** View -> model callback called when select has been touched */
	private _onTouchedCallback: () => void = noop;

	/** Current value of the dropdown */
	get value(): any { return this._value; };
	@Input() set value(v: any) {
		if (v !== this._value) {
			this._value = v;
			this._onChangeCallback(v);
		}
	}


	get panelOpen(): boolean {
		return this._panelOpen;
	}

	/**
	 * This position config ensures that the top "start" corner of the overlay
	 * is aligned with with the top "start" of the origin by default (overlapping
	 * the trigger completely). If the panel cannot fit below the trigger, it
	 * will fall back to a position above the trigger.
	 */
	_positions = [{
		originX: 'start',
		originY: 'bottom',
		overlayX: 'start',
		overlayY: 'top'
	}];


	@ViewChild('trigger') trigger: ElementRef;

	/** Instances of the dropdowns child options */
	@ContentChildren(DynamicFormQuestionOptionComponent) options: QueryList<DynamicFormQuestionOptionComponent>;

	/** Sets the component to disabled from the question properties */
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
	}

	@Input()
	get required() {
		return this._required;
	}

	set required(value: any) {
		this._required = coerceBooleanProperty(value);
	}

	/** Event Emitted on overlay opening */
	@Output() onOpen = new EventEmitter();

	/** Event Emitted on overlay closing */
	@Output() onClose = new EventEmitter();


	constructor(
		private _element: ElementRef,
		private _renderer: Renderer,
		private _changeRef: ChangeDetectorRef,
		@Optional() private _dir: Dir) {
	}

	ngOnInit() {

	}

	ngAfterContentInit() {
		this._initKeyManager();
		this._listenToOptions();
		this._changeSubscription = this.options.changes.subscribe(() => {
			this._dropSubscriptions();
			this._listenToOptions();
		});
		if (this.formControl.value !== '') {
			setTimeout(() => {
				this._reselectOption(this.formControl.value);
			}, 0);
		}
	}

	ngOnDestroy() {
		this._dropSubscriptions();
		this._changeSubscription.unsubscribe();
		this._tabSubscription.unsubscribe();
	}

	toggle(): void {
		this.panelOpen ? this.close() : this.open();
	}

	/** Opens the overlay panel. */
	open(): void {
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

	_getWidth(): number {
		return this.trigger.nativeElement.getBoundingClientRect().width;
	}

	_getPanelState(): string {
		return 'showing-ltr';
	}

	@HostListener('keydown', ['$event'])
	/** Ensures the panel opens if activated by the keyboard. */
	_handleKeydown(event: KeyboardEvent): void {
		if (event.keyCode === ENTER || event.keyCode === SPACE) {
			event.preventDefault();
			this.open();
		}
	}

	_onPanelDone(): void {
		if (this.panelOpen) {
			this._focusCorrectOption();
			this.onOpen.emit();
		} else {
			this._focusHost();
			this.onClose.emit();
		}
	}

	private _initKeyManager() {
		this._keyManager = new ListKeyManager(this.options);
		this._tabSubscription = this._keyManager.tabOut.subscribe(() => {
			this.close();
		});
	}

	/** Listens to selection events on each option. */
	private _listenToOptions(): void {
		this.options.forEach((option: DynamicFormQuestionOptionComponent) => {
			const sub = option.onSelect.subscribe((isUserInput: boolean) => {
				if (isUserInput) {
					this.value = option.value;
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

	/** Deselect each option that doesn't match the current selection. */
	private _updateOptions(): void {
		this.options.forEach((option: DynamicFormQuestionOptionComponent) => {
			if (option !== this.selected) {
				option.deselect();
			}
		});
	}

	/** Focuses the selected item. If no option is selected, it will focus
	 * the first item instead.
	 */
	private _focusCorrectOption(): void {
		if (this.selected) {
			this._keyManager.focusedItemIndex = this._getOptionIndex(this.selected);
			this.selected.focus();
		} else {
			this._keyManager.focusedItemIndex = 0;
			this.options.first.focus();
		}
	}

	/** Focuses the host element when the panel closes. */
	private _focusHost(): void {
		this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
	}

	/** Gets the index of the provided option in the option list. */
	private _getOptionIndex(option: DynamicFormQuestionOptionComponent): number {
		return this.options.reduce((result: number, current: DynamicFormQuestionOptionComponent, index: number) => {
			return result === undefined ? (option === current ? index : undefined) : result;
		}, undefined);
	}

	private _reselectOption(value) {
		if (!this.options) { console.log('no options'); return; }
		this.options.forEach((option: DynamicFormQuestionOptionComponent) => {
			if (option.value === value) {
				option.select();
			}
		});
	}

	/** Only set the dropdown to touched if tabbing when the panel is closed */
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
		if (!this.options) { return; }

		this.options.forEach((option: DynamicFormQuestionOptionComponent) => {
			if (option.value === value) {
				option.select();
			}
		});

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
