import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';

import {
	Router, Resolve,
	ActivatedRouteSnapshot
} from '@angular/router';

import { SectionControlService } from './../../services/section-control.service';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './../../stores/reducer';
import { SelectPagesAction } from './../../stores/pages/pages.actions';


@Injectable()
export class PageResolveGuard implements Resolve<any> {
	actionsSubscription: Subscription;

	constructor(
		private store: Store<fromRoot.State>,
		private sectionControlService: SectionControlService,
		private router: Router,
		private http: Http,
	) { }

	waitForCollectionToLoad(): Observable<boolean> {
		return this.store.let(fromRoot.getConfigLoaded)
			.filter(loaded => loaded)
			.take(1);
	}

	hasPageInStore(id: string): Observable<Page> {
		return this.store.let(fromRoot.getPageEntites)
			.map(entities => { return entities[id]; })
			.take(1);
	}

	hasPageInApi(id: string): Observable<any> {
		return this.sectionControlService.getPage(id)
			.map(res => res.json());

	}

	hasPage(id: string): Observable<any> {
		return this.hasPageInStore(id)
			.switchMap(inStore => {
				if (inStore) {
					return of(inStore);
				}
				return this.hasPageInApi(id);
			});
	}

	resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

		let pageName = route.data['pageName'];
		if (pageName === undefined) {
			throw new Error('No Page Name');
		}

		return this.waitForCollectionToLoad()
			.switchMap(() => this.hasPage(pageName))
			.do((res) => {
				this.store.dispatch(new SelectPagesAction(pageName));
				return res;
			});
	}

}
