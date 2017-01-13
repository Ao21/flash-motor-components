import { Component, Input, Output, OnDestroy, OnInit, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { coerceBooleanProperty } from './../../../../core/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { FormGroup } from '@angular/forms';

import { AddressQuestion } from './../../question-models/';
import { QuestionControlService } from './../../../../services/question-control.service';
import { AddressControlService } from './../../../../services/address-control.service';

import { Store } from '@ngrx/store';
import * as AppState from './../../../../stores/reducer';
import * as questions from './../../../../stores/questions/questions.actions';

import { fullscreenSlideUp } from './../../../lists/list-animations/fullscreen-slideup.animation';

import * as _ from 'lodash';

@Component({
	selector: 'df-address-form',
	templateUrl: './address-form.component.html',
	styleUrls: ['./address-form.component.scss'],
	providers: [AddressControlService],
	animations: [fullscreenSlideUp]
})
export class AddressFormComponent implements OnInit {

	/** Connect to the store if a section is defined */
	@Input() section: SectionObject;


	/** The Questions that will generate the indiviual form components */
	@Input() address: AddressQuestion;
	@Input() questions: QuestionBase<any>[];

	/** Event emitted on form update */
	@Output() onStatusChange: EventEmitter<any> = new EventEmitter();
	@Output() onValueChange: EventEmitter<any> = new EventEmitter();

	/** The form group that will hold the form itself */
	form: FormGroup;
	payLoad = '';

	_addressOpen: boolean = false;
	addressIsSet: boolean = false;
	addressServiceFinished: boolean = false;
	addressItems: any[];

	selectedAddress = null;
	selectedItemId = null;

	get addressOpen(): boolean {
		return this._addressOpen;
	}

	subscriptions: Subscription[] = [];

	constructor(
		private el: ElementRef,
		private addressControlService: AddressControlService,
		private questionControlService: QuestionControlService,
		private store: Store<AppState.State>
	) { }

	ngOnInit() {
		this.form = this.questionControlService.toFormGroup(this.address.fields);
		this.form.valueChanges
			.debounceTime(150)
			.distinctUntilChanged()
			.filter((e) => this.form.status === 'VALID')
			.subscribe(this.searchAddress);
		this.questions = this.address.fields;

	}

	trackFn(index, item) {
		return item.id;
	}

	/** Opens the overlay panel. */
	open(): void {
		this._addressOpen = true;
	}

	/** Closes the overlay panel and focuses the host element. */
	close(): void {
		this._addressOpen = false;
	}

	searchAddress = () => {
		this.addressIsSet = false;
		this.store.dispatch(new questions.UpdateFieldValue({ id: this.address['id'], key: this.address.key, value: undefined }));
		this.emitFormStatusChange('INVALID');
		this.addressServiceFinished = false;
		this.addressControlService.search(this.form.value).subscribe((next) => {
			this.addressItems = next.lookups;
			this.addressServiceFinished = true;
		});
	}

	emitFormStatusChange = (next) => {
		this.onStatusChange.next(next);
	}

	emitFormValueChange = (next) => {
		this.onValueChange.next(this.form.value);
	}

	selectAddress = (id) => {
		this.selectedItemId = id;
		this.addressControlService.select(id)
			.subscribe((next) => {
				_.forIn(this.form.controls, (value, k) => {
					this.form.controls[k].patchValue(next[k]);
					this.store.dispatch(new questions.UpdateFieldValue({ id: value['id'], key: k, value: next[k] }));
				});
				this._addressOpen = false;
				this.addressServiceFinished = false;
				setTimeout(() => {
					this.selectedAddress = next.selected;
					this.store.dispatch(new questions.UpdateFieldValue({ id: this.address['id'], key: this.address.key, value: next.selected }));
					this.addressIsSet = true;
				}, 155);
			});
	}


}
