/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DynamicFormQuestionCounterComponent } from './dynamic-form-question-counter.component';
import { CounterQuestion } from './../question-models/';

describe('DynamicFormQuestionCounterComponent', () => {


	describe('counter', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations: [
					DynamicFormQuestionCounterComponent
				]
			})
				.compileComponents();
		}));

		describe('counter DOM', () => {
			let component: DynamicFormQuestionCounterComponent;
			let fixture: ComponentFixture<DynamicFormQuestionCounterComponent>;
			let element: HTMLElement;
			beforeEach(() => {
				fixture = TestBed.createComponent(DynamicFormQuestionCounterComponent);
				component = fixture.componentInstance;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should be able to create a counter', () => {
				expect(element.classList.contains('df-question-counter')).toBeTruthy();
			});

			it('should have a minus control', () => {
				expect(element.querySelector('.df-question-counter__minus')).not.toBeNull();
			});

			it('should have a plus control', () => {
				expect(element.querySelector('.df-question-counter__plus')).not.toBeNull();
			});

			it('should have a display value', () => {
				expect(element.querySelector('.df-question-counter__counter')).not.toBeNull();
			});

		});

		describe('default logic without min max', () => {
			let component: DynamicFormQuestionCounterComponent;
			let fixture: ComponentFixture<DynamicFormQuestionCounterComponent>;
			let element: HTMLElement;
			beforeEach(() => {
				fixture = TestBed.createComponent(DynamicFormQuestionCounterComponent);
				component = fixture.componentInstance;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should have a starting value of 0', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt zero');
			});

			it('should increase the counter when plus is selected', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt zero');
				let plus = element.querySelector('.df-question-counter__plus');
				dispatchEvent('click', plus);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('1', 'Counter Default Value wasnt zero');

			});

			it('should decrease the counter when minus is selected', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt zero');
				let minus = element.querySelector('.df-question-counter__minus');
				dispatchEvent('click', minus);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('-1', 'Counter Default Value wasnt zero');
			});

			it('should update the counter component when minus is selected', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt zero');
				let minus = element.querySelector('.df-question-counter__minus');
				dispatchEvent('click', minus);
				fixture.detectChanges();
				expect(component.value).toBe(-1);
			});

			it('should update the counter component when plus is selected', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt zero');
				let plus = element.querySelector('.df-question-counter__plus');
				dispatchEvent('click', plus);
				fixture.detectChanges();
				expect(component.value).toBe(1);
			});


		});

		describe('default counter min/max logic', () => {
			let component: DynamicFormQuestionCounterComponent;
			let fixture: ComponentFixture<DynamicFormQuestionCounterComponent>;
			let element: HTMLElement;
			beforeEach(() => {
				fixture = TestBed.createComponent(DynamicFormQuestionCounterComponent);
				component = fixture.componentInstance;
				component.min = 3;
				component.max = 7;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should have a starting value of 3', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('3', 'Counter Default Value wasnt 3');
			});

			it('should not be able to go to less than 3', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('3', 'Counter Default Value wasnt 3');
				let minus = element.querySelector('.df-question-counter__minus');
				dispatchEvent('click', minus);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('3', 'Counter Default Value wasnt 3');
			});

			it('should not be able to go to higher than 7', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('3', 'Counter Default Value wasnt 3');
				let plus = element.querySelector('.df-question-counter__plus');
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('7', 'Counter Default Value wasnt 3');
			});


		});

		describe('negative counter min/max logic', () => {
			let component: DynamicFormQuestionCounterComponent;
			let fixture: ComponentFixture<DynamicFormQuestionCounterComponent>;
			let element: HTMLElement;
			beforeEach(() => {
				fixture = TestBed.createComponent(DynamicFormQuestionCounterComponent);
				component = fixture.componentInstance;
				component.min = -2;
				component.max = 0;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should have a starting value of -2', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('-2', 'Counter Default Value wasnt -2');
			});

			it('should not be able to go to less than -2', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('-2', 'Counter Default Value wasnt -2');
				let minus = element.querySelector('.df-question-counter__minus');
				dispatchEvent('click', minus);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('-2', 'Counter Default Value wasnt -2');
			});

			it('should not be able to go to higher than 0', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('-2', 'Counter Default Value wasnt 0');
				let plus = element.querySelector('.df-question-counter__plus');
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				dispatchEvent('click', plus);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt 0');
			});


		});
	});

	describe('form integration', () => {

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [
					ReactiveFormsModule
				],

				declarations: [
					DynamicFormQuestionCounterComponent,
					BasicCounter,
					MinMaxCounter
				]
			}).compileComponents();
		}));



		describe('of default counter', () => {

			let component: BasicCounter;
			let fixture: ComponentFixture<BasicCounter>;
			let element: HTMLElement;
			beforeEach(() => {
				fixture = TestBed.createComponent(BasicCounter);
				component = fixture.componentInstance;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should set the control to zero by default', () => {
				expect(component.control.value).toBe(0, 'Control should be defaulted to zero');
			});

			it('should have a valid control on start', () => {
				expect(component.control.valid).toBeTruthy('Control was not valid');
			});


			it('should be able to set the view value from the form', () => {
				component.control.setValue(1);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('1', 'Counter Default Value wasnt 1');
			});

			it('should update the form when the counter is increased', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt 0');
				let plus = element.querySelector('.df-question-counter__plus');
				dispatchEvent('click', plus);
				fixture.detectChanges();
				expect(component.control.value).toBe(1, 'Control value wasnt 1');
			});

			it('should update the form when the counter is decreased', () => {
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('0', 'Counter Default Value wasnt 0');
				let minus = element.querySelector('.df-question-counter__minus');
				dispatchEvent('click', minus);
				fixture.detectChanges();
				expect(component.control.value).toBe(-1, 'Control value wasnt -1');
			});

			it('should set the counter control to be touched after the counter is increased', () => {
				expect(fixture.componentInstance.control.touched).toEqual(false, `Expected the control to start off as untouched.`);
				let minus = element.querySelector('.df-question-counter__minus');
				dispatchEvent('click', minus);
				fixture.detectChanges();
				expect(fixture.componentInstance.control.touched).toEqual(false, `Expected the control to start off as untouched.`);
				dispatchEvent('blur', minus);
				fixture.detectChanges();
				expect(fixture.componentInstance.control.touched).toBeTruthy('Expected Control to be touched after blur');
			});

		});

		describe('of min max counter', () => {
			let component: MinMaxCounter;
			let fixture: ComponentFixture<MinMaxCounter>;
			let element: HTMLElement;

			beforeEach(() => {
				fixture = TestBed.createComponent(MinMaxCounter);
				component = fixture.componentInstance;
				element = fixture.debugElement.nativeElement;
				fixture.detectChanges();
			});

			it('should have the min set for value if it has one', () => {
				fixture.detectChanges();
				expect(component.control.value).toBe(2);
			});

			it('should be able to set the view value from the form', () => {
				component.control.setValue(3);
				fixture.detectChanges();
				expect(element.querySelector('.df-question-counter__counter').textContent).toBe('3', 'Counter Default Value wasnt 3');
			});

		});




	});
	describe('disabled behaviour', () => {

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [
					ReactiveFormsModule
				],

				declarations: [
					DynamicFormQuestionCounterComponent,
					BasicCounter,
					MinMaxCounter
				]
			}).compileComponents();
		}));

		let component: MinMaxCounter;
		let fixture: ComponentFixture<MinMaxCounter>;
		let element: HTMLElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(MinMaxCounter);
			component = fixture.componentInstance;
			element = fixture.debugElement.nativeElement;
			fixture.detectChanges();
		});

		it('should be able to be disabled from the control', () => {
			fixture.whenStable().then(() => {
				component.control.disable();
				fixture.detectChanges();
				let plus = element.querySelector('.df-question-counter__plus');
				let minus = element.querySelector('.df-question-counter__minus');
				expect(plus.getAttribute('disabled')).toBeDefined();
				expect(minus.getAttribute('disabled')).toBeDefined();
			});
		});

		it('should be able to be disabled from a value', () => {
			fixture.whenStable().then(() => {
				component.counter.isDisabled = true;
				fixture.detectChanges();
				let plus = element.querySelector('.df-question-counter__plus');
				let minus = element.querySelector('.df-question-counter__minus');
				expect(plus.getAttribute('disabled')).toBeDefined();
				expect(minus.getAttribute('disabled')).toBeDefined();
			});
		});

	});
	describe('accessibility', () => {
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [
					ReactiveFormsModule
				],

				declarations: [
					DynamicFormQuestionCounterComponent,
					BasicCounter,
					MinMaxCounter
				]
			}).compileComponents();
		}));

		let component: MinMaxCounter;
		let fixture: ComponentFixture<MinMaxCounter>;
		let element: HTMLElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(MinMaxCounter);
			component = fixture.componentInstance;
			element = fixture.debugElement.nativeElement;
			fixture.detectChanges();
		});


		it('should have input sex to tabindex 0', () => {
			fixture.whenStable().then(() => {
				let counter = element.querySelector('df-counter');
				expect(counter.getAttribute('tabindex')).toEqual('0', 'tabindex should be zero');
			});
		});

		it('should have an aria label', () => {
			let counter = element.querySelector('df-counter');
			expect(counter.getAttribute('aria-label')).toBe('How many drivers?', 'aria label should be How Many Drivers');
			expect(counter.getAttribute('aria-labelledby')).toEqual('amountOfDrivers', 'aria labelledby should be amountOfDrivers');
		});


		it('should set aria-disabled for autocompletes that are disabled', () => {
			fixture.whenStable().then(() => {
				let counter = element.querySelector('df-counter');
				fixture.componentInstance.control.disable();
				fixture.detectChanges();
				expect(counter.getAttribute('aria-disabled')).toEqual('true', 'aria-disabled should be true');
				fixture.componentInstance.control.enable();
				fixture.detectChanges();
				expect(counter.getAttribute('aria-disabled')).toEqual('false', 'aria-disabled should be false');
			});
		});

		it('should have a default aria-valuenow attribute', () => {
			let counter = element.querySelector('df-counter');
			expect(counter.getAttribute('aria-valuenow')).toEqual('2', 'aria value should be 2');
		});

		it('should update the aria-valuenow attribute', () => {
			component.control.setValue(3);
			fixture.detectChanges();
			let counter = element.querySelector('df-counter');
			expect(counter.getAttribute('aria-valuenow')).toEqual('3', 'aria value should be 3');
		});

		it('should have an aria-valuemin attribute', () => {
			let counter = element.querySelector('df-counter');
			expect(counter.getAttribute('aria-valuemin')).toEqual('2', 'aria value min should be 2');
		});

		it('should have an aria-valuemax attribute', () => {
			let counter = element.querySelector('df-counter');
			expect(counter.getAttribute('aria-valuemax')).toEqual('7', 'aria value max should be 7');
		});


	});
});




@Component({
	selector: 'basic-counter',
	template: `
		<df-counter
		#input
		class="df-question"
		[formControl]="control"
		[isDisabled]="control.disabled"
		[attr.aria-label]="question.label"
		[attr.aria-labelledby]="question.key"
		[min]="question.min"
		[max]="question.max"
		[id]="question.key">
		</df-counter>
 `
})
class BasicCounter {
	disabled: boolean = false;
	question: CounterQuestion = new CounterQuestion({
		key: 'amountOfDrivers',
		label: 'How many drivers?',
		type: 'counter',
		required: true,
	});

	form = new FormGroup({
		amountOfDrivers: new FormControl()
	});

	control: FormControl;

	@ViewChild(DynamicFormQuestionCounterComponent) counter: DynamicFormQuestionCounterComponent;

	constructor() {
		let ctrl: any = this.form.controls['amountOfDrivers'];
		this.control = ctrl;
	}
}


@Component({
	selector: 'basic-counter',
	template: `
		<df-counter
		#input
		class="df-question"
		[formControl]="control"
		[isDisabled]="control.disabled"
		[attr.aria-label]="question.label"
		[attr.aria-labelledby]="question.key"
		[min]="question.min"
		[max]="question.max"
		[id]="question.key">
		</df-counter>
 `
})
class MinMaxCounter {
	disabled: boolean = false;
	question: CounterQuestion = new CounterQuestion({
		key: 'amountOfDrivers',
		label: 'How many drivers?',
		type: 'counter',
		min: 2,
		max: 7,
		required: true,
	});

	form = new FormGroup({
		amountOfDrivers: new FormControl()
	});

	control: FormControl;

	@ViewChild(DynamicFormQuestionCounterComponent) counter: DynamicFormQuestionCounterComponent;

	constructor() {
		let ctrl: any = this.form.controls['amountOfDrivers'];
		this.control = ctrl;
	}
}


function dispatchEvent(eventName: string, element: HTMLElement | Element): void {
	let event = document.createEvent('Event');
	event.initEvent(eventName, true, true);
	element.dispatchEvent(event);
}
