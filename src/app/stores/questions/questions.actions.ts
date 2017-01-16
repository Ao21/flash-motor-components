import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	ADD_QUESTION: type('[Questions] Add Question'),
	CLAIM_SAVE: type('[Questions] Save Claim'),
	PENALTY_SAVE: type('[Penalties] Save Penalty'),
	ADD_QUESTIONS: type('[Questions] Add Questions'),
	LOAD: type('[Questions] Load'),
	UPDATE_FIELD: type('[Sections] Update Field Value'),
};


export class AddQuestionAction implements Action {
	type = ActionTypes.ADD_QUESTION;
	constructor(public payload: { id: string, value: QuestionBase<any> }) { };
}

export class AddQuestionsAction implements Action {
	type = ActionTypes.ADD_QUESTIONS;
	constructor(public payload: [{ id: string, value: QuestionBase<any> }]) { };
}

export class SaveClaimsAction implements Action {
	type = ActionTypes.CLAIM_SAVE;
	constructor(public payload: { sectionId: string, claimId: any }) { };
}

export class SavePenaltyAction implements Action {
	type = ActionTypes.PENALTY_SAVE;
	constructor(public payload: { sectionId: string, penaltyId: any }) { };
}


/**
 * Load All Pages to Stage 
 */

export class LoadQuestionsAction implements Action {
	type = ActionTypes.LOAD;
	constructor(public payload?: any) { };
}

export class UpdateFieldValue implements Action {
	type = ActionTypes.UPDATE_FIELD;
	constructor(public payload: { id: string, key: string, value: string }) { };
}


export type Actions
	= LoadQuestionsAction
	| UpdateFieldValue
	| AddQuestionAction
	| AddQuestionsAction
	| SaveClaimsAction
	| SavePenaltyAction;



