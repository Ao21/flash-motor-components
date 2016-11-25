/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';


import { DynamicFormQuestionDateComponent } from './dynamic-form-question-date.component';
import { DynamicFormDirectivesModule } from './../directives/dynamic-form-directives';
import { DateQuestion } from './../question-models/';
import { MojsInit } from './../../mojs/mojs-init';

describe('DynamicFormQuestionDateComponent', () => {
	let mojsInit = new MojsInit();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				DynamicFormDirectivesModule
			],
			declarations: [
				BasicDate,
				DynamicFormQuestionDateComponent
			]
		})
			.compileComponents();
	}));


	describe('DOM', () => {

		let component: BasicDate;
		let fixture: ComponentFixture<BasicDate>;
		let element: HTMLElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicDate);
			component = fixture.componentInstance;
			element = fixture.debugElement.nativeElement;
			fixture.detectChanges();
		});

		it('should create a date input', () => {
			expect(component).toBeTruthy();
			expect(element.querySelector('.df-question-date-group')).not.toBeNull();
		})

		it('should have a day input', () => {
			expect(element.querySelector('.df-date-day')).not.toBeNull();
		});

		it('should have a month input', () => {
			expect(element.querySelector('.df-date-month')).not.toBeNull();
		});

		it('should have a year input', () => {
			expect(element.querySelector('.df-date-year')).not.toBeNull();
		});



	})

	describe('date validation', () => {
		let component: BasicDate;
		let fixture: ComponentFixture<BasicDate>;
		let element: HTMLElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicDate);
			component = fixture.componentInstance;
			element = fixture.debugElement.nativeElement;
			fixture.detectChanges();
		});

		describe('of day', () => {

			it('shouldnt accept letters', () => {
				let elem: any = element.querySelector('.df-date-day');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Day should not have a valid status');
				let day: HTMLInputElement = elem;
				day.value = 'df';
				dispatchEvent('input', day);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-day');;
				expect(e.classList.contains('ng-invalid')).toBeTruthy('Day does not have a valid status');
			})


			it('should accept a valid day', () => {
				let elem: any = element.querySelector('.df-date-day');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Day should not have a valid status');
				let day: HTMLInputElement = elem;
				day.value = '11';
				dispatchEvent('input', day);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-day');;
				expect(e.classList.contains('ng-valid')).toBeTruthy('Day does not have a valid status');
			})

			it('should reject an invalid day', () => {
				let elem: any = element.querySelector('.df-date-day');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Day should not have a valid status');
				let day: HTMLInputElement = elem;
				day.value = '50';
				dispatchEvent('input', day);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-day');;
				expect(e.classList.contains('ng-invalid')).toBeTruthy('Day should have an invalid status');
			})
		})

		describe('of month', () => {

			it('shouldnt accept letters', () => {
				let elem: any = element.querySelector('.df-date-month');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Month should not have a valid status');
				let month: HTMLInputElement = elem;
				month.value = 'df';
				dispatchEvent('input', month);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-month');;
				expect(e.classList.contains('ng-invalid')).toBeTruthy('Month should have an invalid status');
			})

			it('should accept a valid month', () => {
				let elem: any = element.querySelector('.df-date-month');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Month should not have a valid status');
				let month: HTMLInputElement = elem;
				month.value = '02';
				dispatchEvent('input', month);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-month');;
				expect(e.classList.contains('ng-valid')).toBeTruthy('Month does not have a valid status');
			})

			it('should reject an invalid month', () => {
				let elem: any = element.querySelector('.df-date-month');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Month should not have a valid status');
				let month: HTMLInputElement = elem;
				month.value = '14';
				dispatchEvent('input', month);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-month');;
				expect(e.classList.contains('ng-invalid')).toBeTruthy('Month should have an invalid status');
			})
		})

		describe('of year', () => {


			it('shouldnt accept letters', () => {
				let elem: any = element.querySelector('.df-date-year');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Year should not have a valid status');
				let year: HTMLInputElement = elem;
				year.value = 'df';
				dispatchEvent('input', year);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-year');;
				expect(e.classList.contains('ng-invalid')).toBeTruthy('Year should have an invalid status');
			})


			it('should accept a valid year', () => {
				let elem: any = element.querySelector('.df-date-year');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Year should not have a valid status');
				let year: HTMLInputElement = elem;
				year.value = '87';
				dispatchEvent('input', year);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-year');;
				expect(e.classList.contains('ng-valid')).toBeTruthy('Year does not have a valid status');
			})

			it('should reject an invalid year', () => {
				let elem: any = element.querySelector('.df-date-year');
				expect(elem.classList.contains('ng-valid')).toBeFalsy('Year should not have a valid status');
				let year: HTMLInputElement = elem;
				year.value = '9999';
				dispatchEvent('input', year);
				fixture.detectChanges();
				let e = element.querySelector('.df-date-year');;
				expect(e.classList.contains('ng-invalid')).toBeTruthy('Year should have an invalid status');
			})
		})

		describe('whole dates', () => {
			it('should accept valid dates', () => {
				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');
				day.value = '01';
				month.value = '01';
				year.value = '87';
				dispatchEvent('input', day);
				dispatchEvent('input', month);
				dispatchEvent('input', year);
				fixture.detectChanges();
				fixture.whenStable().then(() => {
					expect(element.querySelector('df-date').classList.contains('ng-valid')).toBeTruthy('Date Group should be valid');
				})
			})

			it('should reject invalid dates', () => {
				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');
				day.value = '01';
				month.value = '01';
				year.value = '12';
				dispatchEvent('input', day);
				dispatchEvent('input', month);
				dispatchEvent('input', year);
				fixture.detectChanges();
				fixture.whenStable().then(() => {
					expect(element.querySelector('df-date').classList.contains('ng-valid')).toBeTruthy('Date Group should be valid');
				})
			})

		})
	})


	describe('form integration', () => {
		let component: BasicDate;
		let fixture: ComponentFixture<BasicDate>;
		let element: HTMLElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicDate);
			component = fixture.componentInstance;
			element = fixture.debugElement.nativeElement;
			fixture.detectChanges();
		});

		describe('of the date group', () => {
			it('should set the input values from the form', () => {
				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');

				expect(day.value).toBe('');
				expect(month.value).toBe('');
				expect(year.value).toBe('');

				fixture.componentInstance.control.setValue('29/12/1987');
				fixture.detectChanges();

				expect(day.value).toBe('29');
				expect(month.value).toBe('12');
				expect(year.value).toBe('1987');

			})

			it('should be able to set the inputs to empty from the from', () => {
				fixture.componentInstance.control.setValue('29/12/1987');

				fixture.detectChanges();

				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');

				expect(day.value).toBe('29', 'Day value should be 29');
				expect(month.value).toBe('12', 'Month value should be 12');
				expect(year.value).toBe('1987', 'Year should be 1987');

				fixture.componentInstance.control.setValue('');
				fixture.detectChanges();

				expect(day.value).toBe('', 'Day value should be empty');
				expect(month.value).toBe('', 'Month value should be empty');
				expect(year.value).toBe('', 'Year value should be empty');
			});


			it('should update the control when all inputs are valid', () => {

				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');

				day.value = '04';
				month.value = '04';
				year.value = '1987';

				dispatchEvent('input', day);
				dispatchEvent('input', month);
				dispatchEvent('input', year);

				fixture.detectChanges();

				expect(component.control.value).toBe('04/04/1987', 'Control should be set to 04/04/1987 ');

			})

			it('should clear the control when any input is invalid', () => {

				expect(component.control.value).toBeNull('Value should be null');

				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');

				day.value = '04';
				month.value = '04';
				year.value = '1987';

				dispatchEvent('input', day);
				dispatchEvent('input', month);
				dispatchEvent('input', year);

				fixture.detectChanges();

				expect(component.control.value).toBe('04/04/1987');

				day.value = '';
				dispatchEvent('input', day);

				fixture.detectChanges();

				expect(component.control.value).toBe(null, 'Control shouldnt have a value');

			})

			it('should set the control to dirty after input entry', () => {
				expect(fixture.componentInstance.control.dirty).toBeFalsy('Expected Control to be empty')
				let day: any = element.querySelector('.df-date-day');
				let month: any = element.querySelector('.df-date-month');
				let year: any = element.querySelector('.df-date-year');

				day.value = '04';
				month.value = '04';
				year.value = '1987';

				dispatchEvent('input', day);
				dispatchEvent('input', month);
				dispatchEvent('input', year);

				fixture.detectChanges();

				expect(fixture.componentInstance.control.dirty).toBeTruthy('Expected Control to be dirty on selection change')
			})
		})

		describe('of the input controls', () => {
			it('should set the input controls to dirty after input entry', () => {
				expect(fixture.componentInstance.date.day.dirty).toBeFalsy('Expected Control to be empty')
				let day: any = element.querySelector('.df-date-day');

				day.value = '04';

				dispatchEvent('input', day);

				fixture.detectChanges();

				expect(fixture.componentInstance.date.day.dirty).toBeTruthy('Expected Control to be dirty on selection change')
			})
		})



	})

	describe('disabled behaviour', () => {
		let component: BasicDate;
		let fixture: ComponentFixture<BasicDate>;
		let debugElement: DebugElement;
		let nativeElement: HTMLElement;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicDate);
				component = fixture.componentInstance;
				nativeElement = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

		it('should set the group as disabled based on the controls status', () => {
			expect(component.date.day.disabled).toBeFalsy();
			expect(component.date.month.disabled).toBeFalsy();
			expect(component.date.year.disabled).toBeFalsy();
			
			component.control.disable();
			fixture.detectChanges();

			expect(component.date.day.disabled).toBeTruthy();
			expect(component.date.month.disabled).toBeTruthy();
			expect(component.date.year.disabled).toBeTruthy();

			let day: HTMLInputElement = fixture.debugElement.query(By.css('.df-date-day')).nativeElement;
			let month: HTMLInputElement = fixture.debugElement.query(By.css('.df-date-month')).nativeElement;
			let year: HTMLInputElement = fixture.debugElement.query(By.css('.df-date-year')).nativeElement;

			expect(day.disabled).toBeTruthy();
			expect(month.disabled).toBeTruthy();
			expect(year.disabled).toBeTruthy();
		})

		it('should set the tabindex of the items based on the disabled status', () => {
			let el: HTMLElement = fixture.debugElement.query(By.css('df-date')).nativeElement;
			expect(el.getAttribute('tabindex')).toBe('0');
			component.control.disable();
			fixture.detectChanges();
			expect(el.getAttribute('tabindex')).toBe('-1');
		})
	})
	describe('accessibility', () => {

		let component: BasicDate;
		let fixture: ComponentFixture<BasicDate>;
		let element: HTMLElement;


		describe('of the group', () => {

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicDate);
				component = fixture.componentInstance;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should have a role', () => {
				let elem = element.querySelector('df-date');
				expect(elem.getAttribute('role')).toBe('composite', 'The main component should have a role');
			})

			it('should have a valuetext aria attribute', () => {
				let elem = element.querySelector('df-date');
				fixture.componentInstance.control.setValue('29/12/1987');
				fixture.detectChanges();
				expect(elem.getAttribute('aria-valuetext')).toBe('29/12/1987', 'The aria-valuetext should be updated as the value changes');
			})

			it('should have an aria-invalid attribute', () => {
				let elem = element.querySelector('df-date');
				fixture.componentInstance.control.setValue('29/12/1987');
				fixture.detectChanges();
				expect(elem.getAttribute('aria-invalid')).toBe('false', 'The aria-invalid status should update to valid when the control is valid');
			})
		})

		describe('of the inputs', () => {

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicDate);
				component = fixture.componentInstance;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('day should have aria-invalid toggles', () => {
				let day: any = element.querySelector('.df-date-day');
				expect(day.getAttribute('aria-invalid')).toBe('true', 'The aria-invalid status should be invalid');
				day.value = '04';
				dispatchEvent('input', day);
				fixture.detectChanges();
				expect(day.getAttribute('aria-invalid')).toBe('false', 'The aria-invalid status should update to valid when the control is valid');
			})

			it('month should have aria-invalid toggles', () => {
				let month: any = element.querySelector('.df-date-month');
				expect(month.getAttribute('aria-invalid')).toBe('true', 'The aria-invalid status should be invalid');
				month.value = '04';
				dispatchEvent('input', month);
				fixture.detectChanges();
				expect(month.getAttribute('aria-invalid')).toBe('false', 'The aria-invalid status should update to valid when the control is valid');
			})

			it('year should have aria-invalid toggles', () => {
				let year: any = element.querySelector('.df-date-year');
				expect(year.getAttribute('aria-invalid')).toBe('true', 'The aria-invalid status should be invalid');
				year.value = '1987';
				dispatchEvent('input', year);
				fixture.detectChanges();
				expect(year.getAttribute('aria-invalid')).toBe('false', 'The aria-invalid status should update to valid when the control is valid');
			})

		})


	})



});


@Component({
	selector: 'basic-date',
	template: `
		<df-date
        class="df-question"
		[isDisabled]="control.disabled"
        [attr.aria-label]="question.label"
        [attr.aria-labelledby]="question.key"
        [formControl]="control"
        [id]="question.key">
    </df-date>
  `
})
class BasicDate {
	disabled: boolean = false;
	question: DateQuestion = new DateQuestion({
		key: 'dateOfBirth',
		label: 'Date Of Birth',
		type: 'date',
		required: true,
		order: 2,
		validators: ['validDateValidate', 'validOverEighteenValidate']
	})

	form = new FormGroup({
		dateOfBirth: new FormControl()
	});

	control: FormControl;

	@ViewChild(DynamicFormQuestionDateComponent) date: DynamicFormQuestionDateComponent;

	constructor() {
		let ctrl: any = this.form.controls['dateOfBirth'];
		this.control = ctrl;
	}
}


function dispatchEvent(eventName: string, element: HTMLElement | Element): void {
	let event = document.createEvent('Event');
	event.initEvent(eventName, true, true);
	element.dispatchEvent(event);
}