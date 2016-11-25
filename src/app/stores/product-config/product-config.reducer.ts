import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as productConfig from './product-config.actions';

export interface State {
	loaded: boolean;
	loading: boolean;
}

const initialState: State = {
	loaded: false,
	loading: false,
};

export function reducer(state = initialState, action: productConfig.Actions): State {
	switch (action.type) {
		case productConfig.ActionTypes.LOAD:
			return Object.assign({}, state, {
				loading: true
			});

		case productConfig.ActionTypes.LOAD_SUCCESS:
			return {
				loaded: true,
				loading: false
			};
		default: {
			return state;
		}
	}
}

export function getLoaded(state$: Observable<State>) {
	return state$.select(s => s.loaded);
}

export function getLoading(state$: Observable<State>) {
	return state$.select(s => s.loading);
}
