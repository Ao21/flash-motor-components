import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	LOAD: type('[ProductConfig] Load Stages'),
	LOAD_SUCCESS: type('[ProductConfig] Load Stages Success'),
	LOAD_FAILURE: type('[ProductConfig] Load Stage Failure')
};

/**
 * Load All Pages to Stage 
 */

export class LoadProductConfigAction implements Action {
	type = ActionTypes.LOAD;
	constructor() { };
}

export class LoadProductConfigSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: {entities: {pages: any, stages: any, sections: any, questions: any }}) { };
}

export class LoadingProductConfigFailureAction implements Action {
	type = ActionTypes.LOAD_FAILURE;

	constructor(public payload: any) { };
}

export type Actions
	= LoadProductConfigAction
	| LoadProductConfigSuccessAction
	| LoadingProductConfigFailureAction
