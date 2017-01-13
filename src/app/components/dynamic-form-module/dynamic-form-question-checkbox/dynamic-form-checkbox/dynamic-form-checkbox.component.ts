import {
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer,
	HostBinding,
	ViewEncapsulation,
	forwardRef,
	ViewChild,
} from '@angular/core';


import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBooleanProperty } from './../../../../core/coersion/boolean-property';
import { ViewportRuler } from './../../../../core/overlay/position/viewport-ruler';

let nextId = 0;

export enum TransitionCheckState {
	/** The initial state of the component before any user interaction. */
	Init,
	/** The state representing the component when it's becoming checked. */
	Checked,
	/** The state representing the component when it's becoming unchecked. */
	Unchecked,
	/** The state representing the component when it's becoming indeterminate. */
	Indeterminate
}

export class DFCheckboxChange {
	source: DynamicFormCheckboxComponent;
	checked: boolean;
}

export const DF_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormCheckboxComponent),
	multi: true
};

@Component({
	selector: 'df-checkbox',
	providers: [DF_CHECKBOX_CONTROL_VALUE_ACCESSOR],
	templateUrl: './dynamic-form-checkbox.component.html',
	styleUrls: ['./dynamic-form-checkbox.component.scss']
})
export class DynamicFormCheckboxComponent implements ControlValueAccessor {

	@Input('aria-label') ariaLabel: string = '';
	@Input('aria-labelledby') ariaLabelledby: string = null;

	@HostBinding('attr.role') role: string = 'checkbox';
	@HostBinding('attr.aria-checked') get ariaChecked() {
		return this._checked;
	}

	@HostBinding('id')
	@Input() id: string = `df-checkbox-${++nextId}`;

	get inputId(): string {
		return `input-${this.id}`;
	}

	private _required: boolean;
	/** Whether the checkbox is required or not. */
	@Input()
	get required(): boolean { return this._required; }
	set required(value) { this._required = coerceBooleanProperty(value); }

	private _disabled: boolean = false;
	/**
   * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
   * The correct ARIA attributes are applied to denote this to assistive technology.
   */
	@Input()
	get disabled(): boolean { return this._disabled; }
	set disabled(value) { this._disabled = coerceBooleanProperty(value); }

	@Input() tabindex: number = 0;
	@Input() name: string = null;
	@Output() change: EventEmitter<DFCheckboxChange> = new EventEmitter<DFCheckboxChange>();

	@ViewChild('input') _inputElement: ElementRef;
	onTouched: () => any = () => { };

	@HostBinding('class.is-disabled') get isDisabled() {
		return this._disabled;
	}

	private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;
	private _checked: boolean = false;
	private _indeterminate: boolean = false;
	private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
	hasFocus: boolean = false;



	constructor(private _renderer: Renderer,
		private _elementRef: ElementRef,
		private _changeDetectorRef: ChangeDetectorRef) {
	}

	/** Sets radio class as checked */	
	@HostBinding('class.is-checked')
	@Input()
	get checked(): boolean {
		return this._checked;
	}


	set checked(checked: boolean) {
		if (checked != this.checked) {
			this._indeterminate = false;
			this._checked = checked;
			this._transitionCheckState(
				this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
			this._changeDetectorRef.markForCheck();
		}
	}

	/**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
   * false. This differs from the web platform in that indeterminate state on native
   * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
   * `checked` property programmatically). However, we feel that this behavior is more accommodating
   * to the way consumers would envision using this component.
   */
	@Input() get indeterminate() {
		return this._indeterminate;
	}

	set indeterminate(indeterminate: boolean) {
		this._indeterminate = indeterminate;
		if (this._indeterminate) {
			this._transitionCheckState(TransitionCheckState.Indeterminate);
		} else {
			this._transitionCheckState(
				this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
		}
	}

	/** Implemented as part of ControlValueAccessor. */
	writeValue(value: any) {
		this.checked = !!value;
	}

	/** Implemented as part of ControlValueAccessor. */
	registerOnChange(fn: (value: any) => void) {
		this._controlValueAccessorChangeFn = fn;
	}

	/** Implemented as part of ControlValueAccessor. */
	registerOnTouched(fn: any) {
		this.onTouched = fn;

	}

	/** Implemented as a part of ControlValueAccessor. */
	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}

	private _transitionCheckState(newState: TransitionCheckState) {
		let oldState = this._currentCheckState;
		let renderer = this._renderer;
		let elementRef = this._elementRef;

		if (oldState === newState) {
			return;
		}
		// if (this._currentAnimationClass.length > 0) {
		// 	renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, false);
		// }

		// this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(
		// 	oldState, newState);
		this._currentCheckState = newState;

		// if (this._currentAnimationClass.length > 0) {
		// 	renderer.setElementClass(elementRef.nativeElement, this._currentAnimationClass, true);
		// }
	}

	private _emitChangeEvent() {
		let event = new DFCheckboxChange();
		event.source = this;
		event.checked = this.checked;

		this._controlValueAccessorChangeFn(this.checked);
		this.change.emit(event);
	}

	/** Informs the component when the input has focus so that we can style accordingly */
	_onInputFocus() {
		this.hasFocus = true;
	}

	/** Informs the component when we lose focus in order to style accordingly */
	_onInputBlur() {
		this.hasFocus = false;
		this.onTouched();
	}

	/**
	 * Toggles the `checked` value between true and false
	 */
	toggle() {
		this.checked = !this.checked;
	}

	/**
	 * Event handler for checkbox input element.
	 * Toggles checked state if element is not disabled.
	 * @param event
	 */
	_onInteractionEvent(event: Event) {
		// We always have to stop propagation on the change event.
		// Otherwise the change event, from the input element, will bubble up and
		// emit its event object to the `change` output.
		event.stopPropagation();

		if (!this.disabled) {
			this.toggle();

			// Emit our custom change event if the native input emitted one.
			// It is important to only emit it, if the native input triggered one, because
			// we don't want to trigger a change event, when the `checked` variable changes for example.
			this._emitChangeEvent();
		}
	}

	focus() {
		this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
		this._onInputFocus();
	}

	_onInputClick(event: Event) {
		// We have to stop propagation for click events on the visual hidden input element.
		// By default, when a user clicks on a label element, a generated click event will be
		// dispatched on the associated input element. Since we are using a label element as our
		// root container, the click event on the `checkbox` will be executed twice.
		// The real click event will bubble up, and the generated click event also tries to bubble up.
		// This will lead to multiple click events.
		// Preventing bubbling for the second event will solve that issue.
		event.stopPropagation();
	}

	getHostElement() {
		return this._elementRef.nativeElement;
	}
}
