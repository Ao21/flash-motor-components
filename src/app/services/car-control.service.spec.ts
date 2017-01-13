/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarControlService } from './car-control.service';

describe('CarControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarControlService]
    });
  });

  it('should ...', inject([CarControlService], (service: CarControlService) => {
    expect(service).toBeTruthy();
  }));
});
