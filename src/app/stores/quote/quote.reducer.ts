import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as _ from 'lodash';
import * as quote from './quote.actions';

export interface State {
	quote: Quote;
}

const initialState: State = {
	quote: null,
}

export function reducer(state = initialState, action: quote.Actions): State {
	switch (action.type) {
		case quote.ActionTypes.CREATE_QUOTE:
			let q: any = action.payload;
			return {
				quote: q,
			};
		case quote.ActionTypes.SET_ACTIVE_PRODUCT:
			let newQuote = _.assign({}, state.quote, {
				activeProduct: action.payload
			})
			return {
				quote: newQuote
			};
		case quote.ActionTypes.SET_ACTIVE_PRODUCT:
			let newQuoteWithNewFrequency = _.assign({}, state.quote, {
				paymentFrequency: action.payload
			})
			return {
				quote: newQuoteWithNewFrequency
			};
		default:
			return {
				quote: state.quote
			};
	}
}

export function getCurrentQuote($state: Observable<State>) {
	return $state.select(state => state.quote);
}

export function getActiveProductId($state: Observable<State>) {
	return $state.select(state => state.quote.activeProduct);
}

export function getAllProducts($state: Observable<State>) {
	return $state.select(state => state.quote.products);
}

export function getActiveProduct(state$: Observable<State>): Observable<any> {
	return combineLatest<[ProductItem[], string]>(
		state$.let(getAllProducts),
		state$.let(getActiveProductId)
	).map(([products, activePageId]) => {
		let pageId: any = activePageId;
		return _.find(products, (product: ProductItem) => { return product.id === pageId; });;
	});
}
