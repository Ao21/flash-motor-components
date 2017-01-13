import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AppState from './../stores/reducer';
import * as sections from './../stores/sections/sections.actions';
import * as questions from './../stores/questions/questions.actions';


import * as _ from 'lodash';
@Injectable()
export class PaymentControlService {

	constructor(
		public store: Store<AppState.State>
	) { }


}
