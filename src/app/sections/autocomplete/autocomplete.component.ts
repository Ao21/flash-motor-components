import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { AutocompleteQuestion } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-autocomplete-component',
	templateUrl: './autocomplete.html'
})
export class AutoCompleteComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new AutocompleteQuestion({
			key: 'occupation',
			label: 'Autocomplete with Options',
			type: 'autocomplete',
			placeholder: 'Select an Occupation',
			serviceUrl: 'motor/occupation/',
			autoCompleteType: 'options', // search || all || options
			options: [
				{ id: 'Employed', text: 'Employed' },
				{ id: 'Household Duties', text: 'Household Duties' },
				{ id: 'Retired', text: 'Retired' },
				{ id: 'Self Employed', text: 'Self Employed' },
				{ id: 'Unemployed', text: 'Unemployed' },
				{ id: 'Very Employed', text: 'Very Employed' },
				{ id: 'Very Household Duties', text: 'Very Household Duties' },
				{ id: 'Very Retired', text: 'Very Retired' },
				{ id: 'Very Self Employed', text: 'Very Self Employed' }
			],
			required: true,
			disabled: false,
			// value: { id: 'Employed', text: 'Employed' },
			order: 2,
			validators: []
		}),
		new AutocompleteQuestion({
			key: 'occupation2',
			label: 'Autocomplete with Service (Search)',
			type: 'autocomplete',
			placeholder: 'Select an Occupation',
			serviceUrl: 'motor/occupation/',
			autoCompleteType: 'search', // search || all || options
			required: true,
			disabled: false,
			// value: { id: 'Employed', text: 'Employed' },
			order: 2,
			validators: []
		}),
		new AutocompleteQuestion({
			key: 'occupation3',
			label: 'Autocomplete with Service (all)',
			type: 'autocomplete',
			placeholder: 'Select an Occupation',
			serviceUrl: 'motor/occupation/',
			autoCompleteType: 'all', // search || all || options
			required: true,
			disabled: false,
			// value: { id: 'Employed', text: 'Employed' },
			order: 2,
			validators: []
		}),
		new AutocompleteQuestion({
			key: 'occupation4',
			label: 'Disabled Autocomplete',
			type: 'autocomplete',
			placeholder: 'Select an Occupation',
			serviceUrl: 'motor/occupation/',
			autoCompleteType: 'options', // search || all || options
			options: [
				{ id: 'Employed', text: 'Employed' },
				{ id: 'Household Duties', text: 'Household Duties' },
				{ id: 'Retired', text: 'Retired' },
				{ id: 'Self Employed', text: 'Self Employed' },
				{ id: 'Unemployed', text: 'Unemployed' },
				{ id: 'Very Employed', text: 'Very Employed' },
				{ id: 'Very Household Duties', text: 'Very Household Duties' },
				{ id: 'Very Retired', text: 'Very Retired' },
				{ id: 'Very Self Employed', text: 'Very Self Employed' }
			],
			required: true,
			disabled: true,
			// value: { id: 'Employed', text: 'Employed' },
			order: 2,
			validators: []
		}),
	];

	ngOnInit() { }

	constructor() {
	}

}
