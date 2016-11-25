import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import {
	Router, Resolve,
	ActivatedRouteSnapshot
} from '@angular/router';

import { SectionControlService } from './../../services/section-control.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageResolveGuard implements Resolve<any> {
	constructor(
		private sectionControlService: SectionControlService,
		private router: Router,
		private http: Http,
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
		let pageName = route.data['pageName'];
		if (pageName === undefined) {
			throw new Error('No Page Name')
		}

		return this.sectionControlService
			.getPage(pageName)
			.map(res => res.json())
			.toPromise().then(page => {
				if (page) {
					return page;
				}
			});
	}

}
