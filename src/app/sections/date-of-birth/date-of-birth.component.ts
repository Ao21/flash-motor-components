import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { DateQuestion } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-date-of-birth-component',
	templateUrl: './date-of-birth.html'
})
export class DateofBirthComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new DateQuestion({
			key: 'dateOfBirth',
			label: 'Date Of Birth',
			type: 'date',
			required: true,
			disabled: false,
			order: 2,
			validators: ['validDateValidate', 'validOverEighteenValidate']
		}),
		new DateQuestion({
			key: 'dateOfBirth2',
			label: 'Disabled Date Of Birth',
			type: 'date',
			required: true,
			disabled: true,
			order: 2,
			validators: ['validDateValidate', 'validOverEighteenValidate']
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
