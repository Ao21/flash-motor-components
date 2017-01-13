/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddressControlService } from './address-control.service';

describe('AddressControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressControlService]
    });
  });

  it('should ...', inject([AddressControlService], (service: AddressControlService) => {
    expect(service).toBeTruthy();
  }));
});
