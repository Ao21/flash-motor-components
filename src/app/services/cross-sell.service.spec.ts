/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrossSellService } from './cross-sell.service';

describe('CrossSellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossSellService]
    });
  });

  it('should ...', inject([CrossSellService], (service: CrossSellService) => {
    expect(service).toBeTruthy();
  }));
});
