import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionOptionComponent } from './dynamic-form-question-option.component';
@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		DynamicFormQuestionOptionComponent
	],
	exports: [
		DynamicFormQuestionOptionComponent
	]
})
export class DynamicFormOptionModule { }
