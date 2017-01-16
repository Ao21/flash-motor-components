import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	SELECT: type('[Pages] Select a Page'),
	UPDATE: type('[Pages] Update a Page'),
	LOAD: type('[Pages] Load Stages'),
};


export class SelectPagesAction implements Action {
	type = ActionTypes.SELECT;
	constructor(public payload: string) { };
}

/**
 * Load All Pages to Stage 
 */

export class LoadPagesAction implements Action {
	type = ActionTypes.LOAD;
	constructor(public payload: any) { };
}


export class UpdatePageAction implements Action {
	type = ActionTypes.UPDATE;
	constructor(public payload: {pageId: string, page: Page}) { };
}


export type Actions
	= SelectPagesAction
	| LoadPagesAction
	| UpdatePageAction;
