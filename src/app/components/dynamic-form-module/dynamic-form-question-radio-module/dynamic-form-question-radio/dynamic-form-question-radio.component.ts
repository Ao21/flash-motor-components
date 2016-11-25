import {
	Component,
	HostBinding,
	Input,
	OnInit,
	Output,
	Optional,
	ElementRef,
	EventEmitter,
} from '@angular/core';


const noop = () => { };

let _uniqueIdCounter = 0;
import { UniqueSelectionDispatcher } from './../../../../core';
import { DynamicFormQuestionRadioGroupDirective, DFRadioChange } from './../dynamic-form-question-radio-group/dynamic-form-question-radio-group.component'

/**
 *	Radio Component
 *
 *	Selector: df-radio
 *	Example:
 *		<df-radio [name]="option.name" [value]="option.value">
 *			{{option.text}}
 *		</df-radio>
 *
 *	
 */

@Component({
	selector: 'df-radio',
	templateUrl: './dynamic-form-question-radio.component.html',
	styleUrls: ['./dynamic-form-question-radio.component.scss']
})
export class DynamicFormQuestionRadioComponent implements OnInit {

	/** Sets whether hte radio button is focused */
	@HostBinding('class.md-radio-focused') _isFocused: boolean;

	/** Whether this radio is checked. */	
	private _checked: boolean = false;

	/** The unique ID for the radio button. */	
	@HostBinding('id')
	@Input()
	id: string = `md-radio-${_uniqueIdCounter++}`;

	/** Analog to HTML 'name' attribute used to group radios for unique selection. */	
	@Input()
	name: string;

	/** Used to set the 'aria-label' attribute on the underlying input element. */	
	@Input('aria-label') ariaLabel: string;

	 /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
	@Input('aria-labelledby') ariaLabelledby: string;

	/** Whether this radio is disabled. */	
	private _disabled: boolean;

	/** Value assigned to this radio.*/
	private _value: any = null;

	/** The parent radio group. May or may not be present. */	
	radioGroup: DynamicFormQuestionRadioGroupDirective;

	/** Event emitted when the group value changes. */	
	@Output() change: EventEmitter<DFRadioChange> = new EventEmitter<DFRadioChange>();

	constructor(
		@Optional() radioGroup: DynamicFormQuestionRadioGroupDirective,
		private _elementRef: ElementRef,
		public radioDispatcher: UniqueSelectionDispatcher
	) {
		this.radioGroup = radioGroup;
		radioDispatcher.listen((id: string, name: string) => {
			if (id != this.id && name == this.name) {
				this.checked = false;
			}
		});
	}

	get inputId(): string {
		return `${this.id}-input`;
	}

	/** Sets radio class as checked */	
	@HostBinding('class.is-checked')
	@Input()
	get checked(): boolean {
		return this._checked;
	}

	set checked(newCheckedState: boolean) {
		this._checked = newCheckedState;

		if (newCheckedState && this.radioGroup && this.radioGroup.value != this.value) {
			this.radioGroup.selected = this;
		} else if (!newCheckedState && this.radioGroup && this.radioGroup.value == this.value) {
			// When unchecking the selected radio button, update the selected radio
			// property on the group.
			this.radioGroup.selected = null;
		}

		if (newCheckedState) {
			// Notify all radio buttons with the same name to un-check.
			this.radioDispatcher.notify(this.id, this.name);
		}
	}

	/** RadioGroup reads this to assign its own value. */	
	@Input()
	get value(): any {
		return this._value;
	}

	set value(value: any) {
		if (this._value != value) {
			if (this.radioGroup != null && this.checked) {
				this.radioGroup.value = value;
			}
			this._value = value;
		}
	}

	/** Sets the radio class as disabled */	
	@HostBinding('class.is-disabled')
	@Input()
	get disabled(): boolean {
		return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
	}

	set disabled(value: boolean) {
		// The presence of *any* disabled value makes the component disabled, *except* for false.
		this._disabled = (value != null && value !== false) ? true : null;
	}

	ngOnInit() {
		if (this.radioGroup) {
			// If the radio is inside a radio group, determine if it should be checked
			this.checked = this.radioGroup.value === this._value;
			// Copy name from parent radio group
			this.name = this.radioGroup.name;
		}
	}

	private _emitChangeEvent(): void {
		let event = new DFRadioChange();
		event.source = this;
		event.value = this._value;
		this.change.emit(event);
	}

	_onInputFocus() {
		this._isFocused = true;
	}

	_onInputBlur() {
		this._isFocused = false;

		if (this.radioGroup) {
			this.radioGroup._touch();
		}
	}

	_onInputClick(event: Event) {
		// We have to stop propagation for click events on the visual hidden input element.
		// By default, when a user clicks on a label element, a generated click event will be
		// dispatched on the associated input element. Since we are using a label element as our
		// root container, the click event on the `radio-button` will be executed twice.
		// The real click event will bubble up, and the generated click event also tries to bubble up.
		// This will lead to multiple click events.
		// Preventing bubbling for the second event will solve that issue.
		event.stopPropagation();
	}

	/**
	 * Triggered when the radio button received a click or the input recognized any change.
	 * Clicking on a label element, will trigger a change event on the associated input.
	 * TODO: internal
	 */
	_onInputChange(event: Event) {
		// We always have to stop propagation on the change event.
		// Otherwise the change event, from the input element, will bubble up and
		// emit its event object to the `change` output.
		event.stopPropagation();

		let groupValueChanged = this.radioGroup && this.value != this.radioGroup.value;
		this.checked = true;
		this._emitChangeEvent();

		if (this.radioGroup) {
			this.radioGroup._touch();
			if (groupValueChanged) {
				this.radioGroup.updateValueFromRadio(this.value);
			}
		}
	}

	getHostElement() {
		return this._elementRef.nativeElement;
	}

}
