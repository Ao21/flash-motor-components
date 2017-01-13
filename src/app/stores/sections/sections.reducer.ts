import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as sections from './sections.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as questions from './../questions/questions.actions';

/** Sub-Reducers */
import { claims } from './claims.reducer';
import { section } from './section.reducer';
import { penalties } from './penalty.reducer';


import * as _ from 'lodash';

export interface State {
	ids: string[];
	entities: { [id: string]: SectionObject };
}

const initialState: State = {
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: productConfig.Actions | sections.Actions | questions.Actions): State {
	switch (action.type) {

		case sections.ActionTypes.CLAIM_CREATE:
			return claims(state, action);

		case questions.ActionTypes.CLAIM_SAVE:
			return claims(state, action);

		case sections.ActionTypes.CLAIM_EDIT:
			return claims(state, action);

		case sections.ActionTypes.CLAIMS_DELETE:
			return claims(state, action);

		case sections.ActionTypes.PENALTY_CREATE:
			return penalties(state, action);

		case questions.ActionTypes.PENALTY_SAVE:
			return penalties(state, action);

		case sections.ActionTypes.PENALTY_EDIT:
			return penalties(state, action);

		case sections.ActionTypes.PENALTY_DELETE:
			return penalties(state, action);

		case sections.ActionTypes.CREATE_SECTION:
			return section(state, action);

		case sections.ActionTypes.UPDATE_SECTION:
			return section(state, action);

		case productConfig.ActionTypes.LOAD_SUCCESS:
			return section(state, action);

		default: {
			return state;
		}
	};
}

export function getSectionEntities($state: Observable<State>) {
	return $state.select(state => state.entities);
}

export function getSectionIds($state: Observable<State>) {
	return $state.select(state => state.ids);
}

export function getAllSections(state$: Observable<State>) {
	return combineLatest<{ [id: string]: SectionObject }, string[]>(
		state$.let(getSectionEntities),
		state$.let(getSectionIds)
	).map(([entities, ids]) => ids.map(id => entities[id]));
}