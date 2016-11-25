/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SectionManagerComponent } from './section-manager.component';
import { DEFAULT_TEST_SECTION } from './../../../testing/constants/testing-consts-section';

describe('SectionManagerComponent', () => {
  let component: SectionManagerComponent;
  let fixture: ComponentFixture<SectionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionManagerComponent);
    component = fixture.componentInstance;
    component.sections = DEFAULT_TEST_SECTION;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
