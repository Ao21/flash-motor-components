/* tslint:disable:no-unused-variable */
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { DynamicFormQuestionNumberSliderItemComponent } from './dynamic-form-question-slider-item/dynamic-form-question-slider-item.component';
import { DynamicFormQuestionNumberSliderComponent } from './dynamic-form-question-number-slider.component';
import { DynamicFormQuestionNumberSliderModule } from './dynamic-form-question-number-slider.module';
import { SliderQuestion } from './../question-models/';

import { TestGestureConfig } from './../../../../testing/gesture/test-gesture-config';

describe('DynamicFormQuestionNumberSliderComponent', () => {

	let gestureConfig: TestGestureConfig;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
			],
			declarations: [
				DynamicFormQuestionNumberSliderComponent,
				DynamicFormQuestionNumberSliderItemComponent,
				BasicNumberSliderWithMinMax,
				BasicNumberSliderWithValues
			],
			providers: [
				{ provide: HAMMER_GESTURE_CONFIG, useFactory: () => gestureConfig = new TestGestureConfig() }
			]
		})
			.compileComponents();
	}));



	describe('the slider component', () => {


		describe('with a set value', () => {

			let component: BasicNumberSliderWithMinMax;
			let fixture: ComponentFixture<BasicNumberSliderWithMinMax>;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicNumberSliderWithMinMax);
				component = fixture.componentInstance;
				fixture.componentInstance.control.setValue(2);
				fixture.detectChanges();
			});

			it('should start with a default value of 2 if value is set', (done) => {
				fixture.detectChanges();
				fixture.componentInstance.slider['_renderer'].sliderMovementUpdate.subscribe(() => {
					fixture.detectChanges();
					let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					expect(items[2].innerHTML).toContain('active');
					done();
				});
			})

		})

		describe('with no set value', () => {

			let component: BasicNumberSliderWithMinMax;
			let fixture: ComponentFixture<BasicNumberSliderWithMinMax>;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicNumberSliderWithMinMax);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});

			it('should start with a default value of 0 if no value is set', (done) => {
				fixture.detectChanges();
				fixture.componentInstance.slider['_renderer'].sliderMovementUpdate.subscribe(() => {
					fixture.detectChanges();
					let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					expect(items[0].innerHTML).toContain('active');
					done();
				});
			})
		})

		describe('with min max', () => {

			let component: BasicNumberSliderWithMinMax;
			let fixture: ComponentFixture<BasicNumberSliderWithMinMax>;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicNumberSliderWithMinMax);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});

			it('should generate a component', () => {
				expect(component).toBeTruthy();
			})

			it('should have five slider items generated', () => {
				let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
				expect(items.length).toBe(5);
			})

		})


		describe('with min max with steps', () => {
			let component: BasicNumberSliderWithMinMax;
			let fixture: ComponentFixture<BasicNumberSliderWithMinMax>;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicNumberSliderWithMinMax);
				component = fixture.componentInstance;
				component.question.steps = 100;
				fixture.detectChanges();
			});

			it('should work with steps set', (done) => {
				fixture.detectChanges();
				fixture.componentInstance.slider['_renderer'].sliderMovementUpdate.subscribe(() => {
					fixture.detectChanges();
					let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					expect(items[1].querySelector('span').innerHTML).toBe('100');
					done();
				});
			})
		})

		describe('with values', () => {

			let component: BasicNumberSliderWithValues;
			let fixture: ComponentFixture<BasicNumberSliderWithValues>;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicNumberSliderWithValues);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});

			it('should generate a component', () => {
				expect(component).toBeTruthy();
			})

			it('should have four slider items generated', () => {
				let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
				expect(items.length).toBe(4);
			})

		})

	})

	describe('selection logic', () => {
		let component: BasicNumberSliderWithValues;
		let fixture: ComponentFixture<BasicNumberSliderWithValues>;
		let next: HTMLElement;
		let prev: HTMLElement

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicNumberSliderWithValues);
			component = fixture.componentInstance;
			fixture.detectChanges();
			next = fixture.nativeElement.querySelector('.df-slider__control--next');
			prev = fixture.nativeElement.querySelector('.df-slider__control--prev');
		});

		describe('keyboard', () => {
			// TODO: Create Keyboard Event Checks
		})

		describe('mouse', () => {


			it('should be able to go to the next item', (done) => {
				fixture.whenStable().then(() => {
					let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					next.click();
					fixture.detectChanges();
					items = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					expect(items[0].innerHTML).not.toContain('active', 'First Item should no longer be active');
					expect(items[1].innerHTML).toContain('active', 'Second Item should be active');
					done();
				})
			})

			it('should be able to go to the previous item', (done) => {
				fixture.whenStable().then(() => {
					let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					prev.click();
					fixture.detectChanges();
					items = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					expect(items[0].innerHTML).toContain('active', 'First Item should now be active');
					expect(items[1].innerHTML).not.toContain('active', 'Second Item should not be active');
					done();
				})
			})
		});
		describe('with dragging', () => {
			it('should be able to drag', (done) => {
				fixture.detectChanges();
				fixture.whenStable().then(() => {

					let slider = fixture.debugElement.query(By.css('.df-slider__items')).nativeElement;
					gestureConfig.emitEventForElement('slidestart', slider, {
						deltaX: -120,
					});
					gestureConfig.emitEventForElement('slide', slider, {
						deltaX: -120,
						direction: 2,
						distance: 120,
						eventType: 4,
						offsetDirection: 2
					});
					gestureConfig.emitEventForElement('slideend', slider);
					// Fake Set Position because animation is run outside of angular
					fixture.componentInstance.slider['_renderer']['_setPosition'](-120);
					fixture.detectChanges();
					let items = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
					expect(items[3].innerHTML).toContain('active', 'First Item should now be active');
					done();
				})
			})
		});
	})
	describe('forms integration', () => {

		let component: BasicNumberSliderWithValues;
		let fixture: ComponentFixture<BasicNumberSliderWithValues>;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicNumberSliderWithValues);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});


		it('should update the form value on drag update', () => {
			fixture.detectChanges();
			fixture.whenStable().then(() => {
				let slider = fixture.debugElement.query(By.css('.df-slider__items')).nativeElement;
				gestureConfig.emitEventForElement('slidestart', slider, {
					deltaX: -120,
				});
				gestureConfig.emitEventForElement('slide', slider, {
					deltaX: -120,
					direction: 2,
					distance: 120,
					eventType: 4,
					offsetDirection: 2
				});
				gestureConfig.emitEventForElement('slideend', slider);
				// Fake Set Position because animation is run outside of angular
				fixture.componentInstance.slider['_renderer']['_setPosition'](-120);
				fixture.detectChanges();
				expect(fixture.componentInstance.control.value).toBe(3);
			});
		})

		it('should update the form on view update', (done) => {
			fixture.whenStable().then(() => {
				let items: NodeListOf<HTMLElement> = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
				let next: HTMLElement = fixture.nativeElement.querySelector('.df-slider__control--next');
				next.click();
				fixture.detectChanges();
				items = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
				expect(items[0].innerHTML).not.toContain('active', 'First Item should no longer be active');
				expect(items[1].innerHTML).toContain('active', 'Second Item should be active');
				done();
			})
		})

	})
	describe('accessibility', () => {
		describe('of the component', () => {

			let component: BasicNumberSliderWithMinMax;
			let fixture: ComponentFixture<BasicNumberSliderWithMinMax>;
			let el: HTMLElement;

			beforeEach(() => {
				fixture = TestBed.createComponent(BasicNumberSliderWithMinMax);
				component = fixture.componentInstance;
				fixture.detectChanges();
				el =  fixture.nativeElement.querySelector('df-slider');
			});


			it('should have a role', () => {
				expect(el.getAttribute('role')).toBe('spinbutton');
			});
			it('should have an aria-valuemax', () => {
				expect(el.getAttribute('aria-valuemax')).toBe('4');
			});
			it('should have an aria-valuemin', () => {
				expect(el.getAttribute('aria-valuemin')).toBe('0');
			});
			it('should have an aria-valuenow', () => { 
				expect(el.getAttribute('aria-valuemin')).toBe('0');
			});
			it('should have an aria-disabled', () => { 
				expect(el.getAttribute('aria-disabled')).toBe('false');
				component.control.disable();
				fixture.detectChanges();
				expect(el.getAttribute('aria-disabled')).toBe('true');
			});
			it('should have a tabindex', () => {
				expect(el.getAttribute('tabindex')).toBe('0');
			});
		})
	})

	describe('disabled behaivour', () => {

		let component: BasicNumberSliderWithValues;
		let fixture: ComponentFixture<BasicNumberSliderWithValues>;

		beforeEach(() => {
			fixture = TestBed.createComponent(BasicNumberSliderWithValues);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should be disabled when control is disabled programmatically', () => {
			fixture.whenStable().then(() => {
				fixture.componentInstance.control.disable();
				fixture.detectChanges();
				let next: HTMLButtonElement = fixture.nativeElement.querySelector('.df-slider__control--next');
				let prev: HTMLButtonElement = fixture.nativeElement.querySelector('.df-slider__control--prev');
				fixture.detectChanges();
				let items = fixture.debugElement.nativeElement.querySelectorAll('df-slider-item');
				expect(next.disabled).toBeTruthy('Next button should be disabled');
				expect(prev.disabled).toBeTruthy('Previous Button shoudl be disabled');
				expect(items[0].innerHTML).toContain('active', 'First Item should be active');
				expect(items[1].innerHTML.not).toContain('active', 'Second Item not should be active');
			});
		})

		it('should set the tabindexes to -1 when control is disabled programmatically', () => {
			fixture.whenStable().then(() => {
				fixture.componentInstance.control.disable();
				fixture.detectChanges();
				let next: HTMLElement = fixture.nativeElement.querySelector('.df-slider__control--next');
				let prev: HTMLElement = fixture.nativeElement.querySelector('.df-slider__control--prev');
				let el: HTMLElement = fixture.nativeElement.querySelector('df-slider');
				expect(next.tabIndex).toBe('-1', 'Next button should have a tab index of -1');
				expect(prev.tabIndex).toBe('-1', 'Prev button should have a tabindex of -1');
				expect(el.tabIndex).toBe('-1', 'Comppnent should have a tabindex of -1');


			});
		})


	})

});

@Component({
	selector: 'basic-number-slider',
	template: `
   <df-slider
      class="df-question"
      [formControl]="control"
      [attr.aria-label]="question.label"
      [attr.aria-labelledby]="question.key"
      [min]="question.min"
      [max]="question.max"
      [steps]="question.steps"
      [values]="question.values">
    </df-slider>
  `
})
class BasicNumberSliderWithMinMax {
	question: SliderQuestion = new SliderQuestion({
		key: 'amountOfDrivers',
		label: 'How many drivers?',
		value: 0,
		min: 0,
		max: 4,
	})
	control = new FormControl();

	@ViewChild(DynamicFormQuestionNumberSliderComponent) slider: DynamicFormQuestionNumberSliderComponent;
	@ViewChildren(DynamicFormQuestionNumberSliderItemComponent) options: QueryList<DynamicFormQuestionNumberSliderItemComponent>;
}

@Component({
	selector: 'basic-number-slider',
	template: `
   <df-slider
      class="df-question"
      [formControl]="control"
      [attr.aria-label]="question.label"
      [attr.aria-labelledby]="question.key"
      [min]="question.min"
      [max]="question.max"
      [steps]="question.steps"
      [values]="question.values">
    </df-slider>
  `
})
class BasicNumberSliderWithValues {
	question: SliderQuestion = new SliderQuestion({
		key: 'amountOfDrivers',
		label: 'How many drivers?',
		values: [0, 1, 2, 3],
		value: 0,
	})
	control = new FormControl();

	@ViewChild(DynamicFormQuestionNumberSliderComponent) slider: DynamicFormQuestionNumberSliderComponent;
	@ViewChildren(DynamicFormQuestionNumberSliderItemComponent) options: QueryList<DynamicFormQuestionNumberSliderItemComponent>;
}



