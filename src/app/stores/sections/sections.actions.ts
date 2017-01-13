import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	PENALTY_CREATE: type('[Penalties] Create Penalty'),
	PENALTY_EDIT: type('[Penalties] Edit Penalty'),
	PENALTY_DELETE: type('[Penalties] Delete Penalty'),
	CLAIM_CREATE: type('[Claims] Create Claim'),
	CLAIM_EDIT: type('[Claims] Edit Claim'),
	CLAIMS_DELETE: type('[Claims] Delete Claim'),
	SET_ACTIVE_CLAIM: type('[Claims] Set Active Claim'),
	UPDATE_SECTION: type('[Sections] Update Section'),
	CREATE_SECTION: type('[Sections] Create Section'),
	LOAD: type('[Sections] Load Stages'),
	LOAD_SUCCESS: type('[Sections] Load Stages Success'),
	LOAD_FAILURE: type('[Sections] Load Stage Failure'),
};

export class CreatePenaltiesAction implements Action {
	type = ActionTypes.PENALTY_CREATE;
	constructor(public payload: { sectionId: string, penalty: any, key: number }) { };
}

export class EditPenaltiesAction implements Action {
	type = ActionTypes.PENALTY_EDIT;
	constructor(public payload: { sectionId: string, penaltyId: any }) { };
}

export class DeletePenaltiesAction implements Action {
	type = ActionTypes.PENALTY_DELETE;
	constructor(public payload: { section: PenaltiesSection, type: string, id?: string }) { };
}

export class CreateClaimsAction implements Action {
	type = ActionTypes.CLAIM_CREATE;
	constructor(public payload: { sectionId: string, claim: any, key: number }) { };
}

export class EditClaimsAction implements Action {
	type = ActionTypes.CLAIM_EDIT;
	constructor(public payload: { sectionId: string, claimId: any }) { };
}

export class DeleteClaimsAction implements Action {
	type = ActionTypes.CLAIMS_DELETE;
	constructor(public payload: { section: ClaimsSection, type: string, id?: string }) { };
}

export class SetActiveClaim implements Action {
	type = ActionTypes.SET_ACTIVE_CLAIM;
	constructor(public payload: { id: string }) { };
}

export class CreateSectionAction implements Action {
	type = ActionTypes.CREATE_SECTION;
	constructor(public payload: { pageId: string, section: SectionObject }) { };
}

export class UpdateSectionAction implements Action {
	type = ActionTypes.UPDATE_SECTION;
	constructor(public payload: { id: string, section: SectionObject }) { };
}



/**
 * Load All Pages to Stage 
 */

export class LoadSectionsAction implements Action {
	type = ActionTypes.LOAD;
	constructor(public payload) { };
}


export type Actions
	= LoadSectionsAction
	| UpdateSectionAction
	| CreateSectionAction
	| CreateClaimsAction
	| EditClaimsAction
	| DeleteClaimsAction
	| SetActiveClaim
	| CreatePenaltiesAction
	| EditPenaltiesAction
	| DeletePenaltiesAction

