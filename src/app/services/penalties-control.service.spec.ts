/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PenaltiesControlService } from './penalties-control.service';

describe('PenaltiesControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PenaltiesControlService]
    });
  });

  it('should ...', inject([PenaltiesControlService], (service: PenaltiesControlService) => {
    expect(service).toBeTruthy();
  }));
});
