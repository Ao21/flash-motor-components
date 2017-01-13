import '@ngrx/core/add/operator/select';

import * as sections from './sections.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as questions from './../questions/questions.actions';
import * as _ from 'lodash';

export const penalties = (state: any, action: productConfig.Actions | sections.Actions | questions.Actions): any => {
	switch (action.type) {
		case sections.ActionTypes.PENALTY_CREATE: {
            let entities = _.assign({}, state.entities);
			let penalties = entities[action.payload.sectionId].questions;
			entities[action.payload.sectionId] = _.assign({}, state.entities[action.payload.sectionId], {
				questions: [...penalties, action.payload.penalty],
				userHasPenalty: true,
				activePenalty: action.payload.penalty
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}

		case questions.ActionTypes.PENALTY_SAVE: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.sectionId] = _.assign({}, state.entities[action.payload.sectionId], {
				activePenalty: null
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
		case sections.ActionTypes.PENALTY_EDIT: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.sectionId] = _.assign({}, state.entities[action.payload.sectionId], {
				userHasPenalty: true,
				activePenalty: action.payload.penaltyId
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
		case sections.ActionTypes.PENALTY_DELETE: {
			let entities = _.assign({}, state.entities);
			if (action.payload.type === 'all') {
				entities[action.payload.section.id] = _.assign({}, state.entities[action.payload.section.id], {
					questions: [],
					userHasPenalty: false,
					activePenalty: null
				});
			}
			if (action.payload.type === 'single') {
				let nQuestions = entities[action.payload.section.id].questions.filter(e => e !== action.payload.id);
				entities[action.payload.section.id] = _.assign({}, state.entities[action.payload.section.id], {
					questions: nQuestions,
					userHasPenalty: nQuestions.length > 0 ? nQuestions : false,
					activePenalty: null
				});
			}
			return {
				entities: entities,
				ids: state.ids
			};
		}
	}
}
