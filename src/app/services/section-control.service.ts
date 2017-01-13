import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

import { QuestionControlService } from './question-control.service';

import { Store } from '@ngrx/store';
import * as AppState from './../stores/reducer';
import * as Pages from './../stores/pages/pages.reducer';
import * as sections from './../stores/sections/sections.actions';
import * as quotes from './../stores/quote/quote.actions';
import * as _ from 'lodash';
import { Normalise } from './../core/normalise/normalise';

let TOTAL_ADDITIONAL_DRIVERS = 1;

/**
 * SectionControlService
 *
 * Must be capable of creating each section from its template 
 */

@Injectable()
export class SectionControlService {
	constructor(
		private questionControlService: QuestionControlService,
		private store: Store<AppState.State>,
		private http: Http,
		private normalise: Normalise
	) { }

	adjustAdditionalDrivers(amountOfDrivers?: number) {
		if (amountOfDrivers > TOTAL_ADDITIONAL_DRIVERS) {
			this.store.pluck('pages')
				.take(1)
				.map((e: Pages.State) => { return _.values(e.entities); })
				.flatMap((pages: Page[]) => { return _.filter(pages, (page: Page) => { return (page.templates && page.templates.additionalDriver); }); })
				.forEach((e) => { this.createAdditionalDriverSection(e, amountOfDrivers); });
		} else {
			this.removeAdditionalDriverSections(amountOfDrivers);
		}
		TOTAL_ADDITIONAL_DRIVERS = amountOfDrivers;
	}

	removeAdditionalDriverSections(index) {
		// console.log(index);
	}
	createAdditionalDriverSection(page: Page, amountOfDrivers: number) {
		let index = amountOfDrivers - 1;
		let newSection: SectionObject = _.assign({}, page.templates.additionalDriver);
		newSection.id = `${page.id}-additionalDriver-${index}`;
		newSection.questions = [];
		if (page.templates.additionalDriver.hasQuestionsByDefault) {
			newSection.questions = _.map(this.questionControlService.createQuestions(newSection.fields, newSection.id), (e) => e.id);
		};
		delete newSection.fields;
		this.store.dispatch(new sections.CreateSectionAction({
			pageId: page.id,
			section: newSection
		}));
	}

	updatePage(pageId) {
		let response = this.store.let(AppState.getPagesWithQuestionValues)
			.take(1)
			.flatMap(function (x) { return x; })
			.filter((p: Page) => { return p.id === pageId; })
			.map((p: Page) => { return { id: p.id, sections: p.sections } })
			.switchMap((x) => this.updatePageOnServer(x))
			.map((x) => { return x.json(); })
			.share();

		response.subscribe((next) => {
			if (next.quote) {
				this.store.dispatch(new quotes.CreateQuoteAction(next.quote));
			}
		});
		return response;
	}

	updatePageOnServer(page: any): Observable<any> {
		let body = JSON.stringify(page.sections[0].questions);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(environment.urls.POST_UPDATE_PAGE_URL + page.id, body, options);
	}

	getPage(page: string): Observable<any> {
		return this.http.get(environment.urls.GET_SECTION_URL + page);
	}

	getSectionQuestions(section: string): Observable<any> {
		return this.http.get(environment.urls.GET_SECTION_URL + section + '/questions');
	}

}
