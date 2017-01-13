import { Injectable } from '@angular/core';

@Injectable()
export class CrossSellService {

	createMyAAQuestion() {
		return {
			key: 'myAAMembership',
			name: 'Add AA Membership',
			type: 'checkbox',
			timeline: false,
			required: false
		}
	}

	createCrossSellQuestions() {
		return [{
			key: `aaMembershipNumber`,
			label: 'AA Membership number',
			placeholder: '00000000',
			type: 'text',
			order: 0,
			validators: []
		}, {
			key: `aaHomeInsurancePolicy`,
			label: 'AA Home Insurance Policy number',
			placeholder: 'AAAA00000',
			type: 'text',
			order: 0,
			validators: []
		}];
	}
	constructor() { }

}
