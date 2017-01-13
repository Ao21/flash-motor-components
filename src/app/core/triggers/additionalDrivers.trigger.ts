import { DynamicFormQuestionComponent } from './../../components/dynamic-form-module/dynamic-form-question/dynamic-form-question.component';
/**
 * This Creates or Removes Additional Drivers
 */
export function additionalDrivers(formQuestion: DynamicFormQuestionComponent) {
	formQuestion.control.valueChanges.subscribe((value) => {
		formQuestion.sectionControlService.adjustAdditionalDrivers(value);
	});
};