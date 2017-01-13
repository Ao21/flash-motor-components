/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StageManagerService } from './stage-manager.service';

describe('StageManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StageManagerService]
    });
  });

  it('should ...', inject([StageManagerService], (service: StageManagerService) => {
    expect(service).toBeTruthy();
  }));
});
