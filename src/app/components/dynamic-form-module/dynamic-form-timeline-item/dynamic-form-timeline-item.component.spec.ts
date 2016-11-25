/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Shape } from 'mo-js';

import { DynamicFormTimelineItemComponent } from './dynamic-form-timeline-item.component';
import { MojsInit } from './../../mojs/mojs-init';


describe('DynamicFormTimelineItemComponent', () => {
	let component: DynamicFormTimelineItemComponent;
	let fixture: ComponentFixture<DynamicFormTimelineItemComponent>;
	let mojsInit = new MojsInit();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DynamicFormTimelineItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicFormTimelineItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
