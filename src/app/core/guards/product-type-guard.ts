import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AsyncSubject, Observable } from 'rxjs/Rx';
import { QuoteControlService } from './../../services/quote-control.service'
import { Store } from '@ngrx/store';

import * as AppState from './../../stores/reducer';
import * as quotes from './../../stores/quote/quote.actions';

@Injectable()
export class CanActivateProductGuard implements CanActivate {
	_canActivate: AsyncSubject<any> = new AsyncSubject();

	constructor(
		private router: Router,
		private quoteControlService: QuoteControlService,
		private store: Store<AppState.State>
	) {
	}

	checkIfQuoteInStore(): Observable<Quote> {
		return this.store.let(AppState.getCurrentQuote);
	}

	canActivate() {
		this._canActivate = new AsyncSubject();
		this.checkIfQuoteInStore().take(1).subscribe((next: Quote) => {
			if (next && next.activeProduct) {
				this._canActivate.next(true);
				this._canActivate.complete();
			} else {
				this.router.navigateByUrl('/choose-your-product');
				this._canActivate.next(false);
				this._canActivate.complete();
			}
		});
		return this._canActivate;

	}
}
