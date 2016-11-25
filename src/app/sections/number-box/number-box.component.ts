import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { TextBox } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-number-box-component',
	templateUrl: './number-box.html'
})
export class NumberBoxComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new TextBox({
			key: 'firstName',
			label: 'Number Component',
			type: 'number',
			required: true,
			placeholder: 'Number Component',
			order: 0,
		}),
		new TextBox({
			key: 'firstName2',
			label: 'Disabled Number Component',
			type: 'number',
			required: true,
			disabled: true,
			placeholder: 'Number Component',
			order: 0,
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
