import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	CLEAR: type('[Help Center] Clear the active help topic'),
	SELECT: type('[Help Center] Select a Help Topic'),
	LOAD: type('[Help Center] Load Topic'),
	LOAD_SUCCESS: type('[Help Center] Load Topic Success'),
	LOAD_FAILURE: type('[Help Center] Load Topic Failure')
};

export class ClearHelpTopicAction implements Action {
	type = ActionTypes.CLEAR;
	constructor(public payload: any) { }
}

export class SelectHelpTopicAction implements Action {
	type = ActionTypes.SELECT;
	constructor(public payload: number) { }
}

export class LoadHelpTopicAction implements Action {
	type = ActionTypes.LOAD;
	constructor(public payload: HelpCenterItem) { };
}

export class LoadHelpTopicSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: any) { };
}

export class LoadHelpTopicFailureAction implements Action {
	type = ActionTypes.LOAD_FAILURE;

	constructor(public payload: any) { };
}

export type Actions
	= LoadHelpTopicAction
	| LoadHelpTopicSuccessAction
	| LoadHelpTopicFailureAction
	| SelectHelpTopicAction
	| ClearHelpTopicAction
