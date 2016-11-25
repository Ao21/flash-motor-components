/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductConfigService } from './product-config.service';

describe('ProductConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductConfigService]
    });
  });

  it('should ...', inject([ProductConfigService], (service: ProductConfigService) => {
    expect(service).toBeTruthy();
  }));
});
