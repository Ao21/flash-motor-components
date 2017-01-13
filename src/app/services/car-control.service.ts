import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Rx';

import { Store } from '@ngrx/store';
import * as fromRoot from './../stores/reducer';
import * as sections from './../stores/sections/sections.actions';
import * as questions from './../stores/questions/questions.actions';


@Injectable()
export class CarControlService {

	constructor(
		public store: Store<fromRoot.State>,
		private http: Http
	) { }

	createRegistrationSearchQuestion() {
		return [{
			key: 'carSearchQuestion',
			label: 'Car Registration',
			type: 'text',
			required: false,
			order: 0
		}]
	};

	getCarRegistration(registration: string): Observable<{}> {
		return this.http
			.get(environment.urls.GET_VEHICLE_REG + registration)
			.map((e) => e.json());
	}
	createCar() { }
	deleteCar() { }

}
