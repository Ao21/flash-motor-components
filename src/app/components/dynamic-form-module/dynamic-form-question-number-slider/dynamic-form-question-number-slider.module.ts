import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionNumberSliderComponent } from './dynamic-form-question-number-slider.component';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from './../../../core/gestures/gesture-config';
import { DynamicFormQuestionNumberSliderItemComponent } from './dynamic-form-question-slider-item/dynamic-form-question-slider-item.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		DynamicFormQuestionNumberSliderComponent,
		DynamicFormQuestionNumberSliderItemComponent
	],
	exports: [
		DynamicFormQuestionNumberSliderComponent,
		DynamicFormQuestionNumberSliderItemComponent
	],
	providers: [
		{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
	]
})
export class DynamicFormQuestionNumberSliderModule { }
