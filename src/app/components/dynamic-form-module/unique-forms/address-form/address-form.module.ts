import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form.component';
import { ListModule } from './../../../lists/lists.module';
import { DynamicFormModule } from './../../dynamic-form-module';
import { DynamicFormDirectivesModule } from './../../directives/dynamic-form-directives';
import { OverlayModule } from './../../../../core/overlay/overlay-directives';



@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		DynamicFormModule,
		DynamicFormDirectivesModule,
		ListModule,
		OverlayModule
	],
	declarations: [
		AddressFormComponent
	],
	exports: [
		AddressFormComponent
	]
})
export class AddressFormModule { }
