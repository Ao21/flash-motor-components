/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';


import { DynamicFormQuestionRadioModule } from './dynamic-form-question-radio.module';
import { DynamicFormQuestionRadioComponent } from './dynamic-form-question-radio/dynamic-form-question-radio.component';
import { DynamicFormQuestionRadioGroupDirective, DFRadioChange } from './dynamic-form-question-radio-group/dynamic-form-question-radio-group.component';
import { RadioQuestion } from './../question-models/';


describe('DynamicFormQuestionRadioComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DynamicFormQuestionRadioModule,
      ],
      declarations: [
        RadioInAGroup,
        StandaloneRadio
      ]
    })
      .compileComponents();
  }));



  describe('inside a group', () => {

    let component: RadioInAGroup;
    let fixture: ComponentFixture<RadioInAGroup>;
    let groupDebugElement: DebugElement;
    let groupNativeElement: HTMLElement;
    let radioDebugElements: DebugElement[];
    let radioLabelElements: HTMLLabelElement[];
    let radioNativeElements: HTMLElement[];
    let groupInstance: DynamicFormQuestionRadioGroupDirective;
    let radioInstances: DynamicFormQuestionRadioComponent[];

    beforeEach(() => {
      fixture = TestBed.createComponent(RadioInAGroup);
      fixture.detectChanges();

      component = fixture.componentInstance;
      groupDebugElement = fixture.debugElement.query(By.directive(DynamicFormQuestionRadioGroupDirective));
      groupNativeElement = groupDebugElement.nativeElement;
      groupInstance = groupDebugElement.injector.get(DynamicFormQuestionRadioGroupDirective);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(DynamicFormQuestionRadioComponent));
      radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

      radioLabelElements = radioDebugElements
        .map(debugEl => debugEl.query(By.css('label')).nativeElement);

    });


    it('should have an aria-role set on the group', () => {
      expect(groupNativeElement.getAttribute('role')).toBe('radiogroup');
    })

    it('should set individual radio names based on the group name', () => {
      expect(groupInstance.name).toBeTruthy();
      for (let radio of radioInstances) {
        expect(radio.name).toBe(groupInstance.name);
      }
    });

    it('should disable click interaction when the group is disabled', () => {
      component.control.disable();
      fixture.detectChanges();

      radioLabelElements[0].click();
      expect(radioInstances[0].checked).toBe(false);
    });

    it('should disable each individual radio when the group is disabled', () => {
      component.control.disable();
      fixture.detectChanges();

      for (let radio of radioInstances) {
        expect(radio.disabled).toBe(true);
      }
    });

    it('should update the group value when one of the radios changes', () => {
      expect(groupInstance.value).toBeFalsy();

      radioInstances[0].checked = true;
      fixture.detectChanges();

      expect(groupInstance.value).toBe('Yes');
      expect(groupInstance.selected).toBe(radioInstances[0]);
    });

    it('should update the group and radios when one of the radios is clicked', () => {
      expect(groupInstance.value).toBeFalsy();

      radioLabelElements[0].click();
      fixture.detectChanges();

      expect(groupInstance.value).toBe('Yes');
      expect(groupInstance.selected).toBe(radioInstances[0]);
      expect(radioInstances[0].checked).toBe(true);
      expect(radioInstances[1].checked).toBe(false);

      radioLabelElements[1].click();
      fixture.detectChanges();

      expect(groupInstance.value).toBe('No');
      expect(groupInstance.selected).toBe(radioInstances[1]);
      expect(radioInstances[0].checked).toBe(false);
      expect(radioInstances[1].checked).toBe(true);
    });

    it('should check a radio upon interaction with the underlying native radio button', () => {
      let nativeRadioInput = <HTMLElement>radioNativeElements[0].querySelector('input');

      nativeRadioInput.click();
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBe(true);
      expect(groupInstance.value).toBe('Yes');
      expect(groupInstance.selected).toBe(radioInstances[0]);
    });

    it('should emit a change event from radio buttons', () => {
      expect(radioInstances[0].checked).toBe(false);

      let spies = radioInstances
        .map((value, index) => jasmine.createSpy(`onChangeSpy ${index}`));

      spies.forEach((spy, index) => radioInstances[index].change.subscribe(spy));

      radioLabelElements[0].click();
      fixture.detectChanges();

      expect(spies[0]).toHaveBeenCalled();

      radioLabelElements[1].click();
      fixture.detectChanges();

      // To match the native radio button behavior, the change event shouldn't
      // be triggered when the radio got unselected.
      expect(spies[0]).toHaveBeenCalledTimes(1);
      expect(spies[1]).toHaveBeenCalledTimes(1);
    });

    it(`should not emit a change event from the radio group when change group value 
        programmatically`, () => {
        expect(groupInstance.value).toBeFalsy();

        let changeSpy = jasmine.createSpy('radio-group change listener');
        groupInstance.change.subscribe(changeSpy);

        radioLabelElements[0].click();
        fixture.detectChanges();

        expect(changeSpy).toHaveBeenCalledTimes(1);

        groupInstance.value = 'No';
        fixture.detectChanges();

        expect(changeSpy).toHaveBeenCalledTimes(1);
      });

    it('should update the group and radios when updating the group value', () => {
      expect(groupInstance.value).toBeFalsy();

      component.control.setValue('Yes');
      fixture.detectChanges();

      expect(groupInstance.value).toBe('Yes');
      expect(groupInstance.selected).toBe(radioInstances[0]);
      expect(radioInstances[0].checked).toBe(true);
      expect(radioInstances[1].checked).toBe(false);

      component.control.setValue('No');
      fixture.detectChanges();

      expect(groupInstance.value).toBe('No');
      expect(groupInstance.selected).toBe(radioInstances[1]);
      expect(radioInstances[0].checked).toBe(false);
      expect(radioInstances[1].checked).toBe(true);
    });


    it('should deselect all of the checkboxes when the group value is cleared', () => {
      radioInstances[0].checked = true;

      expect(groupInstance.value).toBeTruthy();

      groupInstance.value = null;

      expect(radioInstances.every(radio => !radio.checked)).toBe(true);
    });

    it(`should update the group's selected radio to null when unchecking that radio 
        programmatically`, () => {
        let changeSpy = jasmine.createSpy('radio-group change listener');
        groupInstance.change.subscribe(changeSpy);
        radioInstances[0].checked = true;

        fixture.detectChanges();

        expect(changeSpy).not.toHaveBeenCalled();
        expect(groupInstance.value).toBeTruthy();

        radioInstances[0].checked = false;

        fixture.detectChanges();

        expect(changeSpy).not.toHaveBeenCalled();
        expect(groupInstance.value).toBeFalsy();
        expect(radioInstances.every(radio => !radio.checked)).toBe(true);
        expect(groupInstance.selected).toBeNull();
      });

    it('should not fire a change event from the group when a radio checked state changes', () => {
      let changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      radioInstances[0].checked = true;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeTruthy();
      expect(groupInstance.value).toBe('Yes');

      radioInstances[1].checked = true;

      fixture.detectChanges();

      expect(groupInstance.value).toBe('No');
      expect(changeSpy).not.toHaveBeenCalled();
    });

    // it(`should update checked status if changed value to radio group's value`, () => {
    //   let changeSpy = jasmine.createSpy('radio-group change listener');
    //   groupInstance.change.subscribe(changeSpy);
    //   groupInstance.value = 'apple';

    //   expect(changeSpy).not.toHaveBeenCalled();
    //   expect(groupInstance.value).toBe('apple');
    //   expect(groupInstance.selected).toBeFalsy('expect group selected to be null');
    //   expect(radioInstances[0].checked).toBeFalsy('should not select the first button');
    //   expect(radioInstances[1].checked).toBeFalsy('should not select the second button');

    //   radioInstances[0].value = 'apple';

    //   fixture.detectChanges();

    //   expect(groupInstance.selected).toBe(radioInstances[0], 'expect group selected to be first button');
    //   expect(radioInstances[0].checked).toBeTruthy('expect group select the first button');
    //   expect(radioInstances[1].checked).toBeFalsy('should not select the second button');
    // });



  });

  describe('as standalone', () => {
    let fixture: ComponentFixture<StandaloneRadio>;
    let radioDebugElements: DebugElement[];
    let seasonRadioInstances: DynamicFormQuestionRadioComponent[];
    let weatherRadioInstances: DynamicFormQuestionRadioComponent[];
    let fruitRadioInstances: DynamicFormQuestionRadioComponent[];
    let fruitRadioNativeInputs: HTMLElement[];
    let testComponent: StandaloneRadio;

    beforeEach(() => {
      fixture = TestBed.createComponent(StandaloneRadio);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      radioDebugElements = fixture.debugElement.queryAll(By.directive(DynamicFormQuestionRadioComponent));
      seasonRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'season')
        .map(debugEl => debugEl.componentInstance);
      weatherRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'weather')
        .map(debugEl => debugEl.componentInstance);
      fruitRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'fruit')
        .map(debugEl => debugEl.componentInstance);

      let fruitRadioNativeElements = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name == 'fruit')
        .map(debugEl => debugEl.nativeElement);

      fruitRadioNativeInputs = [];
      for (let element of fruitRadioNativeElements) {
        fruitRadioNativeInputs.push(<HTMLElement>element.querySelector('input'));
      }
    });

    it('should uniquely select radios by a name', () => {
      seasonRadioInstances[0].checked = true;
      weatherRadioInstances[1].checked = true;

      fixture.detectChanges();
      expect(seasonRadioInstances[0].checked).toBe(true);
      expect(seasonRadioInstances[1].checked).toBe(false);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(true);
      expect(weatherRadioInstances[2].checked).toBe(false);

      seasonRadioInstances[1].checked = true;
      fixture.detectChanges();
      expect(seasonRadioInstances[0].checked).toBe(false);
      expect(seasonRadioInstances[1].checked).toBe(true);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(true);
      expect(weatherRadioInstances[2].checked).toBe(false);

      weatherRadioInstances[2].checked = true;
      expect(seasonRadioInstances[0].checked).toBe(false);
      expect(seasonRadioInstances[1].checked).toBe(true);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(false);
      expect(weatherRadioInstances[2].checked).toBe(true);
    });

    it('should add aria-label attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');
    });

    it('should not add aria-label attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-label')).toBeFalsy();
    });

    it('should change aria-label attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');

      fruitRadioInstances[0].ariaLabel = 'Pineapple';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Pineapple');
    });

    it('should add aria-labelledby attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');
    });

    it('should not add aria-labelledby attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-labelledby')).toBeFalsy();
    });

    it('should change aria-labelledby attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');

      fruitRadioInstances[0].ariaLabelledby = 'uvw';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('uvw');
    });
  });



});


@Component({
  selector: 'basic-radio',
  template: `
		<df-radio-group
      [formControl]="control"
      [isDisabled]="control.disabled"
      [attr.aria-label]="question.label"
      [attr.aria-labelledby]="question.key"
      class="o-flex o-flex--distribute df-question">
      <df-radio
        *ngFor="let option of question.options" [value]="option">
          {{option}}
      </df-radio>
    </df-radio-group>
  `
})
class RadioInAGroup {
  disabled: boolean = false;
  question: RadioQuestion = new RadioQuestion({
    key: 'livedOutsideIreland',
    label: 'Have you lived outside the Republic of Ireland or the UK in the last 12 months?',
    type: 'radio',
    options: ['Yes', 'No'],
    required: true,
    order: 2,
    validators: []
  })


  control: FormControl = new FormControl();

  @ViewChild(DynamicFormQuestionRadioGroupDirective) radioGroup: DynamicFormQuestionRadioGroupDirective;
  @ViewChildren(DynamicFormQuestionRadioComponent) radios: DynamicFormQuestionRadioComponent;

}


@Component({
  selector: 'standalone-radio',
  template: `
		<df-radio name="season" value="spring">Spring</df-radio>
    <df-radio name="season" value="summer">Summer</df-radio>
    <df-radio name="season" value="autum">Autumn</df-radio>
    
    <df-radio name="weather" value="warm">Spring</df-radio>
    <df-radio name="weather" value="hot">Summer</df-radio>
    <df-radio name="weather" value="cool">Autumn</df-radio>
    
    <span id="xyz">Baby Banana</span>
    <df-radio name="fruit" value="banana" aria-label="Banana" aria-labelledby="xyz">
    </df-radio>
    <df-radio name="fruit" value="raspberry">Raspberry</df-radio>
  `
})
class StandaloneRadio {}

function dispatchEvent(eventName: string, element: HTMLElement | Element): void {
  let event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  element.dispatchEvent(event);
}