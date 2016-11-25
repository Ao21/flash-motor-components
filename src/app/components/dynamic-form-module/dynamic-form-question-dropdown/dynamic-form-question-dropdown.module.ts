import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionDropdownComponent } from './dynamic-form-question-dropdown.component';
import { DynamicFormOptionModule } from './../dynamic-form-question-option/dynamic-form-question-option.module';
import { OverlayModule } from './../../../core/overlay/overlay-directives';
import { DynamicFormDirectivesModule  } from './../directives/dynamic-form-directives';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		OverlayModule,
		DynamicFormOptionModule,
		DynamicFormDirectivesModule
	],
	declarations: [
		DynamicFormQuestionDropdownComponent,
	],
	exports: [
		DynamicFormQuestionDropdownComponent,
	]
})
export class DynamicFormDropdownModule { }
