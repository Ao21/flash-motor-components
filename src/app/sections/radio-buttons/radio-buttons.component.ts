import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { RadioQuestion } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-textbox-component',
	templateUrl: './radio-buttons.html'
})
export class RadioButtonComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new RadioQuestion({
			key: 'radioQuestion',
			label: 'Radio Question',
			type: 'radio',
			options: ['Yes', 'No'],
			required: true,
			order: 2,
			validators: []
		}),
		new RadioQuestion({
			key: 'radioQuestion2',
			label: 'Disabled Radio Question',
			type: 'radio',
			options: ['Yes', 'No'],
			required: true,
			disabled: true,
			order: 2,
			validators: []
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
