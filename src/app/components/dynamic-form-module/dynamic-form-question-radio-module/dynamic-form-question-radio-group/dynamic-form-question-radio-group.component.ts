import {
	Directive,
	HostBinding,
	Input,
	forwardRef,
	Output,
	QueryList,
	ContentChildren,
	EventEmitter,
	AfterContentInit,
	ElementRef
} from '@angular/core';
import {
	NG_VALUE_ACCESSOR,
	ControlValueAccessor
} from '@angular/forms';
import { DynamicFormQuestionRadioComponent } from './../dynamic-form-question-radio/dynamic-form-question-radio.component';

let _uniqueIdCounter = 0;

const noop = () => { };
export class DFRadioChange {
	source: DynamicFormQuestionRadioComponent;
	value: any;
}

/**
 * Provider Expression that allows df-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormQuestionRadioGroupDirective),
	multi: true
};



/**
 *	Radio Group Directive
 *
 *	Selector: df-radio-group
 *	Example:
 *		<df-radio-group
 *			class="o-flex o-flex--distribute df-question"
 *			[formControl]="control"
 *			[isDisabled]="control.disabled"
 *			[ariaLabel]="question.label"
 * 			[ariaLabelledby]="question.key">
 *				<df-radio
 *					*ngFor="let option of question.options"
 *					[value]="option">
 *						{{option}}
 *					</df-radio>
 *		</df-radio-group>
 *
 *	Unique Model Properties:
 *		@param {string[]} options - The Options in the radio group
 *	
 */

@Directive({
	selector: 'df-radio-group',
	providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class DynamicFormQuestionRadioGroupDirective implements AfterContentInit, ControlValueAccessor {

	@HostBinding('attr.role') role: string = 'radiogroup';
	/**
	 * Selected value for group. Should equal the value of the selected radio button if there *is*
	 * a corresponding radio button with a matching value. If there is *not* such a corresponding
	 * radio button, this value persists to be applied in case a new radio button is added with a
	 * matching value.
	 */
	private _value: any = null;

	 /** The HTML name attribute applied to radio buttons in this group. */
	private _name: string = `df-radio-group-${_uniqueIdCounter++}`;

	/** Disables all individual radio buttons assigned to this group. */
	private _disabled: boolean = false;

	/** The currently selected radio button. Should match value. */
	private _selected: DynamicFormQuestionRadioComponent = null;

	/** Whether the `value` has been set to its initial value. */
	private _isInitialized: boolean = false;

	/** The method to be called in order to update ngModel */
	private _onChangeCallback: (_: any) => void = noop;

	/** onTouch function registered via registerOnTouch (ControlValueAccessor). */
	private _onTouchedCallback: () => void = noop;

	@HostBinding('class.df-radio-group--vertical') get checkIfAligned() {
		return this.alignment === 'vertical';
	}

	@Input() alignment: string;

	/** Event emitted when the group value changes. */	
	@Output()
	change: EventEmitter<DFRadioChange> = new EventEmitter<DFRadioChange>();

	/** Child radio buttons. */	
	@ContentChildren(forwardRef(() => DynamicFormQuestionRadioComponent)) _radios: QueryList<DynamicFormQuestionRadioComponent> = null;

	@Input()
	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
		this._updateRadioButtonNames();
	}

	/** Set disabled from the question property */	
	@Input('isDisabled')
	set isDisabled(v) {
		this.disabled = v;
	}

	@Input()
	get disabled(): boolean {
		return this._disabled;
	}

	set disabled(value) {
		// The presence of *any* disabled value makes the component disabled, *except* for false.
		this._disabled = (value != null && value !== false) ? true : null;
	}

	@Input()
	get value(): any {
		return this._value;
	}

	set value(newValue: any) {
		if (this._value != newValue) {
			// Set this before proceeding to ensure no circular loop occurs with selection.
			this._value = newValue;

			this._updateSelectedRadioFromValue();
		}
	}

	_checkSelectedRadioButton() {
		if (this.selected && !this._selected.checked) {
			this._selected.checked = true;
		}
	}


	@Input()
	get selected() {
		return this._selected;
	}

	set selected(selected: DynamicFormQuestionRadioComponent) {
		this._selected = selected;
		this.value = selected ? selected.value : null;

		this._checkSelectedRadioButton();
	}

	ngAfterContentInit() {
		// Mark this component as initialized in AfterContentInit because the initial value can
		// possibly be set by NgModel on MdRadioGroup, and it is possible that the OnInit of the
		// NgModel occurs *after* the OnInit of the MdRadioGroup.
		this._isInitialized = true;
	}

	/**
	 * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
	 * radio buttons upon their blur.
	 */	
	_touch() {
		if (this._onTouchedCallback) {
			this._onTouchedCallback();
		}
	}

	updateValueFromRadio(value) {
		this._value = value;
		this._emitChangeEvent();
	}

	private _updateRadioButtonNames(): void {
		if (this._radios) {
			this._radios.forEach(radio => {
				radio.name = this.name;
			});
		}
	}

	/** Updates the `selected` radio button from the internal _value state. */	
	private _updateSelectedRadioFromValue(): void {
		// If the value already matches the selected radio, do nothing.
		let isAlreadySelected = this._selected != null && this._selected.value == this._value;

		if (this._radios != null && !isAlreadySelected) {
			let matchingRadio = this._radios.filter(radio => radio.value == this._value)[0];

			if (matchingRadio) {
				this.selected = matchingRadio;
			} else if (this.value == null) {
				this.selected = null;
				this._radios.forEach(radio => { radio.checked = false; });
			}
		}
	}

	/** Dispatch change event with current selection and group value. */
	_emitChangeEvent(): void {
		if (this._isInitialized) {
			let event = new DFRadioChange();
			event.source = this._selected;
			this._onChangeCallback(this.value);
			event.value = this._value;
			this.change.emit(event);
		}
	}

	/**
   	* Sets the radio groups's value. Part of the ControlValueAccessor interface
   	* required to integrate with Angular's core forms API.
   	*/
	writeValue(value: any) {
		this.value = value;
	}

	/**
	 * Saves a callback function to be invoked when the radio groups's value
	 * changes from user input. Part of the ControlValueAccessor interface
	 * required to integrate with Angular's core forms API.
	 */
	registerOnChange(fn: any) {
		this._onChangeCallback = fn;
	}

	/**
	 * Saves a callback function to be invoked when the radio group is blurred
	 * by the user. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 */
	registerOnTouched(fn: any) {
		this._onTouchedCallback = fn;
	}

	// Set basic styles
	constructor(private el: ElementRef) {
		this.el.nativeElement['style'].float = 'left';
		this.el.nativeElement['style'].width = '100%';
	}

}
