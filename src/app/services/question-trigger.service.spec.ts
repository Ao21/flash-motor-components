/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionTriggerService } from './question-trigger.service';

describe('QuestionTriggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionTriggerService]
    });
  });

  it('should ...', inject([QuestionTriggerService], (service: QuestionTriggerService) => {
    expect(service).toBeTruthy();
  }));
});
