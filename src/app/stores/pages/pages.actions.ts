import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	LOAD: type('[Pages] Load Stages'),
	LOAD_SUCCESS: type('[Pages] Load Stages Success'),
	LOAD_FAILURE: type('[Pages] Load Stage Failure')
};

/**
 * Load All Pages to Stage 
 */

export class LoadPagesAction implements Action {
	type = ActionTypes.LOAD;
	constructor() { };
}

export class LoadPagesSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: Page) { };
}

export class LoadingPagesFailureAction implements Action {
	type = ActionTypes.LOAD_FAILURE;

	constructor(public payload: any) { };
}

export type Actions
	= LoadPagesAction
	| LoadPagesSuccessAction
	| LoadingPagesFailureAction
