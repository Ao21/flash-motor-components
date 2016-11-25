import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	ADD_PAGE: type('[Stage] Add Stages'),
	ADD_PAGE_SUCCESS: type('[Stage] Add Stages Success'),
	ADD_PAGE_FAILURE: type('[Stage] Add Stage Failure'),
	LOAD: type('[Stage] Load Stages'),
	LOAD_SUCCESS: type('[Stage] Load Stages Success'),
	LOAD_FAILURE: type('[Stage] Load Stage Failure')
};



/**
 * Load All Pages to Stage 
 */

export class LoadAction implements Action {
	type = ActionTypes.LOAD;
	constructor(public payload: Page) { };
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;
	constructor(public payload: Page) { };
}

export class LoadFailureAction implements Action {
	type = ActionTypes.LOAD_FAILURE;

	constructor(public payload: any) { };
}


export type Actions
	= LoadAction
	| LoadFailureAction
	| LoadSuccessAction
