/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Shape } from 'mo-js';

import { TimelineItemComponent } from './timeline-item.component';
import { MojsInit } from './../../../mojs/mojs-init';


describe('TimelineItemComponent', () => {
	let component: TimelineItemComponent;
	let fixture: ComponentFixture<TimelineItemComponent>;
	let mojsInit = new MojsInit();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TimelineItemComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TimelineItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
