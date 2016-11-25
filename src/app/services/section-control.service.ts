import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { URLCONSTS } from './../constants';

/**
 * SectionControlService
 *
 * Must be capable of creating each section from its template 
 */

@Injectable()
export class SectionControlService {
	constructor(
		private http: Http
	) { }

	getPage(page: string) {
		return this.http.get(URLCONSTS.GET_SECTION_URL + page);
	}

	getSectionQuestions(section: string) {
		return this.http.get(URLCONSTS.GET_SECTION_URL + section + '/questions');
	}

}
