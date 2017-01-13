/* tslint:disable:no-unused-variable */
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MojsInit } from './../../mojs/mojs-init';

import { OverlayContainer } from './../../../core/overlay/overlay-container';


import { DebugElement } from '@angular/core';
import { DynamicFormQuestionAutocompleteModule } from './dynamic-form-question-autocomplete.module';
import { Dir } from './../../../core/rtl/dir';

import { DynamicFormQuestionOptionComponent } from './../dynamic-form-question-option/dynamic-form-question-option.component';
import { DynamicFormQuestionAutocompleteComponent } from './dynamic-form-question-autocomplete.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutocompleteControlService } from './../../../services/autocomplete-control.service';
import { AutocompleteQuestion } from './../question-models/autocompleteQuestion';

import { ViewportRuler } from './../../../core/overlay/position/viewport-ruler';

import { TestScheduler, Subject } from 'rxjs/Rx';

import { MdCoreModule, OVERLAY_PROVIDERS } from './../../../core/core';

describe('DynamicFormQuestionAutocompleteComponent', () => {
	let overlayContainerElement: HTMLElement;
	let dir: { value: string };
	let mojsInit = new MojsInit();

	let autocompleteService: AutocompleteControlService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
				ReactiveFormsModule,
				DynamicFormQuestionAutocompleteModule
			],
			declarations: [BasicAutocomplete],
			providers: [
				OVERLAY_PROVIDERS,
				{
					provide: OverlayContainer, useFactory: () => {
						overlayContainerElement = document.createElement('div');
						overlayContainerElement.className = 'main active';
						// add fixed positioning to match real overlay container styles
						overlayContainerElement.style.position = 'fixed';
						overlayContainerElement.style.top = '0';
						overlayContainerElement.style.left = '0';
						document.body.appendChild(overlayContainerElement);

						// remove body padding to keep consistent cross-browser
						document.body.style.padding = '0';
						document.body.style.margin = '0';

						return {
							updateContainerlocation: () => null,
							getContainerElement: () => overlayContainerElement
						};
					}
				},
				{
					provide: Dir, useFactory: () => {
						return dir = { value: 'ltr' };
					}
				},
				AutocompleteControlService,
				{ provide: ViewportRuler, useClass: FakeViewportRuler }
			]
		});

		TestBed.compileComponents();


	}));


	describe('overlay panel', () => {
		let fixture: ComponentFixture<BasicAutocomplete>;
		let trigger: HTMLElement;
		let input: HTMLInputElement;
		let spy: jasmine.Spy;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicAutocomplete);
			fixture.detectChanges();
			trigger = fixture.debugElement.query(By.css('.df-autocomplete__trigger')).nativeElement;
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;

			autocompleteService = fixture.debugElement.injector.get(AutocompleteControlService);
			spy = spyOn(autocompleteService, 'get').and.returnValue(new Subject().next);
		});

		it('should open the autocomplete when input is typed', (done) => {
			fixture.componentInstance.autocomplete.queryControl.valueChanges.subscribe((next) => {
				expect(next).toBe('e');
				// Fake the Autocomplete Service Because its slow
				fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
				fixture.componentInstance.autocomplete.open();
				fixture.detectChanges();
				expect(fixture.componentInstance.autocomplete.panelOpen).toBe(true, 'Expected Panel to be open');
				expect(overlayContainerElement.textContent).toContain('Employed', 'Expected Option to contain Employed');
				done();
			})
			input.value = 'e';
			dispatchEvent('input', input);
			fixture.detectChanges();

		})

		it('should close the autocomplete when an item is selected', (done) => {
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();

			fixture.detectChanges();
			const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
			option.click();
			fixture.detectChanges();
			fixture.whenStable().then(() => {
				expect(overlayContainerElement.textContent).toEqual('');
				expect(fixture.componentInstance.autocomplete.panelOpen).toBe(false, 'Expected panel to be closed');
				done();
			});
		})

	})

	describe('selection logic', () => {
		let fixture: ComponentFixture<BasicAutocomplete>;
		let input: HTMLInputElement;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicAutocomplete);
			fixture.detectChanges();

			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
		});

		it('should have an input with no placeholder when no option is selected', () => {
			expect(input.placeholder).toBe('Select an Occupation', 'Expected Input to have a placeholder');
		})

		it('should select an option when it is clicked and update the components value and close the autocomplete', (done) => {
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();
			fixture.detectChanges();

			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement
			expect(input.value).toBe('', 'Expected Input Value to Be Blank');

			const option = overlayContainerElement.querySelector('df-option') as HTMLElement;

			dispatchEvent('click', option);
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement
				expect(fixture.componentInstance.autocomplete.value).toEqual({ id: 'Employed', text: 'Employed' }, 'Expected Autocomplete value to be {id: Employed, text: employed}');
				expect(fixture.componentInstance.autocomplete.panelOpen).toBe(false, 'Expected Panel to Be Closed');
				done();
			});
		});

		it('should update the query value from selection', () => {
			let input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.value).toBe('');

			fixture.componentInstance.control.setValue({ id: 'Employed', text: 'Employed' });
			fixture.detectChanges();
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.value).toBe('Employed', 'Expected Input Value to be Employed');
		})

		it('should highlight the option text in accordance with the input', (done) => {
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();
			input.value = 'Em';
			fixture.detectChanges();

			const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
			let optionText = option.querySelector('p').innerHTML;
			expect(optionText).toBe('<span class="highlight-item">Em</span>ployed', 'Expected Option text to be highlighted');
			done();
		});

	})

	describe('forms integration', () => {

		let fixture: ComponentFixture<BasicAutocomplete>;
		let trigger: HTMLElement;
		let input: HTMLInputElement;
		let spy: jasmine.Spy;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicAutocomplete);
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.detectChanges();
			trigger = fixture.debugElement.query(By.css('.df-autocomplete__trigger')).nativeElement;
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;

		});

		it('should set the view value from the form', () => {
			let input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.value).toBe('');

			fixture.componentInstance.control.setValue({ id: 'Employed', text: 'Employed' });
			fixture.detectChanges();
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.value).toBe('Employed', 'Expected Input value to be Employed');
		})

		it('should update the form when an option is selected', (done) => {
			expect(fixture.componentInstance.control.value).toEqual('');
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();
			fixture.detectChanges();

			const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
			option.click();
			fixture.detectChanges();

			expect(fixture.componentInstance.control.value).toEqual({ id: 'Employed', text: 'Employed' });
			done()
		})

		it('should set the autocomplete control to touched after a selection', () => {
			expect(fixture.componentInstance.control.touched).toEqual(false, `Expected the control to start off as untouched.`);

			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();
			fixture.detectChanges();

			const option = overlayContainerElement.querySelector('df-option') as HTMLElement;

			dispatchEvent('click', option);
			fixture.detectChanges();

			dispatchEvent('blur', input);
			fixture.detectChanges();

			expect(fixture.componentInstance.control.touched).toBeTruthy('Expected Control to be touched after blur')
		})

		it('should not set the autocomplete control to touched if panel is open', () => {
			expect(fixture.componentInstance.control.touched).toEqual(false, `Expected the control to start off as untouched.`);

			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();
			fixture.detectChanges();

			dispatchEvent('blur', input);
			fixture.detectChanges();

			expect(fixture.componentInstance.control.touched).toBeFalsy('Expected Control to be not be touched after blur while panel is open')
		});


		it('should set the autocomplete control to be dirty after a selection', () => {
			expect(fixture.componentInstance.control.touched).toEqual(false, `Expected the control to start off as untouched.`);

			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.autocomplete.open();
			fixture.detectChanges();

			const option = overlayContainerElement.querySelector('df-option') as HTMLElement;

			dispatchEvent('click', option);
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				expect(fixture.componentInstance.control.dirty).toBeTruthy('Expected Control to be dirty on selection change')
			})

		});

	})

	describe('accessibility', () => {

		let fixture: ComponentFixture<BasicAutocomplete>;
		let trigger: HTMLElement;
		let input: HTMLInputElement;
		let spy: jasmine.Spy;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicAutocomplete);
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }, { id: 'UnEmployed', text: 'UnEmployed' }];
			fixture.detectChanges();
			trigger = fixture.debugElement.query(By.css('.df-autocomplete__trigger')).nativeElement;
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
		});

		describe('for autocomplete', () => {
			// It should set its role to combobox
			it('should have a combobox role', () => {
				expect(input.getAttribute('role')).toBe('combobox');
			})

			// should set the aria label of the autocomplete to the label
			it('should have an aria label', () => {

				expect(input.getAttribute('aria-label')).toBe('Occupation');
				expect(input.getAttribute('aria-ariaLabelledby')).toBe('occupation');
			})

			// should set the tabindex of the select to 0'

			it('should have input sex to tabindex 0', () => {
				expect(input.getAttribute('tabindex')).toEqual('0');
			})
			// should set aria-required when field is required
			it('should set aria-required for required selects', () => {
				expect(input.getAttribute('aria-required')).toEqual('true');
				fixture.componentInstance.question.required = false;
				fixture.detectChanges();
				expect(input.getAttribute('aria-required')).toEqual('false');
			})
			// should set aria-invalid when autocomplete is invalid
			it('should set aria-invalid for autocomplete inputs that are invalid', () => {
				expect(input.getAttribute('aria-invalid')).toEqual('true');
			})
			// should set aria-disabled for disabled selects
			it('should set aria-disabled for autocompletes that are disabled', () => {
				fixture.componentInstance.control.disable();
				fixture.detectChanges();
				expect(input.getAttribute('aria-disabled')).toEqual('true');
				fixture.componentInstance.control.enable();
				fixture.detectChanges();
				expect(input.getAttribute('aria-disabled')).toEqual('false');
			})
		})

		describe('for options', () => {
			let trigger: HTMLElement;
			let options: NodeListOf<HTMLElement>;

			beforeEach(() => {
				fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' },{ id: 'UnEmployed', text: 'UnEmployed' }];
				fixture.componentInstance.autocomplete.open();
				fixture.detectChanges();
				options = overlayContainerElement.querySelectorAll('df-option') as NodeListOf<HTMLElement>;
			});

			it('should set the role of md-dropdown-options to option', () => {
				expect(options[0].getAttribute('role')).toEqual('option');
				expect(options[1].getAttribute('role')).toEqual('option');
			});

		})

	})

	describe('disabled behavior', () => {
		// It should disable itself when control is disabled programmatically

		it('should disable itself when control is disabled programmatically', () => {
			const fixture = TestBed.createComponent(BasicAutocomplete);
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.control.disable();
			fixture.detectChanges();

			let input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.disabled).toEqual(true, `The Input of autocomplete should be disabled.`);
			expect(fixture.componentInstance.autocomplete.disabled).toBeTruthy('Autocomplete should be disabled')

			fixture.componentInstance.control.enable();
			fixture.detectChanges();
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.disabled).toEqual(false, `Expect Input to be enabled.`);
		})


		// It should disable itself when control is disabled using the property

		it('should disable  itself when control is disabled using the property', () => {
			const fixture = TestBed.createComponent(BasicAutocomplete);
			fixture.componentInstance.autocomplete['autocompleteItems'] = [{ id: 'Employed', text: 'Employed' }];
			fixture.componentInstance.control.disable();
			fixture.detectChanges();

			let input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.disabled).toEqual(true, `The Input of autocomplete should be disabled.`);
			expect(fixture.componentInstance.autocomplete.disabled).toBeTruthy('Autocomplete should be disabled')

			fixture.componentInstance.control.enable();
			fixture.detectChanges();
			input = fixture.debugElement.query(By.css('.df-autocomplete__trigger input')).nativeElement;
			expect(input.disabled).toEqual(false, `Expect Input to be enabled.`);
		})


	})
});


@Component({
	selector: 'basic-autocomplete',
	template: `
		<df-autocomplete
			[placeholder]="question.placeholder"
			[type]="question.type"
			[ariaLabel]="question.label"
			[ariaLabelledby]="question.key"
			[items]="question.options"
			[required]="question.required"
			[isDisabled]="control.disabled"
			[serviceUrl]="question.serviceUrl"
			[formControl]="control">
		</df-autocomplete>`
})
class BasicAutocomplete {
	disabled: boolean = false;
	question: any = {
		controlType: 'autocomplete',
		key: 'occupation',
		label: 'Occupation',
		placeholder: 'Select an Occupation',
		serviceUrl: 'motor/occupation/',
		type: 'options',
		options: [
			{ id: 'Employed', text: 'Employed' },
			{ id: 'Household Duties', text: 'Household Duties' },
			{ id: 'Retired', text: 'Retired' },
			{ id: 'Self Employed', text: 'Self Employed' },
			{ id: 'Unemployed', text: 'Unemployed' },
			{ id: 'Very Employed', text: 'Very Employed' },
			{ id: 'Very Household Duties', text: 'Very Household Duties' },
			{ id: 'Very Retired', text: 'Very Retired' },
			{ id: 'Very Self Employed', text: 'Very Self Employed' }
		],
		required: true,
		order: 2,
		validators: []
	};
	isRequired: boolean;

	form = new FormGroup({
		occupation: new FormControl('')
	});

	control: FormControl | any;

	@ViewChild(DynamicFormQuestionAutocompleteComponent) autocomplete: DynamicFormQuestionAutocompleteComponent;
	@ViewChildren(DynamicFormQuestionOptionComponent) options: QueryList<DynamicFormQuestionOptionComponent>;

	constructor() {
		this.control = this.form.controls['occupation'];
	}
}

function dispatchEvent(eventName: string, element: HTMLElement): void {
	let event = document.createEvent('Event');
	event.initEvent(eventName, true, true);
	element.dispatchEvent(event);
}

class FakeViewportRuler {

	getContainerScrollPosition() {
		return 0;
	}
	getViewportRect() {
		return {
			left: 0, top: 0, width: 1014, height: 686, bottom: 686, right: 1014
		};
	}

	getViewportScrollPosition() {
		return { top: 0, left: 0 };
	}

	getOffsetsUntillParent() {
		return 0;
	}
}