import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as productConfig from './../product-config/product-config.actions';
import * as _ from 'lodash';

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

export function reducer(state = initialState, action: productConfig.Actions): State {
	switch (action.type) {
		case productConfig.ActionTypes.LOAD_SUCCESS:
			console.log('pages load success!');
			let pages: any = _.map(action.payload.stages, (page: Page) => {
				return {
					title: page.title,
					order: page.order,
					templates: page.templates,
					sections: page.sections
				};
			});
			return {
				loaded: true,
				loading: false,
				pages: pages
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
