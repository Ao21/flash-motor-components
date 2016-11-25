import { Component, Input, Output, OnInit, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './../question-models/questionBase';
import { QuestionControlService } from './../../../services/question-control.service';
import { TimelineControlService } from './../../../services/timeline-control.service';

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
export class DynamicFormComponent implements OnInit, AfterViewChecked {

	/** The Questions that will generate the indiviual form components */
	@Input() questions: QuestionBase<any>[] = [];

	/** Event emitted on form update */
	@Output() onStatusChange: EventEmitter<any> = new EventEmitter();

	/** The form group that will hold the form itself */
	form: FormGroup;
	payLoad = '';


	constructor(
		private el: ElementRef,
		private timelineControlService: TimelineControlService,
		private questionControlService: QuestionControlService
	) { }

	ngOnInit() {
		this.form = this.questionControlService.toFormGroup(this.questions);
		this.form.valueChanges.subscribe((next) => {
			// console.log(this.form.value);
		})
		this.form.statusChanges.distinctUntilChanged().subscribe(this.emitFormStatusChange);

	}

	ngAfterViewChecked() {
		// this.createTimelineItems();
	}

	createTimelineItems() {
		let timelineItems: TimelineItem[] = [];
		let formElements: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.form-row');
		console.log(formElements);
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

}
