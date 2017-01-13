import '@ngrx/core/add/operator/select';

import * as sections from './../sections/sections.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as questions from './../questions/questions.actions';
import * as _ from 'lodash';

export const penalties = (state: any, action: productConfig.Actions | questions.Actions | sections.Actions): any => {
	switch (action.type) {
		case sections.ActionTypes.PENALTY_DELETE: {
			let idArr = {};
			let defaultPenaltyObject = _.assign({}, action.payload.section.questions);
			if (action.payload.type === 'all') {
				_.map(defaultPenaltyObject, (e: any) => {
					idArr[e.id] = true;
				});
				_.forEach(defaultPenaltyObject, (e: PenaltiesSection) => {
					return _.forEach(e.fields, (e: any) => {
						idArr[e.id] = true;
					});
				});
			}

			if (action.payload.type === 'single') {
				// _.forEach(defaultPenaltyObject, (e: ClaimsSection) => {
				// 	return _.forEach(e.fields, (e: any) => {
				// 		idArr[e.id] = true;
				// 	});
				// });
			}

			let nEntities = _.keyBy(_.filter(state.entities, (e: any) => { return !idArr[e.id]; }), (e) => { return e.id; });
			let nIds = _.filter(state.ids, (e: any) => { return !idArr[e]; });

			return {
				entities: nEntities,
				ids: nIds
			};
		}
		case sections.ActionTypes.PENALTY_EDIT: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.penaltyId] = _.assign({}, state.entities[action.payload.penaltyId], {
				isComplete: false,
				isEditing: true
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
		case questions.ActionTypes.PENALTY_SAVE: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.penaltyId] = _.assign({}, state.entities[action.payload.penaltyId], {
				isComplete: true,
				isEditing: false
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
	}
}