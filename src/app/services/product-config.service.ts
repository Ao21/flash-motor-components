import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { URLCONSTS } from './../constants';

import { Store } from '@ngrx/store';
import { LoadProductConfigAction } from './../stores/product-config/product-config.actions';


@Injectable()
export class ProductConfigService {

	constructor(
		private store: Store<ProductConfig>,
		private http: Http
	) { }

	init() {
		this.store.dispatch(new LoadProductConfigAction());
	}

	getConfig() {
		return this.http.get(URLCONSTS.GET_CONFIG_URL);
	}

}
