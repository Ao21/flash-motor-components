import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { TextBox } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-emailbox-component',
	templateUrl: './email-box.html'
})
export class EmailBoxComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new TextBox({
			key: 'email',
			label: 'Email Input',
			type: 'email',
			required: true,
			order: 0
		}),
		new TextBox({
			key: 'email2',
			label: 'Disabled Email Input',
			type: 'email',
			disabled: true,
			required: true,
			order: 0
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
