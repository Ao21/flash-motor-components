import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as pages from './pages.actions';

@Injectable()
export class PageEffects {

	constructor(
		private actions$: Actions,
	) { }



}
