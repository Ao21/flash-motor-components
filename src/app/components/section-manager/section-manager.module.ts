import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionManagerComponent } from './section-manager.component';

import { DynamicFormModule } from './../dynamic-form-module/dynamic-form-module';

@NgModule({
	imports: [
		DynamicFormModule,
		CommonModule
	],
	declarations: [SectionManagerComponent],
	exports: [SectionManagerComponent]
})
export class SectionManagerModule { }
