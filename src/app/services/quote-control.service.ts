import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
@Injectable()
export class QuoteControlService {

	constructor(
		private http: Http
	) { }

	getQuote(): any {
		return this.http.get(environment.urls.GET_QUOTE_URL).map((x) => x.json());
	}

}
