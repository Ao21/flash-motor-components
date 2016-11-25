import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { TextBox } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-phone-number-component',
	templateUrl: './phone-number.html'
})
export class PhoneNumberComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new TextBox({
			key: 'phoneNumber',
			label: 'Phone Number Input',
			type: 'tel',
			required: true,
			disabled: false,
			order: 2,
			validators: ['validPhoneNumberValidate']
		}),
		new TextBox({
			key: 'phoneNumber2',
			label: 'Disabled Phone Number Input',
			type: 'tel',
			required: true,
			disabled: true,
			order: 2,
			validators: ['validPhoneNumberValidate']
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
