import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Rx';
import * as AppState from './../stores/reducer';
import * as Pages from './../stores/pages/pages.reducer';
import * as stages from './../stores/stages/stages.actions';

import { UpdatePageAction } from './../stores/pages/pages.actions';

import * as _ from 'lodash';

@Injectable()
export class StageManagerService {

	onPageComplete: Subject<any> = new Subject();

	constructor(
		private store: Store<AppState.State>
	) { }


	completeStage() {
		this.store.dispatch(new stages.SetNextSectionActive);
	}

	completePage(pageId, nextPageId, page?: Page) {
		this.onPageComplete.next(true);
		// Set New Active Pages
		this.store.select('pages')
			.map((e: Pages.State) => { return e.entities; })
			.distinctUntilChanged()
			.take(1)
			.subscribe((entities) => {
				this.setPageAsValid(entities[pageId]);
				this.setPageAsVisible(entities[nextPageId]);
			}).unsubscribe();
	}

	setPageAsValid(page) {
		let p = _.assign({}, page, {
			uiOptions: _.assign({}, page.uiOptions, {
				isComplete: true
			})
		});
		this.store.dispatch(new UpdatePageAction({ pageId: p.id, page: p }));
	}

	setPageAsVisible(page) {
		let p = _.assign({}, page, {
			uiOptions: _.assign({}, page.uiOptions, {
				isVisible: true
			})
		});
		this.store.dispatch(new UpdatePageAction({ pageId: p.id, page: p }));
	}

}
