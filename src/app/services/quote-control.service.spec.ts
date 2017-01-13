/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuoteControlService } from './quote-control.service';

describe('QuoteControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteControlService]
    });
  });

  it('should ...', inject([QuoteControlService], (service: QuoteControlService) => {
    expect(service).toBeTruthy();
  }));
});
