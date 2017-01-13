import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as _ from 'lodash';

import * as fromProductConfig from './product-config/product-config.reducer';
import * as fromPages from './pages/pages.reducer';
import * as fromStages from './stages/stages.reducer';
import * as fromSections from './sections/sections.reducer';
import * as fromQuestions from './questions/questions.reducer';
import * as fromHelpCenter from './help-center/help-center.reducer';
import * as fromQuote from './quote/quote.reducer';

export interface State {
	productConfig: fromProductConfig.State;
	pages: fromPages.State;
	stages: fromStages.State;
	sections: fromStages.State;
	questions: fromQuestions.State;
	helpCenter: fromHelpCenter.State;
	quotes: fromQuote.State;
};

const reducers = {
	productConfig: fromProductConfig.reducer,
	pages: fromPages.reducer,
	stages: fromStages.reducer,
	sections: fromSections.reducer,
	questions: fromQuestions.reducer,
	helpCenter: fromHelpCenter.reducer,
	quotes: fromQuote.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
export const testingReducer: ActionReducer<State> = compose(combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	if (environment.production) {
		return productionReducer(state, action);
	} else if (environment.test) {
		return testingReducer(state, action);
	} else {
		return developmentReducer(state, action);
	}
}

/**
 * Stages Functions
 */

export function getStagesState(state$: Observable<State>) {
	return state$.select(state => state.stages);
}
export const getAllStages = compose(fromStages.getAllStages, getStagesState);
export const getActiveStage = compose(fromStages.getActiveStage, getStagesState);





/**
 * Pages Functions
 */

export function getPagesState(state$: Observable<State>) {
	return state$.select(state => state.pages);
}
export const getPageEntites = compose(fromPages.getPageEntities, getPagesState);
export const getActivePage = compose(fromPages.getActivePage, getPagesState);


/**
 * Question Functions
 */

export function getQuestionState(state$: Observable<State>) {
	return state$.select(state => state.questions);
}

const getQuestionEntities = compose(fromQuestions.getQuestionEntities, getQuestionState);

export const getQuestionEntitiesWithSubFields = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getQuestionEntities),
	).map(([questions]) => {
		let mappedQuestions = _.map(questions, (question: QuestionBase<any>) => {
			return _.assign({}, question, {
				fields: _.map(question['fields'], (e: any) => {
					return questions[e];
				})
			});
		});
		return _.keyBy(mappedQuestions, (e: SectionObject) => { return e.id; });
	});
};

const getQuestionEntitiesWithValues = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getQuestionEntities),
	).map(([questions]) => {
		let mappedQuestions = _.map(questions, (question: QuestionBase<any>) => {
			return _.assign({}, question, {
				fields: _.map(question['fields'], (e: any) => {
					return questions[e];
				})
			});
		});
		return _.keyBy(mappedQuestions, (e: SectionObject) => { return e.id; });
	});
};

/**
 * Section Functions
 */

export function getSectionsState(state$: Observable<State>) {
	return state$.select(state => state.sections);
}

export const getSectionEntities = compose(fromSections.getSectionEntities, getSectionsState);

/**
 * Quote Reducer
 */

export function getQuotesState(state$: Observable<State>) {
	return state$.select(state => state.quotes);
}

export const getCurrentQuote = compose(fromQuote.getCurrentQuote, getQuotesState);
export const getActiveProduct = compose(fromQuote.getActiveProduct, getQuotesState);


/**
 * Product Config Functions
 */
export function getProductConfigState(state$: Observable<State>) {
	return state$.select(s => s.productConfig);
}

export const getConfigLoaded = compose(fromProductConfig.getLoaded, getProductConfigState);


/**
 *	Help Center Functions
 */

export function getHelpCenterState(state$: Observable<State>) {
	return state$.select(s => s.helpCenter);
}

const getHelpEntities = compose(fromHelpCenter.getHelpEntities, getHelpCenterState);
const getActiveHelpId = compose(fromHelpCenter.getActiveHelpId, getHelpCenterState);

export const getActiveHelpEntity = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getHelpEntities),
		state$.let(getActiveHelpId)
	).map(([entities, id]) => {
		return _.find(entities, (e: any) => { return e.id === id; });
	});
};


/**
 *	Combo Reducers
 */


export const getAllStagesWithPages = function (state$: Observable<State>): Observable<Stage[]> {
	return combineLatest(
		state$.let(getAllStages),
		state$.let(getPageEntites)
	).map(([stages, pages]) => {
		let mappedPages: any = _.map(stages, (stage: Stage) => {
			return _.assign({}, stage, {
				pages: _.map(stage.pages, (page: string) => {
					return pages[page];
				})
			});
		});
		return mappedPages;
	});
};


export const getSectionEntitiesWithQuestions = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getSectionEntities),
		state$.let(getQuestionEntitiesWithSubFields)
	).map(([sections, questions]) => {
		let sects: any = sections;
		let nSections = _.map(sects, (section: SectionObject) => {
			let newSection = _.assign({}, section, {
				questions: _.map(section.questions, (e: any) => {
					return questions[e];
				})
			});
			return newSection;
		})
		return _.keyBy(nSections, (e: SectionObject) => { return e.id; });
	})
}


export const getSectionsWithQuestionValues = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getSectionEntities),
		state$.let(getQuestionEntitiesWithValues)
	).map(([sections, questions]) => {
		let sects: any = sections;
		let nSections = _.map(sects, (section: SectionObject) => {
			let newSection = _.assign({}, section, {
				questions: mapQuestion(section.questions, questions)
			});
			return newSection;
		});
		return _.keyBy(nSections, (e: SectionObject) => { return e.id; });
	})
}

function mapQuestion(sectionQuestionIds, questions) {
	let q = {};
	_.forEach(sectionQuestionIds, (questionId: string) => {
		q[questions[questionId].key] = questions[questionId].value;
		if (questions[questionId].fields.length > 0) {
			q[questions[questionId].key] = mapQuestion(_.map(questions[questionId].fields, (e: any) => e.id), questions);
		}
	});
	return q;
}



export const getSectionEntitiesByPage = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getActivePage),
		state$.let(getSectionEntitiesWithQuestions)
	).map(([page, sections]) => {
		if (!page) {
			return;
		}
		return _.map(page.sections, (e: string) => {
			return sections[e];
		});
	});
};


export const getPagesWithQuestionValues = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getPageEntites),
		state$.let(getSectionsWithQuestionValues)
	).map(([pages, sections]) => {
		return _.map(pages, (page: Page) => {
			let completeSections = _.map(page.sections, (section: string) => {
				return sections[section];
			});
			return _.assign({}, page, { sections: completeSections });
		});
	});
};

export const getSummaryPagesWithQuestions = function (state$: Observable<State>) {
	return combineLatest(
		state$.let(getAllStages),
		state$.let(getPageEntites),
		state$.let(getSectionEntitiesWithQuestions)
	).map(([stages, pages, sections]) => {
		console.log(stages);

		let filteredPages = _.filter(pages, (page) => {
			return _.find(stages[0].pages, (pg: string) => pg === page.id);
		});

		console.log(filteredPages);
		return _.map(filteredPages, (page: Page) => {
			let completeSections = _.map(page.sections, (section: string) => {
				return sections[section];
			});
			return _.assign({}, page, { sections: completeSections });
		});
	});
};