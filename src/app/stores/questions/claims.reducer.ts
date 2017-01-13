import '@ngrx/core/add/operator/select';

import * as sections from './../sections/sections.actions';
import * as productConfig from './../product-config/product-config.actions';
import * as questions from './../questions/questions.actions';
import * as _ from 'lodash';

export const claims = (state: any, action: productConfig.Actions | questions.Actions | sections.Actions): any => {
	switch (action.type) {
		case sections.ActionTypes.CLAIMS_DELETE: {
			let idArr = {};
			let defaultClaimObject = _.assign({}, action.payload.section.questions);
			if (action.payload.type === 'all') {
				_.map(defaultClaimObject, (e: any) => {
					idArr[e.id] = true;
				});
				_.forEach(defaultClaimObject, (e: ClaimsSection) => {
					return _.forEach(e.fields, (e: any) => {
						idArr[e.id] = true;
					});
				});
			}

			if (action.payload.type === 'single') {
				// _.forEach(defaultClaimObject, (e: ClaimsSection) => {
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
		case sections.ActionTypes.CLAIM_EDIT: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.claimId] = _.assign({}, state.entities[action.payload.claimId], {
				isComplete: false,
				isEditing: true
			});
			return {
				entities: entities,
				ids: state.ids
			};
		}
		case questions.ActionTypes.CLAIM_SAVE: {
			let entities = _.assign({}, state.entities);
			entities[action.payload.claimId] = _.assign({}, state.entities[action.payload.claimId], {
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