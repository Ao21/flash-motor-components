import { Action } from '@ngrx/store';
import { type } from './../../core/utils/utils';

export const ActionTypes = {
	CREATE_QUOTE: type('[Quote] Create Quote'),
	SET_ACTIVE_PRODUCT: type('[Quote] Set Active Product'),
	SET_PAYMENT_FREQUENCY: type('[Quote] Set Payment Frequency'),
};

export class CreateQuoteAction implements Action {
	type = ActionTypes.CREATE_QUOTE;
	constructor(public payload: Quote) { }
}

export class SetActiveProduct implements Action {
	type = ActionTypes.SET_ACTIVE_PRODUCT;
	constructor(public payload: string) { }
}

export class SetPaymentFrequency implements Action {
	type = ActionTypes.SET_PAYMENT_FREQUENCY;
	constructor(public payload: string) { }
}

export type Actions
	= CreateQuoteAction
	| SetActiveProduct
	| SetPaymentFrequency
