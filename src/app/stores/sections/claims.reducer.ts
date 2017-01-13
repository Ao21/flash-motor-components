import '@ngrx/core/add/operator/select';

import * as sections from './sections.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as questions from './../questions/questions.actions';
import * as _ from 'lodash';

export const claims = (state: any, action: productConfig.Actions | sections.Actions | questions.Actions): any => {
	switch (action.type) {
		case sections.ActionTypes.CLAIM_CREATE: {
			let entities = _.assign({}, state.entities);
			let claims = entities[action.payload.sectionId].questions;
			entities[action.payload.sectionId] = _.assign({}, state.entities[action.payload.sectionId], {
				questions: [...claims, action.payload.claim],
				userHasClaim: true,
				activeClaim: action.payload.claim
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}

		case questions.ActionTypes.CLAIM_SAVE: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.sectionId] = _.assign({}, state.entities[action.payload.sectionId], {
				activeClaim: null
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
		case sections.ActionTypes.CLAIM_EDIT: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.sectionId] = _.assign({}, state.entities[action.payload.sectionId], {
				userHasClaim: true,
				activeClaim: action.payload.claimId
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
		case sections.ActionTypes.CLAIMS_DELETE: {
			let entities = _.assign({}, state.entities);
			if (action.payload.type === 'all') {
				entities[action.payload.section.id] = _.assign({}, state.entities[action.payload.section.id], {
					questions: [],
					userHasClaim: false,
					activeClaim: null
				});
			}
			if (action.payload.type === 'single') {
				let nQuestions = entities[action.payload.section.id].questions.filter(e => e !== action.payload.id);
				entities[action.payload.section.id] = _.assign({}, state.entities[action.payload.section.id], {
					questions: nQuestions,
					userHasClaim: nQuestions.length > 0 ? nQuestions : false,
					activeClaim: null
				});
			}
			return {
				entities: entities,
				ids: state.ids
			};
		}
	}
}
