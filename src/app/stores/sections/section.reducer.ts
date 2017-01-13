import '@ngrx/core/add/operator/select';

import * as reducer from './sections.reducer';

import * as sections from './sections.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as questions from './../questions/questions.actions';
import * as _ from 'lodash';

export const section = (state: reducer.State, action: productConfig.Actions | sections.Actions | questions.Actions): any => {
	switch (action.type) {
		case sections.ActionTypes.CREATE_SECTION:
			let newSection = {
				[action.payload.section.id]: action.payload.section
			};
			return {
				entities: _.assign({}, state.entities, newSection),
				ids: [action.payload.section.id, ...state.ids]
			};
		case sections.ActionTypes.UPDATE_SECTION:
			let entities = _.assign({}, state.entities);
			entities[action.payload.id] = _.assign({}, state.entities[action.payload.id], action.payload.section);
			return {
				entities: entities,
				ids: state.ids
			};
		case productConfig.ActionTypes.LOAD_SUCCESS:
			const newSections = action.payload.entities.sections;
			let newSectionIds = _.map(newSections, (section: SectionObject) => section.id.toLowerCase());
			return {
				entities: newSections,
				ids: newSectionIds
			};
	}
}