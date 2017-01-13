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


@Injectable()
export class StageResolveGuard implements Resolve<any> {
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

	hasStages(): Observable<any> {
		return this.store.let(fromRoot.getAllStagesWithPages)
			.map(entities => { return entities; })
			.take(1);
	}

	hasStage(): Observable<{}> {
		return this.hasStages()
			.switchMap(inStore => {
				if (inStore) {
					return of(inStore);
				}
			});
	}

	resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
		return this.waitForCollectionToLoad()
			.switchMap(() => this.hasStage())
			.do((res) => {
				return res;
			});
	}

}
