import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { TextBox } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-textbox-component',
	templateUrl: './text-box.html'
})
export class TextBoxComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new TextBox({
			key: 'firstName',
			label: 'Text Input',
			type: 'text',
			required: true,
			placeholder: 'John',
			order: 0,
		}),
		new TextBox({
			key: 'firstName2',
			label: 'Disabled Text Input',
			type: 'text',
			required: true,
			disabled: true,
			placeholder: 'John',
			order: 0,
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
