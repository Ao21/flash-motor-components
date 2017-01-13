import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		DynamicFormCheckboxComponent,
	],
	exports: [
		DynamicFormCheckboxComponent,
	],
	providers: [
	]

})
export class DynamicFormQuestionCheckboxModule { }
