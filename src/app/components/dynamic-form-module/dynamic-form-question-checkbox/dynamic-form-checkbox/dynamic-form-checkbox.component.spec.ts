/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';


import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';
import { DynamicFormDirectivesModule } from './../../directives/dynamic-form-directives';
import { CheckboxQuestion } from './../../question-models/';
import { MojsInit } from './../../../mojs/mojs-init';


describe('DynamicFormCheckboxComponent', () => {
	let mojsInit = new MojsInit();
	let component: DynamicFormCheckboxComponent;
	let fixture: ComponentFixture<any>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule
			],
			declarations: [
				DynamicFormCheckboxComponent,
				BasicCheckbox
			]
		})
			.compileComponents();
	}));


	describe('Basic Behaivor', () => {
		let checkboxDebugElement: DebugElement;
		let checkboxNativeElement: HTMLElement;
		let checkboxInstance: DynamicFormCheckboxComponent;
		let testComponent: BasicCheckbox;
		let inputElement: HTMLInputElement;
		let labelElement: HTMLLabelElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicCheckbox);
			fixture.detectChanges();

			checkboxDebugElement = fixture.debugElement.query(By.directive(DynamicFormCheckboxComponent));
			checkboxNativeElement = checkboxDebugElement.nativeElement;
			checkboxInstance = checkboxDebugElement.componentInstance;
			testComponent = fixture.debugElement.componentInstance;

			inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
			labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label');

		});

		it('should add and remove the checked state', () => {
			expect(checkboxInstance.checked).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-checked');
			expect(inputElement.checked).toBe(false);

			testComponent.isChecked = true;
			fixture.detectChanges();

			expect(checkboxInstance.checked).toBe(true);
			expect(checkboxNativeElement.classList).toContain('is-checked');
			expect(inputElement.checked).toBe(true);

			testComponent.isChecked = false;
			fixture.detectChanges();

			expect(checkboxInstance.checked).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-checked');
			expect(inputElement.checked).toBe(false);
		});

		it('should change native element checked when check programmatically', () => {
			expect(inputElement.checked).toBe(false);

			checkboxInstance.checked = true;
			fixture.detectChanges();

			expect(inputElement.checked).toBe(true);
		});

		it('should toggle checked state on click', () => {
			expect(checkboxInstance.checked).toBe(false);

			labelElement.click();
			fixture.detectChanges();

			expect(checkboxInstance.checked).toBe(true);

			labelElement.click();
			fixture.detectChanges();

			expect(checkboxInstance.checked).toBe(false);
		});

		it('should add and remove disabled state', () => {
			expect(checkboxInstance.disabled).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-disabled');
			expect(inputElement.tabIndex).toBe(0);
			expect(inputElement.disabled).toBe(false);

			testComponent.isDisabled = true;
			fixture.detectChanges();

			expect(checkboxInstance.disabled).toBe(true);
			expect(checkboxNativeElement.classList).toContain('is-disabled');
			expect(inputElement.disabled).toBe(true);

			testComponent.isDisabled = false;
			fixture.detectChanges();

			expect(checkboxInstance.disabled).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-disabled');
			expect(inputElement.tabIndex).toBe(0);
			expect(inputElement.disabled).toBe(false);
		});

		it('should not toggle `checked` state upon interation while disabled', () => {
			testComponent.isDisabled = true;
			fixture.detectChanges();

			checkboxNativeElement.click();
			expect(checkboxInstance.checked).toBe(false);
		});

		it('should preserve the user-provided id', () => {
			console.log(checkboxNativeElement);
			expect(checkboxNativeElement.id).toBe('checkboxControl');
		});

		it('should project the checkbox content into the label element', () => {
			let label = <HTMLLabelElement>checkboxNativeElement.querySelector('.df-checkbox-label-content');
			expect(label.textContent.trim()).toBe('checkbox 1');
		});

		it('should make the host element a tab stop', () => {
			expect(inputElement.tabIndex).toBe(0);
		});

		it('should not trigger the click event multiple times', () => {
			// By default, when clicking on a label element, a generated click will be dispatched
			// on the associated input element.
			// Since we're using a label element and a visual hidden input, this behavior can led
			// to an issue, where the click events on the checkbox are getting executed twice.

			spyOn(testComponent, 'onCheckboxClick');

			expect(inputElement.checked).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-checked');

			labelElement.click();
			fixture.detectChanges();

			expect(checkboxNativeElement.classList).toContain('is-checked');
			expect(inputElement.checked).toBe(true);

			expect(testComponent.onCheckboxClick).toHaveBeenCalledTimes(1);
		});

		it('should trigger a change event when the native input does', async(() => {
			spyOn(testComponent, 'onCheckboxChange');

			expect(inputElement.checked).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-checked');

			labelElement.click();
			fixture.detectChanges();

			expect(inputElement.checked).toBe(true);
			expect(checkboxNativeElement.classList).toContain('is-checked');

			// Wait for the fixture to become stable, because the EventEmitter for the change event,
			// will only fire after the zone async change detection has finished.
			fixture.whenStable().then(() => {
				// The change event shouldn't fire, because the value change was not caused
				// by any interaction.
				expect(testComponent.onCheckboxChange).toHaveBeenCalledTimes(1);
			});
		}));

		it('should not trigger the change event by changing the native value', async(() => {
			spyOn(testComponent, 'onCheckboxChange');

			expect(inputElement.checked).toBe(false);
			expect(checkboxNativeElement.classList).not.toContain('is-checked');

			testComponent.isChecked = true;
			fixture.detectChanges();

			expect(inputElement.checked).toBe(true);
			expect(checkboxNativeElement.classList).toContain('is-checked');

			// Wait for the fixture to become stable, because the EventEmitter for the change event,
			// will only fire after the zone async change detection has finished.
			fixture.whenStable().then(() => {
				// The change event shouldn't fire, because the value change was not caused
				// by any interaction.
				expect(testComponent.onCheckboxChange).not.toHaveBeenCalled();
			});

		}));

		it('should forward the required attribute', () => {
			testComponent.isRequired = true;
			fixture.detectChanges();

			expect(inputElement.required).toBe(true);

			testComponent.isRequired = false;
			fixture.detectChanges();

			expect(inputElement.required).toBe(false);
		});

		it('should focus on underlying input element when focus() is called', () => {
			expect(document.activeElement).not.toBe(inputElement);

			checkboxInstance.focus();
			fixture.detectChanges();

			expect(document.activeElement).toBe(inputElement);
		});


	});

		describe('with name attribute', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(BasicCheckbox);
			fixture.detectChanges();
		});

		it('should forward name value to input element', () => {
			let checkboxElement = fixture.debugElement.query(By.directive(DynamicFormCheckboxComponent));
			let inputElement = <HTMLInputElement> checkboxElement.nativeElement.querySelector('input');

			expect(inputElement.getAttribute('name')).toBe('checkbox 1');
		});
	});


	describe('with form control', () => {
		let checkboxDebugElement: DebugElement;
		let checkboxInstance: DynamicFormCheckboxComponent;
		let testComponent: BasicCheckbox;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicCheckbox);
			fixture.detectChanges();

			checkboxDebugElement = fixture.debugElement.query(By.directive(DynamicFormCheckboxComponent));
			checkboxInstance = checkboxDebugElement.componentInstance;
			testComponent = fixture.debugElement.componentInstance;
		});

		it('should toggle the disabled state', () => {
			expect(checkboxInstance.disabled).toBe(false);

			testComponent.control.disable();
			fixture.detectChanges();

			expect(checkboxInstance.disabled).toBe(true);

			testComponent.control.enable();
			fixture.detectChanges();

			expect(checkboxInstance.disabled).toBe(false);
		});
	});
	

});


@Component({
	selector: 'basic-checkbox',
	template: `
		<df-checkbox
			class="df-question"
			[id]="question.key"
			[disabled]="isDisabled"
			[required]="isRequired"
			[checked]="isChecked"
			[name]="question.name"
			(click)="onCheckboxClick($event)"
			(change)="onCheckboxChange($event)"
			[formControl]="control">
				{{question.name}}
		</df-checkbox>
	`
})
class BasicCheckbox {
	disabled: boolean = false;
	isChecked: boolean = false;
	isRequired: boolean = false;
	isIndeterminate: boolean = false;
	isDisabled: boolean = false;
	question: CheckboxQuestion = new CheckboxQuestion({
		name: 'checkbox 1',
		key: 'checkboxControl',
		lablel: 'Checkbox Question',
		options: [
			{ text: 'Option 1', value: 'option1' },
			{ text: 'Option 2', value: 'option2' },
		]
	});

	onCheckboxChange(ev: any) { };
	onCheckboxClick(event: Event) { };

	form = new FormGroup({
		checkboxControl: new FormControl()
	});

	control: FormControl;

	@ViewChild(DynamicFormCheckboxComponent) checkbox: DynamicFormCheckboxComponent;

	constructor() {
		let ctrl: any = this.form.controls['checkboxControl'];
		this.control = ctrl;
	}
}
