/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentControlService } from './payment-control.service';

describe('PaymentControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentControlService]
    });
  });

  it('should ...', inject([PaymentControlService], (service: PaymentControlService) => {
    expect(service).toBeTruthy();
  }));
});
