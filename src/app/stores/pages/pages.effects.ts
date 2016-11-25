import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as pages from './pages.actions';

@Injectable()
export class PageEffects {

	@Effect() load$: Observable<Action> = this.actions$
		.ofType(pages.ActionTypes.LOAD)
		.map(res => ( { type: pages.ActionTypes.LOAD_SUCCESS, payload: res  }));
	constructor(
		private actions$: Actions,
	) { }



}
