import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromProductConfig from './product-config/product-config.reducer';
import * as fromPages from './pages/pages.reducer';
import * as fromStages from './stages/stages.reducer';

export interface State {
	productConfig: fromProductConfig.State;
	pages: fromPages.State;
	stages: fromStages.State;
};

const reducers = {
	productConfig: fromProductConfig.reducer,
	pages: fromPages.reducer,
	stages: fromProductConfig.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	if (environment.production) {
		return productionReducer(state, action);
	} else {
		return developmentReducer(state, action);
	}
}
