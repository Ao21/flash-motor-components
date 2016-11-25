import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { SliderQuestion } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-number-slider-component',
	templateUrl: './number-slider.html'
})
export class NumberSliderComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new SliderQuestion({
			key: 'slider1',
			label: 'Slider with values',
			type: 'slider',
			required: true,
			disabled: false,
			order: 10,
			values: [5, 6, 11, 12],
		}),
		new SliderQuestion({
			key: 'slider2',
			label: 'Slider with Min/Max',
			type: 'slider',
			required: true,
			disabled: false,
			order: 10,
			value: 0,
			min: 0,
			max: 7
		}),
		new SliderQuestion({
			key: 'slider3',
			label: 'Slider with Stepped (50) Min/Max',
			type: 'slider',
			required: true,
			disabled: false,
			order: 10,
			steps: 50,
			min: 0,
			max: 5
		}),
		new SliderQuestion({
			key: 'slider4',
			label: 'Slider Disabled',
			type: 'slider',
			required: true,
			disabled: true,
			order: 10,
			values: [5, 6, 11, 12],
		}),
	];

	ngOnInit() { }

	constructor() {
	}

}
