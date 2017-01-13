import { DynamicFormQuestionComponent } from './../../components/dynamic-form-module/dynamic-form-question/dynamic-form-question.component';
import { Observable } from 'rxjs/Rx';

export function hideIfKeyEquals(formQuestion: DynamicFormQuestionComponent) {
	enableDisableForm(formQuestion.form.controls[formQuestion.question.trigger.key].value !== formQuestion.question.trigger.equals, formQuestion);
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			enableDisableForm(option !== formQuestion.question.trigger.equals, formQuestion);
		});
}

export function showIfKeyEquals(formQuestion: DynamicFormQuestionComponent) {;
	enableDisableForm(formQuestion.form.controls[formQuestion.question.trigger.key].value === formQuestion.question.trigger.equals, formQuestion);
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			enableDisableForm(option === formQuestion.question.trigger.equals, formQuestion);
		});
}



export function hideBasedOnKey(formQuestion: DynamicFormQuestionComponent) {
	enableDisableForm(!formQuestion.form.controls[formQuestion.question.trigger.key].value, formQuestion);
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			enableDisableForm(!option, formQuestion);
		});
}

export function showBasedOnKey(formQuestion: DynamicFormQuestionComponent) {
	enableDisableForm(formQuestion.form.controls[formQuestion.question.trigger.key].value, formQuestion);
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			enableDisableForm(option, formQuestion);
		});

}


export function showDualKey(formQuestion: DynamicFormQuestionComponent) {
	enableDisableForm(formQuestion.form.controls[formQuestion.question.trigger.key1].value || formQuestion.form.controls[formQuestion.question.trigger.key2].value, formQuestion);
	Observable.combineLatest(
		formQuestion.form.controls[formQuestion.question.trigger.key1].valueChanges,
		formQuestion.form.controls[formQuestion.question.trigger.key2].valueChanges).subscribe(([insuredOwnName, insuredSomeoneElse]) => {
			enableDisableForm(insuredOwnName || insuredSomeoneElse, formQuestion);
		});
}

function enableDisableForm(value, formQuestion) {
	if (value) {
		formQuestion.control.enable();
		formQuestion.hidden = false;
	} else {
		formQuestion.control.disable();
		formQuestion.hidden = true;
	}
}