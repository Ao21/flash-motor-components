import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from './../../environments/environment';
import { Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { LoadProductConfigAction } from './../stores/product-config/product-config.actions';

import * as fromRoot from './../stores/reducer';

@Injectable()
export class ProductConfigService {

	constructor(
		private store: Store<fromRoot.State>,
		private http: Http
	) { }

	init() {
		this.store.dispatch(new LoadProductConfigAction());
	}

	getConfig(): Observable<any> {
		return this.http.get(environment.urls.GET_CONFIG_URL);
	}

}
