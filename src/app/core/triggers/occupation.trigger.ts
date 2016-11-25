import { DynamicFormQuestionComponent } from './../../components/dynamic-form-module/dynamic-form-question/dynamic-form-question.component';
/**
 * This links the Type of Business field to the Occupation field
 */
export function occupation(formQuestion: DynamicFormQuestionComponent) {
	formQuestion.control.disable();
	formQuestion.hidden = true;
	formQuestion.form.controls[formQuestion.question.trigger.key]
		.valueChanges
		.subscribe((option) => {
			if (option && option.id.split(':')[1] === 'null') {
				formQuestion.control.enable();
				formQuestion.hidden = false;
			} else {
				formQuestion.control.disable();
				formQuestion.hidden = true;
			}
		});
}