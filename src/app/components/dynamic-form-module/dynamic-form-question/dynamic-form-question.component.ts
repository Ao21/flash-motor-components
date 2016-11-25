import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { coerceBooleanProperty } from './../../../core/coersion/boolean-property';
import { QuestionTriggerService } from './../../../services/question-trigger.service';
import { QuestionBase } from './../question-models/questionBase';

/**
 *	Dynamic Form Question
 *
 *	Selector: df-question
 *	Example:
 *		<df-question
 *			(onStatusUpdate)="onFieldStatusUpdated($event)"
 *			[index]="ind"
 *			[question]="question"
 *			[form]="form">
 *		</df-question>
 *	
 */

@Component({
	selector: 'df-question',
	templateUrl: './dynamic-form-question.component.html',
	styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {

	// Emit update to timeline updates on status changes
	@Output() onStatusUpdate: EventEmitter<TimelineItemUpdate> = new EventEmitter();

	// The Question Model used to determine the question type and its properties
	@Input() question: QuestionBase<any>;

	// The Form the question is a part of
	@Input() form: FormGroup;

	// Index/Order of Question
	@Input() index: number;

	/**
	 *	Aria Settings
	 */
	@Input('aria-label') ariaLabel: string;
	@Input('aria-labelledby') ariaLabelledBy: string;
	private _ariaDisabled: boolean;
	@Input('aria-invalid')
	get ariaInvalid(): boolean { return !this.control.valid; }


	// Control of the Form Input pulled from FormGroup	
	control: AbstractControl;

	// Determine if question is visible or not
	hidden: boolean = false;

	// Determine if question is disabled or not	
	_disabled: boolean = false;

	get disabled() {
		return this._disabled;
	}

	set disabled(v) {
		this._disabled = coerceBooleanProperty(v)
		if (this._disabled) {
			/**
			 * Disables each component from its control
			 */
			this.control.disable();
		} else {
			this.control.enable();
		}
	}

	constructor(
		private questionTriggerService: QuestionTriggerService
	) { }


	ngOnInit() {
		// Get's the questions individual control from the form group
		this.control = this.form.controls[this.question.key];

		this.control.valueChanges.subscribe((next) => {
			// console.log(next);
		});

		// Emit changes in the questions validation status
		this.control.statusChanges.distinctUntilChanged().subscribe((next) => {
			this.updateStatus();
		});

		// Disable the form question component if disabled from the question config 		
		if (this.question.disabled) {
			this.disabled = this.question.disabled;
		}

		if (this.question.trigger) {
			this.questionTriggerService.getFormTrigger(this.question.trigger)(this);
		}

	}

	// Emit Status update changes	
	updateStatus = () => {
		this.onStatusUpdate.next({
			index: this.index,
			key: this.question.key,
			status: this.control.status,
			pristine: this.control.pristine
		});
	}

	get isValid() { return this.form.controls[this.question.key].valid; };

}
