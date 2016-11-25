import { Observable } from 'rxjs/Observable';
import * as stages from './stages.actions';
import * as pages from './../pages/pages.actions';
import * as productConfig from './../product-config/product-config.actions';

export interface State {
	loaded: boolean;
	loading: boolean;
	pages: Page[];
}

const initialState: State = {
	loaded: false,
	loading: false,
	pages: []
};

export function reducer(state = initialState, action: pages.Actions | stages.Actions): State {
	switch (action.type) {
		case stages.ActionTypes.LOAD:
			break;
		case pages.ActionTypes.LOAD_SUCCESS:
			console.log(action);
			break;
		default: {
			return state;
		}
	}
}