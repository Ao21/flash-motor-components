import { Injectable } from '@angular/core';


import { Store } from '@ngrx/store';
import * as fromRoot from './../stores/reducer';
import * as sections from './../stores/sections/sections.actions';
import * as questions from './../stores/questions/questions.actions';

import { PenaltyQuestion, RadioQuestion } from './../components/dynamic-form-module/question-models/index';
import * as _ from 'lodash';
let defaultQuestionId = 0; 


@Injectable()
export class PenaltiesControlService {

	constructor(
		public store: Store<fromRoot.State>,
	) { }

	createDefaultQuestion(currentValue) {
		return [{
			key: `userHasPenalty`,
			label: 'Have you had any penalties in the past 3 years?',
			type: 'radio',
			options: [{ value: true, text: 'Yes' }, { value: false, text: 'No' }],
			required: true,
			value: currentValue,
			order: 2,
			validators: []
		}];
	}


	createPenaltyGroupQuestion(key, fields) {
		return {
			type: 'group',
			key: key,
			isComplete: false,
			fields: fields
		};
	};

	createPenalty(section: PenaltiesSection, penalty: PenaltyQuestion, key: any) {
		this.store.dispatch(new sections.CreatePenaltiesAction({ sectionId: section.id, penalty: penalty.id, key: key }));
	}

	editPenalty(section, penalty: PenaltyQuestion) {
		this.store.dispatch(new sections.EditPenaltiesAction({ sectionId: section.id, penaltyId: penalty.id }));
	}

	savePenalty(section: PenaltiesSection, penaltyId: string) {
		this.store.dispatch(new questions.SavePenaltyAction({ sectionId: section.id, penaltyId: penaltyId }));
	}

	deletePenalty(section, penaltyId: string) {
		this.store.dispatch(new sections.DeletePenaltiesAction({ section: section, type: 'single', id: penaltyId }));
	}

	deleteAllPenalties(section) {
		this.store.dispatch(new sections.DeletePenaltiesAction({ section: section, type: 'all' }));
	}

}
