import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as stages from './stages.actions';
import { ProductConfigService } from './../../services/product-config.service';

@Injectable()
export class StagesEffects {

	@Effect() load$: Observable<Action> = this.actions$
		.ofType(stages.ActionTypes.LOAD)
		.switchMap(action =>
			this.productConfigService.getConfig()
				.map(res => ({ type: stages.ActionTypes.ADD_PAGE_SUCCESS, payload: res }))
				.catch(err => Observable.of({ type: stages.ActionTypes.ADD_PAGE_FAILURE, payload: err }))
		);

	constructor(
		private actions$: Actions,
		private productConfigService: ProductConfigService
	) { }



}
