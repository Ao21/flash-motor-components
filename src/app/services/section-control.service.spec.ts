/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SectionControlService } from './section-control.service';

describe('Service: Test', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SectionControlService]
		});
	});

	it('should ...', inject([SectionControlService], (service: SectionControlService) => {
		expect(service).toBeTruthy();
	}));
});
