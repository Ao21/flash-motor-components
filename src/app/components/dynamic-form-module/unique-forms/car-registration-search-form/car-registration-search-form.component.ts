import { Component, Input, Output, OnDestroy, OnInit, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { coerceBooleanProperty } from './../../../../core/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';

import { AddressQuestion } from './../../question-models/';
import { QuestionControlService } from './../../../../services/question-control.service';
import { AddressControlService } from './../../../../services/address-control.service';

import { CarControlService } from './../../../../services/car-control.service';

import { Store } from '@ngrx/store';
import * as AppState from './../../../../stores/reducer';
import * as questions from './../../../../stores/questions/questions.actions';

import { TextBox } from './../../question-models/';



@Component({
	selector: 'df-car-registration-search',
	templateUrl: './car-registration-search-form.component.html',
	styleUrls: ['./car-registration-search-form.component.scss'],
	providers: [CarControlService]
})
export class CarRegistrationSearchComponent implements OnInit {	
	@Input() section: SectionObject;
	defaultQuestion: QuestionBase<TextBox>[];

	@Output() isSearching: EventEmitter<any> = new EventEmitter();	
	@Output() noCarRegistration: EventEmitter<any> = new EventEmitter();
	@Output() carRegistration: EventEmitter<any> = new EventEmitter();

	constructor(
		private store: Store<AppState.State>,
		private carControlService: CarControlService,
		private questionControlService: QuestionControlService
	) {}

	ngOnInit() {
		let defQ = this.carControlService.createRegistrationSearchQuestion();
		this.defaultQuestion = this.questionControlService.createQuestions(defQ, this.section.id);
	}

	searchForRegistration(form) {
		this.isSearching.next(true);
		if (form.form.status === 'VALID') {
			this.carControlService.getCarRegistration(form.form.value.carSearchQuestion)
				.subscribe((response) => {
					this.isSearching.next(false);
					this.carRegistration.next(response);
			});
		}
	}

	emitNoRegistration() {
		this.noCarRegistration.next(true);
	}

}
