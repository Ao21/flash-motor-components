import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormQuestionRadioComponent } from './dynamic-form-question-radio/dynamic-form-question-radio.component';
import { DynamicFormQuestionRadioGroupDirective } from './dynamic-form-question-radio-group/dynamic-form-question-radio-group.component';
import { UniqueSelectionDispatcher } from './../../../core';
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		DynamicFormQuestionRadioComponent,
		DynamicFormQuestionRadioGroupDirective
	],
	exports: [
		DynamicFormQuestionRadioComponent,
		DynamicFormQuestionRadioGroupDirective
	],
	providers: [
		UniqueSelectionDispatcher
	]

})
export class DynamicFormQuestionRadioModule { }
