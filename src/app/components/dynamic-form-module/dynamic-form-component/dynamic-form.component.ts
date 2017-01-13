import { Component, Input, ViewEncapsulation, Output, OnDestroy, OnInit, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs/Rx';

import { coerceBooleanProperty } from './../../../core/core';

import { QuestionBase } from './../question-models/questionBase';
import { QuestionControlService } from './../../../services/question-control.service';
import { TimelineControlService } from './../../../services/timeline-control.service';

import { Store } from '@ngrx/store';
import * as AppState from './../../../stores/reducer';
import * as questions from './../../../stores/questions/questions.actions';

import * as _ from 'lodash';

/**
 *	Dynamic Form
 *
 *	Selector: df-question
 *	Example:
 *		<mf-dynamic-form
 *			*ngIf="questions"
 *			[questions]="questions"
 *			(onStatusChange)="formStatusUpdated($event)">
 *		</mf-dynamic-form>
 *	
 */


@Component({
	selector: 'mf-dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {

	/** Connect to the store if a section is defined */
	@Input() section: SectionObject;

	/** Automatically save to section as form fields become valid */
	private _saveToSection: boolean = true;
	@Input()
	set saveToSection(v) {
		if (!v) { return; };
		this._saveToSection = coerceBooleanProperty(v);
	}
	get saveToSection() {
		return this._saveToSection;
	}

	/** The Questions that will generate the indiviual form components */
	@Input() questions: QuestionBase<any>[] = [];

	/** Event emitted on form update */
	@Output() onStatusChange: EventEmitter<any> = new EventEmitter();
	@Output() onValueChange: EventEmitter<any> = new EventEmitter();

	/** The form group that will hold the form itself */
	form: FormGroup;
	payLoad = '';

	subscriptions: Subscription[] = [];


	constructor(
		private el: ElementRef,
		private timelineControlService: TimelineControlService,
		private questionControlService: QuestionControlService,
		private store: Store<AppState.State>
	) { }

	ngOnInit() {
		this.form = this.questionControlService.toFormGroup(this.questions);
	}

	setupSubscriptions() {
		let statusUpdate = this.form.statusChanges.distinctUntilChanged().subscribe(this.emitFormStatusChange);
		let valueUpdate = this.form.valueChanges.distinctUntilChanged().subscribe(this.emitFormValueChange);
		let storeUpdates = this.form.valueChanges.debounceTime(350).distinctUntilChanged().subscribe(this.storeUpdate);
		this.subscriptions.push(statusUpdate, valueUpdate, storeUpdates);

		setTimeout(() => {
			this.emitFormStatusChange(this.form.status);
		});
	}

	ngAfterViewInit() {
		this.setupSubscriptions();
	}

	trackFn(index, item) {
		return item.id;
	}

	createTimelineItems() {
		let timelineItems: TimelineItem[] = [];
		let formElements: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.form-row');

		for (let i = 0; i < formElements.length; i++) {
			timelineItems.push({
				key: this.questions[i].key,
				x: formElements[i].offsetTop
			});
		}
		this.timelineControlService.addTimelineItems(timelineItems);

	}

	onFieldStatusUpdated = (next: TimelineItemUpdate) => {
		this.timelineControlService.updateTimelineItems(next);
	}

	emitFormStatusChange = (next) => {
		this.onStatusChange.next(next);
	}

	emitFormValueChange = (next) => {
		this.onValueChange.next(this.form.value);
	}

	storeUpdate = () => {
		if (this.saveToSection) {
			this.updateStore();
		}
	}

	updateStore() {
		_.forIn(this.form.controls, (e, k) => {
			if (e.valid) {
				this.store.dispatch(new questions.UpdateFieldValue({ id: e['id'], key: k, value: e.value }));
			}
		});
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}

}
