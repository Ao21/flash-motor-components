import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { DropdownQuestion } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-dropdown-component',
	templateUrl: './dropdown.html'
})
export class DropdownComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new DropdownQuestion({
				key: 'typeOfEmployment',
				label: 'Dropdown',
				type: 'dropdown',
				options: ['Employed', 'Household Duties', 'Retired', 'Self Employed', 'Unemployed'],
				required: true,
				order: 2,
				validators: []
		}),
		new DropdownQuestion({
				key: 'typeOfEmployment2',
				label: 'Disabled Dropdown',
				type: 'dropdown',
				options: ['Employed', 'Household Duties', 'Retired', 'Self Employed', 'Unemployed'],
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
