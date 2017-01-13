/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SectionConfirmationButtonComponent } from './section-confirmation-button.component';

describe('SectionConfirmationButtonComponent', () => {
  let component: SectionConfirmationButtonComponent;
  let fixture: ComponentFixture<SectionConfirmationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionConfirmationButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionConfirmationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
