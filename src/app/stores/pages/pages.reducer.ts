import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as pages from './pages.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as sections from './../sections/sections.actions';
import * as _ from 'lodash';

export interface State {
	ids: string[];
	entities: { [id: string]: Page };
	activePageId: string;
}

const initialState: State = {
	ids: [],
	entities: {},
	activePageId: null
};

export function reducer(state = initialState, action: productConfig.Actions | pages.Actions | sections.Actions): State {
	switch (action.type) {
		/** Load all the pages into the store */
		case productConfig.ActionTypes.LOAD_SUCCESS:
			const newPages = action.payload.entities.pages;
			let newPageIds = _.map(newPages, (page: Page) => page.id);
			return {
				entities: newPages,
				ids: newPageIds,
				activePageId: state.activePageId
			};

		case pages.ActionTypes.SELECT:
			return {
				entities: state.entities,
				ids: state.ids,
				activePageId: action.payload
			};

		case pages.ActionTypes.UPDATE:
			{
				let entities = _.assign({}, state.entities);
				entities[action.payload.pageId] = _.assign({}, state.entities[action.payload.pageId], action.payload.page);
				return {
					entities: entities,
					ids: state.ids,
					activePageId: state.activePageId
				};
			}
		case sections.ActionTypes.CREATE_SECTION:
			let entities = _.assign({}, state.entities);
			let newSections = [...entities[action.payload.pageId].sections, action.payload.section.id];

			entities[action.payload.pageId] = _.assign({}, entities[action.payload.pageId], {
				sections: newSections
			});

			return {
				entities: entities,
				ids: state.ids,
				activePageId: state.activePageId
			};

		default: {
			return state;
		}
	}
}

export function getPageEntities($state: Observable<State>) {
	return $state.select(state => state.entities);
}

export function getPageIds($state: Observable<State>) {
	return $state.select(state => state.ids);
}

export function getActivePageId($state: Observable<State>) {
	return $state.select(state => state.activePageId);
}

export function getActivePage(state$: Observable<State>) {
	return combineLatest<{ [id: string]: Page }, string>(
		state$.let(getPageEntities),
		state$.let(getActivePageId))
		.map(([entities, activePageId]) => entities[activePageId]);
}

export function getAllPages(state$: Observable<State>) {
	return combineLatest<{ [id: string]: Page }, string[]>(
		state$.let(getPageEntities),
		state$.let(getPageIds)
	).map(([entities, ids]) => ids.map(id => entities[id]));
}
