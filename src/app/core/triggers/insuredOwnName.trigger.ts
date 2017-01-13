import { DynamicFormQuestionComponent } from './../../components/dynamic-form-module/dynamic-form-question/dynamic-form-question.component';
import { Observable } from 'rxjs/Rx';

export function insuredNamedDriver(formQuestion: DynamicFormQuestionComponent) {
	formQuestion.control.disable();
	formQuestion.hidden = true;
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			if (!option) {
				formQuestion.control.enable();
				formQuestion.hidden = false;
			} else {
				formQuestion.control.disable();
				formQuestion.hidden = true;
			}
		});

}

export function insuredOtherDriver(formQuestion: DynamicFormQuestionComponent) {
	formQuestion.control.disable();
	formQuestion.hidden = true;
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			if (option) {
				formQuestion.control.enable();
				formQuestion.hidden = false;
			} else {
				formQuestion.control.disable();
				formQuestion.hidden = true;
			}
		});

}



/**
 * This links the Type of Business field to the Occupation field
 */
export function insuredOwnName(formQuestion: DynamicFormQuestionComponent) {
	formQuestion.control.disable();
	formQuestion.hidden = true;

	Observable.combineLatest(
		formQuestion.form.controls[formQuestion.question.trigger.key1].valueChanges,
		formQuestion.form.controls[formQuestion.question.trigger.key2].valueChanges).subscribe(([insuredOwnName, insuredSomeoneElse]) => {
			if (insuredOwnName || insuredSomeoneElse) {
				formQuestion.control.enable();
				formQuestion.hidden = false;
			} else {
				formQuestion.control.disable();
				formQuestion.hidden = true;
			}
		});

}
