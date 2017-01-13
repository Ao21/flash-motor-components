import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarRegistrationSearchComponent } from './car-registration-search-form.component';
import { DynamicFormModule } from './../../dynamic-form-module';
import { DynamicFormDirectivesModule } from './../../directives/dynamic-form-directives';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		DynamicFormModule,
		DynamicFormDirectivesModule,
	],
	declarations: [
		CarRegistrationSearchComponent
	],
	exports: [
		CarRegistrationSearchComponent
	]
})
export class CarRegistrationSearchFormModule { }
