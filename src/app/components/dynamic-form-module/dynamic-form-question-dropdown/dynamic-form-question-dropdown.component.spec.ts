/* tslint:disable:no-unused-variable */
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MojsInit } from './../../mojs/mojs-init';

import { OverlayContainer } from './../../../core/overlay/overlay-container';
import { DebugElement } from '@angular/core';
import { DynamicFormDropdownModule } from './dynamic-form-question-dropdown.module';
import { DynamicFormOptionModule } from './../dynamic-form-question-option/dynamic-form-question-option.module';
import { Dir } from './../../../core/rtl/dir';

import { DynamicFormQuestionOptionComponent } from './../dynamic-form-question-option/dynamic-form-question-option.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DropdownQuestion } from './../question-models/';


import { TestScheduler, Subject } from 'rxjs/Rx';

import { MdCoreModule, OVERLAY_PROVIDERS } from './../../../core/core';
import { ViewportRuler } from './../../../core/overlay/position/viewport-ruler';
import { DynamicFormQuestionDropdownComponent } from './dynamic-form-question-dropdown.component';

describe('DynamicFormQuestionDropdownComponent', () => {
  let overlayContainerElement: HTMLElement;
  let dir: { value: string };
  let mojsInit = new MojsInit();

  let component: DynamicFormQuestionDropdownComponent;
  let fixture: ComponentFixture<DynamicFormQuestionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ReactiveFormsModule,
        DynamicFormDropdownModule,
        DynamicFormOptionModule
      ],
      declarations: [BasicDropdown],
      providers: [
        OVERLAY_PROVIDERS,
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            // add fixed positioning to match real overlay container styles
            overlayContainerElement.style.position = 'fixed';
            overlayContainerElement.style.top = '0';
            overlayContainerElement.style.left = '0';
            document.body.appendChild(overlayContainerElement);

            // remove body padding to keep consistent cross-browser
            document.body.style.padding = '0';
            document.body.style.margin = '0';
            return { getContainerElement: () => overlayContainerElement };
          }
        },
        {
          provide: Dir, useFactory: () => {
            return dir = { value: 'ltr' };
          }
        },
        { provide: ViewportRuler, useClass: FakeViewportRuler }
      ]
    });

    TestBed.compileComponents();

  }));

  afterEach(() => {
    document.body.removeChild(overlayContainerElement);
  });

  describe('overlay panel', () => {
    let fixture: ComponentFixture<BasicDropdown>;
    let trigger: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicDropdown);
      fixture.detectChanges();

      trigger = fixture.debugElement.query(By.css('.df-dropdown__trigger')).nativeElement;
    });

    it('should open the panel when trigger is clicked', () => {
      trigger.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.dropdown.panelOpen).toBe(true);
      expect(overlayContainerElement.textContent).toContain('Employed');
      expect(overlayContainerElement.textContent).toContain('Household Duties');
      expect(overlayContainerElement.textContent).toContain('Retired');
    });

    it('should close the panel when an item is clicked', async(() => {
      trigger.click();
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(overlayContainerElement.textContent).toEqual('');
        expect(fixture.componentInstance.dropdown.panelOpen).toBe(false);
      });
    }));



  });

  describe('selection logic', () => {

    let fixture: ComponentFixture<BasicDropdown>;
    let trigger: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicDropdown);
      fixture.detectChanges();

      trigger = fixture.debugElement.query(By.css('.df-dropdown__trigger')).nativeElement;
    });

    it('should display placeholder if no option is selected', () => {
      expect(trigger.textContent.trim()).toEqual('Type of Employment');
    });

    it('should focus the first option if no option is selected', async(() => {
      trigger.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.dropdown._keyManager.focusedItemIndex).toEqual(0);
      });
    }));

    it('should select an option when it is clicked', () => {
      trigger.click();
      fixture.detectChanges();

      let option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      trigger.click();
      fixture.detectChanges();

      option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      expect(option.classList).toContain('selected');
      expect(fixture.componentInstance.options.first.selected).toBe(true);
      expect(fixture.componentInstance.dropdown.selected)
        .toBe(fixture.componentInstance.options.first);
    });

    it('should deselect other options when one is selected', () => {
      trigger.click();
      fixture.detectChanges();

      let options =
        overlayContainerElement.querySelectorAll('df-option') as NodeListOf<HTMLElement>;

      options[0].click();
      fixture.detectChanges();

      trigger.click();
      fixture.detectChanges();

      options =
        overlayContainerElement.querySelectorAll('df-option') as NodeListOf<HTMLElement>;
      expect(options[1].classList).not.toContain('selected');
      expect(options[2].classList).not.toContain('selected');

      const optionInstances = fixture.componentInstance.options.toArray();
      expect(optionInstances[1].selected).toBe(false);
      expect(optionInstances[2].selected).toBe(false);
    });

    it('should hide the placeholder on selection', () => {

      let placeholder =
        fixture.debugElement.query(By.css('.df-dropdown__placeholder')).nativeElement;
      expect(placeholder.textContent).toContain('Type of Employment');

      trigger.click();
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      placeholder =
        fixture.debugElement.query(By.css('.df-dropdown__placeholder'));
      expect(placeholder).toBeNull();


    })
    it('should display the selected option in the trigger', () => {
      trigger.click();
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      const value = fixture.debugElement.query(By.css('.df-dropdown__value')).nativeElement;

      expect(value.textContent).toContain('Employed');
      expect(trigger.textContent).toContain('Employed');
    });

    it('should focus the selected option if an option is selected', async(() => {
      trigger.click();
      fixture.detectChanges();

      const options =
        overlayContainerElement.querySelectorAll('df-option') as NodeListOf<HTMLElement>;
      options[1].click();
      fixture.detectChanges();

      trigger.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.dropdown._keyManager.focusedItemIndex).toEqual(1);
      });
    }));

    it('should select an option that was added after initialization', () => {
      fixture.componentInstance.question.options.push('Pasta');
      trigger.click();
      fixture.detectChanges();

      const options =
        overlayContainerElement.querySelectorAll('df-option') as NodeListOf<HTMLElement>;
      options[5].click();
      fixture.detectChanges();

      expect(trigger.textContent).toContain('Pasta');
      expect(fixture.componentInstance.dropdown.selected)
        .toBe(fixture.componentInstance.options.last);
    });
  })

  describe('forms integration', () => {
    let fixture: ComponentFixture<BasicDropdown>;
    let trigger: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicDropdown);
      fixture.detectChanges();

      trigger = fixture.debugElement.query(By.css('.df-dropdown__trigger')).nativeElement;
    });

    it('should set the view value from the form', () => {
      let value = fixture.debugElement.query(By.css('.df-dropdown__value'));
      expect(value).toBeNull('Expected trigger to start with empty value.');

      fixture.componentInstance.control.setValue('Employed');
      fixture.detectChanges();
      value = fixture.debugElement.query(By.css('.df-dropdown__value'));
      expect(value.nativeElement.textContent)
        .toContain('Employed', `Expected trigger to be populated by the control's new value.`);

      trigger.click();
      fixture.detectChanges();

      const options =
        overlayContainerElement.querySelectorAll('df-option') as NodeListOf<HTMLElement>;
      expect(options[0].classList)
        .toContain('selected', `Expected option with the control's new value to be selected.`);
    });

    it('should update the form value when the view changes', () => {
      expect(fixture.componentInstance.control.value)
        .toEqual(null, `Expected the control's value to be null initially.`);

      trigger.click();
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.control.value)
        .toEqual('Employed', `Expected control's value to be set to the new option.`);
    });

    it('should set the control to touched when the select is touched', () => {
      expect(fixture.componentInstance.control.touched)
        .toEqual(false, `Expected the control to start off as untouched.`);

      trigger.click();
      dispatchEvent('blur', trigger);
      fixture.detectChanges();
      expect(fixture.componentInstance.control.touched)
        .toEqual(false, `Expected the control to stay untouched when menu opened.`);

      const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      dispatchEvent('blur', trigger);
      fixture.detectChanges();
      expect(fixture.componentInstance.control.touched)
        .toEqual(true, `Expected the control to be touched as soon as focus left the select.`);
    });

    it('should set the control to dirty when the select\'s value changes in the DOM', () => {
      expect(fixture.componentInstance.control.dirty)
        .toEqual(false, `Expected control to start out pristine.`);

      trigger.click();
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('df-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.control.dirty)
        .toEqual(true, `Expected control to be dirty after value was changed by user.`);
    });

    it('should not set the control to dirty when the value changes programmatically', () => {
      expect(fixture.componentInstance.control.dirty)
        .toEqual(false, `Expected control to start out pristine.`);

      fixture.componentInstance.control.setValue('Employed');

      expect(fixture.componentInstance.control.dirty)
        .toEqual(false, `Expected control to stay pristine after programmatic change.`);
    });


  });

  describe('disabled behavior', () => {
    it('should disable itself when control is disabled programmatically', () => {
      const fixture = TestBed.createComponent(BasicDropdown);
      fixture.detectChanges();

      expect(overlayContainerElement.textContent)
        .toEqual('', `Expected dropdown to be closed at start.`);

      fixture.componentInstance.control.disable();
      fixture.detectChanges();

      expect(fixture.componentInstance.dropdown.disabled).toBeTruthy('Autocomplete should be disabled')

      let trigger =
        fixture.debugElement.query(By.css('.df-dropdown__trigger')).nativeElement;

      trigger.click();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent)
        .toEqual('', `Expected dropdown panel to stay closed.`);
      expect(fixture.componentInstance.dropdown.panelOpen)
        .toBe(false, `Expected dropdown panelOpen property to stay false.`);

      fixture.componentInstance.control.enable();
      fixture.detectChanges();

      trigger.click();
      fixture.detectChanges();

      expect(overlayContainerElement.textContent)
        .toContain('Employed', `Expected dropdown panel to open normally on re-enabled control`);
      expect(fixture.componentInstance.dropdown.panelOpen)
        .toBe(true, `Expected dropdown panelOpen property to become true.`);
    });
  });

  describe('accessibility', () => {
    let fixture: ComponentFixture<BasicDropdown>;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicDropdown);
      fixture.detectChanges();
    });

    describe('for dropdown', () => {
      let dropdown: HTMLElement;

      beforeEach(() => {
        dropdown = fixture.debugElement.query(By.css('df-dropdown')).nativeElement;
      });

      it('should set the role of the dropdown to listbox', () => {
        expect(dropdown.getAttribute('role')).toEqual('listbox');
      });

      it('should set the aria label of the dropdown to the placeholder', () => {
        expect(dropdown.getAttribute('aria-label')).toEqual('Type of Employment');
      });

      it('should set the tabindex of the dropdown to 0', () => {
        expect(dropdown.getAttribute('tabindex')).toEqual('0');
      });

      it('should set aria-required for required dropdowns', () => {
        expect(dropdown.getAttribute('aria-required'))
          .toEqual('false', `Expected aria-required attr to be false for normal dropdowns.`);

        fixture.componentInstance.question.required = true;
        fixture.detectChanges();

        expect(dropdown.getAttribute('aria-required'))
          .toEqual('true', `Expected aria-required attr to be true for required dropdowns.`);
      });

      it('should set aria-invalid for dropdowns that are invalid', () => {
        expect(dropdown.getAttribute('aria-invalid'))
          .toEqual('false', `Expected aria-invalid attr to be false for valid dropdowns.`);

        fixture.componentInstance.question.required = true;
        fixture.detectChanges();

        expect(dropdown.getAttribute('aria-invalid'))
          .toEqual('true', `Expected aria-invalid attr to be true for invalid dropdowns.`);
      });

      it('should set aria-disabled for disabled dropdowns', () => {
        expect(dropdown.getAttribute('aria-disabled')).toEqual('false');

        fixture.componentInstance.control.disable();
        fixture.detectChanges();

        expect(dropdown.getAttribute('aria-disabled')).toEqual('true');
      });

      it('should set the tabindex of the dropdown to -1 if disabled', () => {
        fixture.componentInstance.control.disable();
        fixture.detectChanges();
        expect(dropdown.getAttribute('tabindex')).toEqual('-1');

        fixture.componentInstance.control.enable();
        fixture.detectChanges();
        expect(dropdown.getAttribute('tabindex')).toEqual('0');
      });

    })
  })
});


@Component({
  selector: 'basic-dropdown',
  template: `
    <df-dropdown
      [placeholder]="question.placeholder"
      [formControl]="control"
      [isDisabled]="control.disabled"
      [required]="question.required"
      [attr.aria-label]="question.label"
      [attr.aria-labelledby]="question.key"
      class="df-question">
        <df-option 
          *ngFor="let option of question.options"
          [value]="option">
          {{option}}
        </df-option>
    </df-dropdown>
  `
})
class BasicDropdown {
  question: DropdownQuestion = new DropdownQuestion({
    key: 'typeOfEmployment',
    placeholder: 'Type of Employment',
    label: 'Type of Employment',
    options: ['Employed', 'Household Duties', 'Retired', 'Self Employed', 'Unemployed'],
    required: false,
    order: 2,
    validators: []
  })
  control = new FormControl();
  isRequired: boolean;

  @ViewChild(DynamicFormQuestionDropdownComponent) dropdown: DynamicFormQuestionDropdownComponent;
  @ViewChildren(DynamicFormQuestionOptionComponent) options: QueryList<DynamicFormQuestionOptionComponent>;
}

function dispatchEvent(eventName: string, element: HTMLElement): void {
  let event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  element.dispatchEvent(event);
}


class FakeViewportRuler {
  getViewportRect() {
    return {
      left: 0, top: 0, width: 1014, height: 686, bottom: 686, right: 1014
    };
  }

  getViewportScrollPosition() {
    return { top: 0, left: 0 };
  }
}