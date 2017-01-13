import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

import * as reducer from './../stores/reducer';
import * as helpCenter from './../stores/help-center/help-center.actions';


@Injectable()
export class HelpCenterService {
	helpArticleIds: { [id: string]: any } = {};

	constructor(
		private http: Http,
		private store: Store<reducer.State>
	) { }

	selectHelpItem(id) {
		if (!this.helpArticleIds[id]) {
			this.getHelpItemFromServer(id);
		} else {
			this.store.dispatch(new helpCenter.SelectHelpTopicAction(id));
		}
	}

	search(query: string): Observable<Array<HelpCenterItem>> {
		return this.http.get(environment.urls.GET_ZENDESK_HELP_SEARCH + query)	
			.map((res) => { return res.json(); });
	}

	getHelpItemFromServer(id: string) {
		this.http.get(environment.urls.GET_ZENDESK_HELP_BY_ID + id)
			.map((res) => { return res.json(); })
			.subscribe((next: HelpCenterItem) => {
				this.helpArticleIds[next.id] = true;
				this.store.dispatch(new helpCenter.LoadHelpTopicAction(next));
			});
	}

}
