import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from './../stores/reducer';
import * as sections from './../stores/sections/sections.actions';
import * as questions from './../stores/questions/questions.actions';

import { ClaimQuestion } from './../components/dynamic-form-module/question-models/index';

import * as _ from 'lodash';

let defaultQuestionId = 0;

@Injectable()
export class ClaimsControlService {
	constructor(
		public store: Store<fromRoot.State>,
	) { }

	createDefaultQuestion(doesUserHaveClaim: boolean) {
		return [{
			key: `userHasClaim`,
			label: 'Have you had any claims in the past 3 years?',
			type: 'radio',
			options: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }],
			required: true,
			value: doesUserHaveClaim,
			order: 2,
			validators: []
		}];
	}

	createClaimGroupQuestion(key: any, fields) {
		return {
			type: 'group',
			key: key,
			isComplete: false,
			fields: fields
		};
	}

	createClaim(section: ClaimsSection, claim: ClaimQuestion, key: any) {
		this.store.dispatch(new sections.CreateClaimsAction({ sectionId: section.id, claim: claim.id, key: key }));
	}

	editClaim(section, claim: ClaimQuestion) {
		this.store.dispatch(new sections.EditClaimsAction({ sectionId: section.id, claimId: claim.id }));
	}

	saveClaim(section: ClaimsSection, claimId: string) {
		this.store.dispatch(new questions.SaveClaimsAction({ sectionId: section.id, claimId: claimId }));
	}

	deleteClaim(section, claimId: string) {
		this.store.dispatch(new sections.DeleteClaimsAction({ section: section, type: 'single', id: claimId }));
	}

	deleteAllClaims(section) {
		this.store.dispatch(new sections.DeleteClaimsAction({ section: section, type: 'all' }));
	}

}
