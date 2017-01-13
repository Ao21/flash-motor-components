/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelpCenterService } from './help-center.service';

describe('HelpCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpCenterService]
    });
  });

  it('should ...', inject([HelpCenterService], (service: HelpCenterService) => {
    expect(service).toBeTruthy();
  }));
});
