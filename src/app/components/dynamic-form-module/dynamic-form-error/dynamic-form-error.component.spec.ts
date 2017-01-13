/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { DynamicFormModule  } from './../dynamic-form-module';
import { DynamicFormErrorComponent } from './dynamic-form-error.component';

import { TEST_PROVIDERS } from './../../../../testing/constants/default-test-providers';


describe('DynamicFormErrorComponent', () => {
	let component: DynamicFormErrorComponent;
	let fixture: ComponentFixture<DynamicFormErrorComponent>;
	let element: DebugElement;
	let control: FormControl;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [DynamicFormModule],
			declarations: [],
			providers: [...TEST_PROVIDERS]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicFormErrorComponent);
		component = fixture.componentInstance;
		element = fixture.debugElement;
		component.control = new FormControl('', Validators.required);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display without an error', () => {
		expect(element.nativeElement.innerText).toEqual('', 'There should be no error message');
	});

	it('should show an error after the control is touched', () => {
		expect(element.nativeElement.innerText).toEqual('', 'There should be no error message');
		component.control.markAsTouched();
		fixture.detectChanges();
		expect(element.nativeElement.innerText).toEqual('Sorry, you forgot to fill in this question.', 'There should be an error message displayed');
	});

});
