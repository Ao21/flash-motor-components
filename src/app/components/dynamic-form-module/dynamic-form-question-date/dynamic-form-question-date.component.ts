import {
	Component,
	OnInit,
	Input,
	HostBinding,
	forwardRef,
	HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { coerceNumberProperty, coerceBooleanProperty } from './../../../core/core';
import { validDayValidate, validMonthValidate, validYearValidate } from './../../../core/validation';


import * as moment from 'moment';

const noop = () => { };

/**
 * Provider Expression that allows df-date to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */


export const DF_DATE_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormQuestionDateComponent),
	multi: true
};

/**
 *	Date Question
 *
 *	Selector: df-date
 *	Example:
 *		<df-date
 *			class="df-question"
 *			[formControl]="control">
 *			[ariaLabel]="question.label"
 * 			[ariaLabelledby]="question.key"
 *			[isDisabled]="control.disabled"
 *			[id]="question.key">
 *		</df-date>
 *	
 */

@Component({
	selector: 'df-date',
	providers: [DF_DATE_CONTROL_VALUE_ACCESSOR],
	templateUrl: './dynamic-form-question-date.component.html',
	styleUrls: ['./dynamic-form-question-date.component.scss']
})
export class DynamicFormQuestionDateComponent implements OnInit, ControlValueAccessor {
	
	// The Group of Form controls including day, month, year
	dateForm: FormGroup;
	day: FormControl = new FormControl('', [validDayValidate]);
	month: FormControl = new FormControl('', [validMonthValidate]);
	year: FormControl = new FormControl('', [validYearValidate]);

	// Internal value of the date	
	private _value: string = '';

	/**
	 *	ARIA Properties
	 */
	@HostBinding('tabindex') get tabIndex() {
		return this.disabled ? -1 : 0;
	}
	@HostBinding('attr.role') role: string = 'composite';
	@HostBinding('attr.aria-valuetext') get ariaValueText(): number {
		return this.value;
	}
	@HostBinding('attr.aria-invalid') get ariaInvalid(): boolean {
		return !this.formControl.valid;
	}
	@HostBinding('attr.aria-disabled') get ariaDisabled(): boolean {
		return this.disabled;
	}


	/** onTouch function registered via registerOnTouch (ControlValueAccessor). */
	private _onTouchedCallback: () => void = noop;
	
	/** The method to be called in order to update ngModel */
	private _onChangeCallback: (_: any) => void = noop;

	/** Sets the Id of the date field input */	
	@Input() id: string;
	
	// The main form control for the Date component
	@Input() formControl: FormControl;

	// Check for each individual form control is fully complete before showing validation for the whole form	
	public isComplete: boolean = false;

	get value(): any { return this._value; };
	@Input() set value(v: any) {
		if (v !== this._value) {
			this._value = v;
			this._onChangeCallback(v);
		}
	}

	@Input('isDisabled')
	set isDisabled(v) {
		this.disabled = v;
	}	

	private _disabled: boolean = false;

	@Input()
	get disabled(): boolean { return this._disabled; }
	set disabled(value) {
		this._disabled = coerceBooleanProperty(value);
		if (this._disabled) {
			this.day.disable()
			this.month.disable()
			this.year.disable()
		} else {
			this.day.enable();
			this.month.enable();
			this.year.enable();
		}
		
	}

	private _required: boolean;
	
	@Input()
	get required() {
		return this._required;
	}

	set required(value: any) {
		this._required = coerceBooleanProperty(value);
	}

	constructor(
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.dateForm = this.fb.group({
			day: this.day,
			month: this.month,
			year: this.year,
		});

		/**
		 *	Watches for changes in each of the date inputs and updates the main
		 *	control as necessary
		 */
		this.dateForm.valueChanges.subscribe((next) => {
			let derrivedDate = `${next.day}/${next.month}/${next.year}`;
			if (this.dateForm.valid) {
				this.isComplete = true;
				this.value = derrivedDate;
			} else {
				this.isComplete = false;
				this.value = null;
			}
		});
	}

	/**
	 * Updates the date by breaking it down into each component day/month/year and updating
	 * each form control with the new values or no value
	 */
	updateDate(value) {
		if (value && value.split('/').length > 2) {
			let date = value.split('/');
			this.day.setValue(parseFloat(date[0]));
			this.month.setValue(parseFloat(date[1]));
			this.year.setValue(parseFloat(date[2]));
		} else {
			this.day.setValue('');
			this.month.setValue('');
			this.year.setValue('');
		}
	}

	/**
	 * On Completion of each field, it skips the user to the next field and select the value
	 * already there if applicable
	 */
	_autoTab(e: Event, to) {
		let el: any = e.target;
		setTimeout(() => {
			if (el.value.length === el.maxLength && el.classList.contains('ng-valid')) {
				to.focus();
				to.select();
			}
		}, 1);

	}

	/** Set the tab index when the form is disabled */	
	_getTabIndex() {
		return this.disabled ? '-1' : '0';
	}	
	
	/**
	 * On Blur, Check if the current element is a date control, if not
	 * trigger touched event
	 */
	@HostListener('blur',['$event'])
	_onBlur(e) {
		setTimeout(() => {
			if (!document.activeElement.classList.contains('df-date-input')) {
				this._onTouchedCallback();
			}
		}, 5);
	}

	/**
   	* Sets the Dates's value and updates each input component.
	* Part of the ControlValueAccessor interface
   	* required to integrate with Angular's core forms API.
   	*/	
	writeValue(value: any) {
		this.updateDate(value);
		this._value = value;
	}

	/**
	 * Saves a callback function to be invoked when the dates's value
	 * changes from user input. Part of the ControlValueAccessor interface
	 * required to integrate with Angular's core forms API.
	 */
	registerOnChange(fn: any) {
		this._onChangeCallback = fn;
	}

	/**
	 * Saves a callback function to be invoked when the date is blurred
	 * by the user. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 */	
	registerOnTouched(fn: any) {
		this._onTouchedCallback = fn;
	}

}
