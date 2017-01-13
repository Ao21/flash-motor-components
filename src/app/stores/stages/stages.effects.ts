import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as stages from './stages.actions';
import { ProductConfigService } from './../../services/product-config.service';

@Injectable()
export class StagesEffects {


	constructor(
		private actions$: Actions,
	) { }



}
