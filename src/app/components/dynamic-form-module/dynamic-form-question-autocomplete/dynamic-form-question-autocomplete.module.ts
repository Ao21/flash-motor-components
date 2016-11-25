import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from './../../../core/overlay/overlay-directives';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionAutocompleteComponent } from './dynamic-form-question-autocomplete.component';
import { DynamicFormOptionModule } from './../dynamic-form-question-option/dynamic-form-question-option.module';
import { PipeModules } from './../../../core/pipes/pipe-modules';
import { DynamicFormDirectivesModule } from './../directives/dynamic-form-directives';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PipeModules,
		OverlayModule,
		DynamicFormOptionModule,
		DynamicFormDirectivesModule
	],
	declarations: [
		DynamicFormQuestionAutocompleteComponent
	],
	exports: [
		DynamicFormQuestionAutocompleteComponent
	]
})
export class DynamicFormQuestionAutocompleteModule { }
