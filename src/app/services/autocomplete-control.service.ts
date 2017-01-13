import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import { isJsObject } from '@angular/core/src/facade/lang';
import * as Fuse from 'fuse.js';

@Injectable()
export class AutocompleteControlService {
	isLoadingOptions: boolean = false;
	optionsList: ReplaySubject<any> = new ReplaySubject(1);
	fuseList: Fuse;

	get options() {
		return this._options;
	}
	set options(options) {
		this.fuseList = new Fuse(options, {
			shouldSort: true,
			location: 0,
			threshold: 0.2,
			distance: 100,
			keys: ['text']
		});
		this.optionsList.next(options);
		this._options = options;
	}
	private _options: any[];

	get serviceUrl() {
		return this._serviceUrl;
	}
	set serviceUrl(url) {
		this._serviceUrl = url;
	}
	private _serviceUrl;

	get serviceType() {
		return this._serviceType;
	}
	set serviceType(url) {
		this._serviceType = url;
	}
	private _serviceType;

	constructor(
		private http: Http
	) {
		if (this._serviceType === 'all') {
			this.isLoadingOptions = true;
			this.http.get(environment.urls.BASE_URL + this._serviceUrl + this.serviceType)
				.map(res => res.json())
				.subscribe((next) => {
					this.isLoadingOptions = false;
					this.options = next;
				});
		}
	}


	get(query): Observable<any> | any {
		switch (this._serviceType) {
			case 'all':
				return this.all();
			case 'search':
			case 'linked':
				return this.search(query);
			default:
				return this.filterList(query.query);
		}
	}

	// TODO: Add Caching to All	
	all(): Observable<any> {
		return this.http.get(environment.urls.BASE_URL + this._serviceUrl + this.serviceType);
	}

	search(query) {
		let params = new URLSearchParams();
		params.append('query', query.query);
		if (query.link) {
			let q = query.link.value;
			if (isJsObject(query.link.value)) {
				q = JSON.stringify(query.link.value);
			}
			params.append('link', q);
		}
		return this.http.get(environment.urls.BASE_URL + this._serviceUrl + this.serviceType, { search: params }).map(next => { return next.json(); });
	}

	dispose() {
		this.optionsList.unsubscribe();
	}

	filterList(query): Observable<any> | any {
		if (query === '') {
			return this.optionsList;
		}
		return this.optionsList.map((res: any[]) => {
			return this.fuseList.search(query);
		});
	}

}
