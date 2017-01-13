import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as stagesStore from './product-config.actions';
import * as _ from 'lodash';
import { QuestionControlService } from './../../services/question-control.service';
import { ProductConfigService } from './../../services/product-config.service';

import { normalize, Schema, arrayOf } from 'normalizr';

const stage = new Schema('stages');
const page = new Schema('pages');
const sectionSchema = new Schema('sections');

sectionSchema.define({});

page.define({
	sections: arrayOf(sectionSchema)
});

stage.define({
	pages: arrayOf(page)
});


import { Normalise } from './../../core/normalise/normalise';

@Injectable()
export class ProductConfigEffects {

	@Effect() load$: Observable<Action> = this.actions$
		.ofType(stagesStore.ActionTypes.LOAD)
		.switchMap(action =>
			this.productConfigService.getConfig()
				.map(res => res.json())
				.map(res => {
					let result = this.normalise.normaliseProductConfig(res);
					result.entities.questions = {};
					// Map Fields to Questions and Generate a Question Entities List
					result = this.questionControlService.mapSectionsAndNormaliseQuestions(result);
					return { type: stagesStore.ActionTypes.LOAD_SUCCESS, payload: result };
				})
				.catch(err => Observable.of({ type: stagesStore.ActionTypes.LOAD_FAILURE, payload: err }))
		);

	constructor(
		public actions$: Actions,
		public questionControlService: QuestionControlService,
		public productConfigService: ProductConfigService,
		public normalise: Normalise
	) { }



}
