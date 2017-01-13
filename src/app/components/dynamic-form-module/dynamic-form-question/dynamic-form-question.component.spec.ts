/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MojsInit } from './../../mojs/mojs-init';

import { DebugElement } from '@angular/core';
import { DynamicFormModule } from './../dynamic-form-module';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextBox } from './../question-models/textInputQuestion';

import { QuestionTriggerService } from './../../../services/question-trigger.service';

import { StoreModule, Store, State, ActionReducer } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule, LiftedState, StoreDevtoolsConfig } from '@ngrx/store-devtools';

import * as reducer from './../../../stores/reducer';
import { TEST_PROVIDERS } from './../../../../testing/constants/default-test-providers';


describe('DynamicFormQuestionComponent', () => {
	let mojsInit = new MojsInit();
	let component: DynamicFormQuestionComponent;
	let fixture: ComponentFixture<DynamicFormQuestionComponent>;

	let formGroup = new FormGroup({ name: new FormControl('', Validators.required) });
	let question = new TextBox({
		type: 'text',
		label: 'What is your name?',
		required: true,
		placeholder: 'I am a placeholder!',
		key: 'name',
		order: 1
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				DynamicFormModule,
			],
			declarations: [],
			providers: [...TEST_PROVIDERS]
		}).compileComponents();
	}));

	describe('Textbox Input', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(DynamicFormQuestionComponent);
			component = fixture.componentInstance;
			component.index = 0;
			component.form = formGroup;
			component.question = question;
			fixture.detectChanges();
		});

		it('should create a textbox', () => {
			expect(component).toBeTruthy();
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['class']).toBe('df-question__input-text df-question');
		});

		it('should have an id', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.id).toBe('name');
		});

		it('should have autocapitalise set to sentences', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['autocapitalize']).toBe('sentences');
		});

		it('should have an aria-label', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['aria-label']).toBe('What is your name?');
		});

		it('should have an aria-labeled by', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['aria-labelledby']).toBe('name');
		});

		it('should have an aria-disabled', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['aria-disabled']).toBe('false');
		});

		it('should have an aria-invalid', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['aria-invalid']).toBe('true');
		});

		it('should have an aria required', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.attributes['aria-required']).toBe('true');
		});

		it('should have a placholder', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.placeholder).toBe('I am a placeholder!');
		});

		it('should be able to be set to text type', () => {
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.type).toBe('text');
		});

		it('should be able to generate a number form', async(() => {
			component.question['type'] = 'number';
			fixture.detectChanges();
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.type).toBe('number');
		}));

		it('should be able to generate an email form', async(() => {
			component.question['type'] = 'email';
			fixture.detectChanges();
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.type).toBe('email');
		}));

		it('the textbox should work with validators', async(() => {
			component.question['type'] = 'text';
			fixture.detectChanges();
			expect(component).toBeTruthy();
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.classes['ng-valid']).toBeFalsy();
			el.nativeElement.value = 'Hello';
			el.nativeElement.dispatchEvent(new Event('input'));
			fixture.detectChanges();
			expect(el.classes['ng-valid']).toBeTruthy();
		}));

		it('should be able to set the view value from the control', async(() => {
			component.question.value = 'Hello';
			fixture.detectChanges();
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.value).toBe('Hello');
		}));

		it('should be able to be set disabled', async(() => {
			component.control.disable();
			fixture.detectChanges();
			let el = fixture.debugElement.query(By.css('input'));
			expect(el.nativeElement.disabled).toBe(true);
			expect(el.attributes['aria-disabled']).toBe('true');
		}));
	});

});
