import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { claims } from './claims.reducer';
import { penalties } from './penalty.reducer';

import * as questions from './questions.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as sections from './../sections/sections.actions';
import * as _ from 'lodash';

export interface State {
	ids: string[];
	entities: { [id: string]: SectionObject };
}

const initialState: State = {
	ids: [],
	entities: {}
};


export function reducer(state = initialState, action: productConfig.Actions | questions.Actions | sections.Actions): State {
	switch (action.type) {
		case sections.ActionTypes.CLAIMS_DELETE:
			return claims(state, action);

		case questions.ActionTypes.CLAIM_SAVE:
			return claims(state, action);

		case sections.ActionTypes.CLAIM_EDIT:
			return claims(state, action);

		case sections.ActionTypes.PENALTY_DELETE:
			return penalties(state, action);

		case questions.ActionTypes.PENALTY_SAVE:
			return penalties(state, action);

		case sections.ActionTypes.PENALTY_EDIT:
			return penalties(state, action);

		case questions.ActionTypes.ADD_QUESTION:
			const question: any = action.payload.value;
			if (state.ids.indexOf(question.id) > -1) {
				return state;
			}
			return {
				entities: Object.assign({}, state.entities, { [question.id]: question }),
				ids: [...state.ids, question.id]
			};
		case questions.ActionTypes.ADD_QUESTIONS:
			return {
				entities: state.entities,
				ids: state.ids
			};
		case questions.ActionTypes.UPDATE_FIELD: {
			let newEntities = _.assign({}, state.entities, {
				[action.payload.id]: _.assign({}, state.entities[action.payload.id], {
					value: action.payload.value
				})
			});
			return {
				entities: newEntities,
				ids: state.ids
			};
		}
		default: {
			return state;
		}
	};
}

export function getQuestionEntities($state: Observable<State>) {
	return $state.select(state => state.entities);
}

export function getQuestionIds($state: Observable<State>) {
	return $state.select(state => state.ids);
}

export function getAllSections(state$: Observable<State>) {
	return combineLatest<{ [id: string]: SectionObject }, string[]>(
		state$.let(getQuestionEntities),
		state$.let(getQuestionIds)
	).map(([entities, ids]) => ids.map(id => entities[id]));
}