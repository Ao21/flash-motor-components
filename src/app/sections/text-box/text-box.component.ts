import { Component, OnInit, Input, Output, EventEmitter, HostBinding, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import {DynamicFormComponent } from './../../components/dynamic-form-module/dynamic-form-component/dynamic-form.component';

import { TextBox } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-textbox-component',
	templateUrl: './text-box.html'
})
export class TextBoxComponent implements OnInit, AfterViewInit {
	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;

	disabled: boolean = false;
	questions = [
		new TextBox({
			key: 'firstName',
			label: 'Text Input',
			type: 'text',
			required: true,
			order: 0,
		}),
		new TextBox({
			key: 'firstName2',
			label: 'Disabled Text Input',
			type: 'text',
			required: true,
			disabled: true,
			placeholder: 'Placholder',
			order: 0,
		}),
		new TextBox({
			key: 'firstName3',
			label: 'Text Input',
			type: 'text',
			value: 'Hello',
			required: true,
			order: 0,
		})
	];

	ngOnInit() {}

	ngAfterViewInit() {}
	constructor() {
	}

}
