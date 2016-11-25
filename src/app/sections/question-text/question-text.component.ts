import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ViewChild, ViewChildren, QueryList } from '@angular/core';

import { QuestionText } from './../../components/dynamic-form-module/question-models/';


@Component({
	selector: 'df-question-text-component',
	templateUrl: './question-text.html'
})
export class QuestionTestComponent implements OnInit {

	disabled: boolean = false;
	questions = [
		new QuestionText({
			key: 'termsConditions',
			label: 'Question Text Field',
			type: 'questionText',
			order: 2,
			timeline: false,
			content: `By providing the requested data, you consent to AA's Data Protection and Privacy Policy and to AA using it for administration and keeping you informed by mail, telephone, email and SMS of other products and services from us. By proceeding, you consent to & confirm that you have read and accepted the AA Data Protection & Privacy Policy and the AA Terms & Conditions`
		})
	];

	ngOnInit() { }

	constructor() {
	}

}
