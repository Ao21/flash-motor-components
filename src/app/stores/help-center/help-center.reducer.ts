import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';


import * as helpCenter from './help-center.actions';
import * as _ from 'lodash';


export interface State {
	ids: number[];
	entities: { [id: string]: any };
	activeHelpId: number;
}

const initialState: State = {
	ids: [],
	entities: {},
	activeHelpId: null
};

export function reducer(state = initialState, action: helpCenter.Actions): State {
	switch (action.type) {
		case helpCenter.ActionTypes.CLEAR:
			return {
				entities: state.entities,
				ids: state.ids,
				activeHelpId: null
			}
		case helpCenter.ActionTypes.SELECT:
			return {
				entities: state.entities,
				ids: state.ids,
				activeHelpId: action.payload
			};
		case helpCenter.ActionTypes.LOAD:
			let entities = _.assign({}, state.entities);
			if (!state.ids[action.payload.id]) {
				entities[action.payload.id] = _.assign({}, state.entities[action.payload.id], action.payload);
			}
			return {
				entities: entities,
				ids: [...state.ids, action.payload.id],
				activeHelpId: action.payload.id
			};
		default: {
			return state;
		}
	}
}


export function getHelpEntities($state: Observable<State>) {
	return $state.select(state => {
		return state.entities;
	});
}

export function getActiveHelpId($state: Observable<State>) {
	return $state.select(state => state.activeHelpId);
}
