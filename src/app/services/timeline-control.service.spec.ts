/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimelineControlService } from './timeline-control.service';

describe('Service: Test', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TimelineControlService]
		});
	});

	it('should ...', inject([TimelineControlService], (service: TimelineControlService) => {
		expect(service).toBeTruthy();
	}));
});
