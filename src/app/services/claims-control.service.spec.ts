/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClaimsControlService } from './claims-control.service';

describe('ClaimsControlService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ClaimsControlService]
		});
	});

	it('should ...', inject([ClaimsControlService], (service: ClaimsControlService) => {
		expect(service).toBeTruthy();
	}));
});


