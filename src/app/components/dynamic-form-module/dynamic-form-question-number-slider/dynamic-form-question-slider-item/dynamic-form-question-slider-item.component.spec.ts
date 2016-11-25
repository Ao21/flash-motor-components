/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DynamicFormQuestionNumberSliderItemComponent } from './dynamic-form-question-slider-item.component';

describe('DynamicFormQuestionNumberSliderItemComponent', () => {
	let component: DynamicFormQuestionNumberSliderItemComponent;
	let fixture: ComponentFixture<DynamicFormQuestionNumberSliderItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DynamicFormQuestionNumberSliderItemComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicFormQuestionNumberSliderItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
