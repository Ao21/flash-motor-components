import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as stages from './stages.actions';
import * as pages from './../pages/pages.actions';
import * as productConfig from './../product-config/product-config.actions';

import * as _ from 'lodash';

export interface State {
	loaded: boolean;
	loading: boolean;
	activeStageId: string;
	ids: string[];
	entities: any;
}

const initialState: State = {
	loaded: false,
	loading: false,
	activeStageId: null,
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: pages.Actions | stages.Actions | productConfig.Actions): State {
	switch (action.type) {
		case pages.ActionTypes.SELECT:
			let activeStage: any = _.find(state.entities, (e: Stage) => {
				return _.find(e.pages, (e: string) => {
					return e === action.payload;
				});
			});
			return {
				loaded: state.loaded,
				loading: state.loading,
				activeStageId: activeStage.id,
				entities: state.entities,
				ids: state.ids
			};


		case stages.ActionTypes.SET_NEXT_STAGE_ACTIVE:
			let curIndex = _.findIndex(state.entities, (e: Stage, v) => {
				return e.id === state.activeStageId;
			});
			return {
				loaded: state.loaded,
				loading: state.loading,
				activeStageId: state.ids[curIndex++] || state.activeStageId,
				entities: state.entities,
				ids: state.ids
			};
		case stages.ActionTypes.SET_STAGE_ACTIVE:
			return {
				loaded: state.loaded,
				loading: state.loading,
				activeStageId: action.payload,
				entities: state.entities,
				ids: state.ids
			};
		case productConfig.ActionTypes.LOAD_SUCCESS:
			let ids = [];
			_.forIn(action.payload.entities.stages, (e, v) => {
				if (state.ids.indexOf(v) === -1) {
					ids.push(v.toLowerCase());
				}
			});
			return {
				loaded: true,
				loading: true,
				activeStageId: ids[0],
				entities: action.payload.entities.stages,
				ids: ids
			};
		default: {
			return state;
		}
	}
}

export function getStageEntities($state: Observable<State>) {
	return $state.select(state => state.entities);
}

export function getStageIds($state: Observable<State>) {
	return $state.select(state => state.ids);
}

export function getAllStages(state$: Observable<State>) {
	return combineLatest<{ [id: string]: Stage }, string[]>(
		state$.let(getStageEntities),
		state$.let(getStageIds)
	).map(([entities, ids]) => ids.map(id => entities[id]));
}

export function getActiveStageId($state: Observable<State>) {
	return $state.select(state => state.activeStageId);
}

export function getActiveStage(state$: Observable<State>) {
	return combineLatest<{ [id: string]: Stage }, string>(
		state$.let(getStageEntities),
		state$.let(getActiveStageId))
		.map(([entities, activePageId]) => entities[activePageId]);
}