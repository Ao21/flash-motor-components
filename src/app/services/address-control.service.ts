import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

import * as reducer from './../stores/reducer';


@Injectable()
export class AddressControlService {

	constructor(
		private http: Http,
		private store: Store<reducer.State>
	) { }

	search(address: {}): Observable<any> {
		return this.http.put(environment.urls.PUT_ADDRESS, address)
			.map((res) => { return res.json(); });
	}

	select(id: string): Observable<any> {
		return this.http.post(environment.urls.POST_ADDRESS_SELECT, {id: id})
			.map((res) => { return res.json(); });
	}


}
