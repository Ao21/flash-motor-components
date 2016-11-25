/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MojsInit } from './../../mojs/mojs-init';
import { DynamicFormModule } from './../dynamic-form-module';
import { DynamicFormComponent } from './dynamic-form.component';
import { TextBox } from './../question-models/textInputQuestion';

import { QuestionControlService } from './../../../services/question-control.service';
import { QuestionTriggerService } from './../../../services/question-trigger.service';
import { TimelineControlService } from './../../../services/timeline-control.service';

describe('DynamicFormComponent', () => {
	let mojsInit = new MojsInit();
	let tcService: TimelineControlService;
	let component: DynamicFormComponent;
	let fixture: ComponentFixture<DynamicFormComponent>;
	let spy: jasmine.Spy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
				DynamicFormModule
			],
			providers: [
				TimelineControlService,
				QuestionTriggerService
			]
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicFormComponent);
		component = fixture.componentInstance;
		component.questions = [new TextBox({
			value: '',
			key: 'defaultQuestion',
			label: 'QuestionLabel',
			required: true,
			order: 1,
			type: 'text'
		})];
		tcService = fixture.debugElement.injector.get(TimelineControlService);
		spy = spyOn(tcService, 'updateTimelineItems').and.returnValue(true);
		fixture.detectChanges();
	});


	describe('the component', () => {

		it('should emit an update to the timeline service', async(() => {
			component.onFieldStatusUpdated({
				index: 1,
				key: 'testQuestion',
				status: 'INVALID',
				pristine: false
			});
			let call = spy.calls.mostRecent().args[0];
			expect(call.key).toBe('testQuestion');
			expect(call.status).toBe('INVALID');
		}));

		it('should emit an update to the timeline service from a form field status change', () => {
			let el = fixture.debugElement.query(By.css('df-question input')).nativeElement;
			el.value = 'TestInput';
			el.dispatchEvent(new Event('input'));
			let call = spy.calls.first().args[0];
			expect(call.key).toBe('defaultQuestion');
			expect(call.status).toBe('VALID');
		});

		it('should be able to create a form with a list of questions', async(() => {
			component.questions = [new TextBox({
				value: '',
				key: 'defaultQuestion',
				label: 'QuestionLabel',
				order: 1,
				type: 'text'
			}), new TextBox({
				value: '',
				key: 'defaultQuestion',
				label: 'QuestionLabel',
				order: 1,
				type: 'text'
			})];
			fixture.detectChanges();
			let form = fixture.debugElement.query(By.css('form'));
			let questionList = fixture.debugElement.queryAll(By.css('df-question'));
			expect(form.children.length).toBe(2);
			expect(questionList.length).toBe(2);
		}));

		it(`shouldn't create a form if there are no questions`, async(() => {
			component.questions = [];
			fixture.detectChanges();
			let form = fixture.debugElement.query(By.css('form'));
			expect(form.children.length).toBe(0);
		}));
	})


});
