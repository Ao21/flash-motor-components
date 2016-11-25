import {
	Component,
	OnInit,
	Input,
	AfterContentInit,
	HostBinding,
	Output,
	forwardRef,
	HostListener,
	ElementRef,
	EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { coerceBooleanProperty } from './../../../core/coersion/boolean-property';
import { isPresent } from '@angular/core/src/facade/lang';
const noop = () => { };

/**
 * Provider Expression that allows df-counter to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const DF_COUNTER_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormQuestionCounterComponent),
	multi: true
};

/**
 *	Counter Question
 *
 *	Selector: df-counter
 *	Example:
 *		<df-counter
 *			#input
 *			class="df-question"
 *			[formControl]="control"
 *			[isDisabled]="control.disabled"
 * 			[attr.aria-label]="question.label"
 *			[attr.aria-labelledby]="question.key"
 *			[min]="question.min"
 *			[max]="question.max"
 *			[id]="question.key"
 *		</df-counter>
 *
 *	Unique Model Properties:
 *		@param {number} min - The min value of the counter
 *		@param {number} min - The max value of the counter
 *	
 */

@Component({
	selector: 'df-counter',
	providers: [DF_COUNTER_CONTROL_VALUE_ACCESSOR],
	templateUrl: './dynamic-form-question-counter.component.html',
	styleUrls: ['./dynamic-form-question-counter.component.scss']
})
export class DynamicFormQuestionCounterComponent implements ControlValueAccessor, AfterContentInit {

	private _focused: boolean = false;
	
	// Internal Value of the Counter
	private _value: number;

	/**
	 *	Control Value Accessor Default Functions
	 */
	private _onTouchedCallback: () => void = noop;
	private _onChangeCallback: (_: any) => void = noop;

	/** Readonly properties. */
	get focused() { return this._focused; }
	
	// Prevents the user going under the min value
	get isAtMin() { return this.value === this.min; };
	
	// Prevents the user going past the max value
	get isAtMax() { return this.value === this.max; };

	/**
	 *	Inputs
	 */
	@Input() id: string;
	@Input() formControl: FormControl;
	
	// Sets the min value the counter can be set to - defaults to zero if none set
	@Input() min: number;
	
	// Sets the max value the counter can be set to
	@Input() max: number;

	/**
	 *	ARIA Properties
	 */
	@HostBinding('tabindex') tabIndex: number = 0;
	@HostBinding('attr.aria-disabled') get ariaDisabled(): boolean {
		return this._disabled;
	}
	@HostBinding('attr.aria-valuenow') get ariaValueNow(): number {
		return this._value;
	}
	@HostBinding('attr.aria-valuemin') get ariaValueMin(): number {
		return this.min;
	}
	@HostBinding('attr.aria-valuemax') get ariaValueMax(): number {
		return this.max;
	}


	get value(): any { return this._value; };
	@Input() set value(v: any) {
		v = parseFloat(v);
		if (v !== this._value) {
			this._value = v;
			this._onChangeCallback(v);
		}
	}

	/**
	 *	Input Control Settings
	 */

	// Disables the user's ability to click on the counter buttons	
	private _disabled: boolean = false;
	
	// Sets this as the first field to be selected
	private _autofocus: boolean = false;
	
	private _required: boolean = false;

	@Input()
	get autofocus(): boolean { return this._autofocus; }
	set autofocus(value) { this._autofocus = coerceBooleanProperty(value); }

	@Input('isDisabled')
	set isDisabled(v) {
		this.disabled = v;
	}
	
	@Input()
	get disabled(): boolean { return this._disabled; }
	set disabled(value) {
		this._disabled = coerceBooleanProperty(value);
	}


	constructor(private el: ElementRef) {
		this.el.nativeElement.className = 'df-question-counter df-question';
	}

	ngAfterContentInit() {
		// Set Default Settings after Content Init to make sure control is set right
		if (!isPresent(this.value) && this.min) {
			this.value = this.min;
			this._onChangeCallback(this.value);
		} else if (!isPresent(this.value) && !this.min) {
			this.value = 0;
			this._onChangeCallback(this.value);
		}
	}

	/**
	 *	Counter Logic
	 */
	increase() {
		if (isPresent(this.max) && this.value < this.max) {
			this.value = this.value + 1;
		} else if (!isPresent(this.max)) {
			this.value = this.value + 1;
		}
	}

	decrease() {
		if (isPresent(this.min) && this.value > this.min) {
			this.value = this.value - 1;
		} else if (!isPresent(this.min)) {
			this.value = this.value - 1;
		}
	}

	enforceRangeBounds(value) {
		if (this.min !== null && value < this.min) {
			return this.min;
		}
		if (this.max !== null && value > this.max) {
			return this.max;
		}
		return value;
	}

	/**
	 *	Focus/Blur Logic
	 */
	onBlur() {
		this._onTouchedCallback();
	}

	/**
	 *	Functions for Control Value Accessor
	 */

	/**
	 * 	Sets the Counter's value. Part of the ControlValueAccessor interface required
	 * 	to integrate with Angular Core Forms API */
	writeValue(value: any) {
		if (value === '') {
			value = 0;
		}
		this._value = value;
	}

	/**
	 * Saves a callback function to be invoked when the counters's value
	 * changes from user input. Part of the ControlValueAccessor interface
	 * required to integrate with Angular's core forms API.
	 */
	registerOnChange(fn: any) {
		this._onChangeCallback = fn;
	}

	/**
	 * Saves a callback function to be invoked when the counter is blurred
	 * by the user. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 */	
	registerOnTouched(fn: any) {
		this._onTouchedCallback = fn;
	}


}
