import { DynamicFormQuestionComponent } from './../../components/dynamic-form-module/dynamic-form-question/dynamic-form-question.component';
import { isJsObject } from '@angular/core/src/facade/lang';

/**
 * This links the Type of Business field to the Occupation field
 */
export function disabledBasedOnKey(formQuestion: DynamicFormQuestionComponent) {
	let v = formQuestion.form.controls[formQuestion.question.trigger.key].value;
	let expectedType = formQuestion.question.trigger.expectedType;

	if (checkTypeAndReturnIfValue(v, expectedType)) {
		setTimeout(() => {
			return formQuestion.control.enable();
		});
	} else {
		formQuestion.control.setValue('');
		formQuestion.control.disable();
	}
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			if (checkTypeAndReturnIfValue(option, expectedType)) {
				formQuestion.control.enable();
			} else {
				formQuestion.control.setValue('');
				formQuestion.control.disable();
			}
		});
}

function checkTypeAndReturnIfValue(value, expectedType) {
	switch (expectedType) {
		case 'object':
			return isJsObject(value) ? true : false;
		case 'string':
			return value !== '' ? true : false;
	}
}