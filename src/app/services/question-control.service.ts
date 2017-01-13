import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPresent } from '@angular/core/src/facade/lang';
import * as _ from 'lodash';


import { Store } from '@ngrx/store';
import * as AppState from './../stores/reducer';
import * as questions from './../stores/questions/questions.actions';

import {
	QuestionBase,
	TextBox,
	DropdownQuestion,
	DateQuestion,
	CounterQuestion,
	QuestionText,
	AutocompleteQuestion,
	RadioQuestion,
	SliderQuestion,
	ClaimQuestion,
	CurrencyQuestion,
	PenaltyQuestion,
	AddressQuestion,
	GroupQuestion,
	CheckboxQuestion
} from './../components/dynamic-form-module/question-models/index';

@Injectable()
export class QuestionControlService {
	_currentQ: QuestionBase<any>;
	_currentSection: string;
	_currentQArr = {};

	questionDict: {};

	constructor(
		private store: Store<AppState.State>
	) { }

	createQuestion(question, sectionId) {
		this._currentQ = question;
		console.log(question);
		return this.toQuestion(question, sectionId);
	}

	createQuestions(questions, sectionId) {
		this._currentSection = sectionId;
		if (!questions) {
			return [];
		}
		let qArr: QuestionBase<any>[] = [];
		_.forEach(questions, q => {
			this._currentQ = q;
			qArr.push(this.toQuestion(q, sectionId));
		});
		return qArr.sort((a, b) => a.order - b.order);
	}

	getQuestionsByKey(questionKeys: string[]): any {
		let qKD = _.reduce(questionKeys, (hash, e) => {
			hash[e] = true;
			return hash;
		}, {});
		return this.store.let(AppState.getQuestionEntitiesWithSubFields)
			.distinctUntilChanged()
			.take(1)
			.flatMap((dict) => { return _.values(dict); })
			.filter((item: any) => {
				return qKD[item.key];
			}).toArray();
	}

	toQuestion(question, sectionId): TextBox | CounterQuestion | QuestionText | DateQuestion | DropdownQuestion | AutocompleteQuestion | ClaimQuestion | SliderQuestion | CurrencyQuestion | AddressQuestion | CheckboxQuestion | GroupQuestion {
		switch (question.type) {
			case 'tel':
			case 'number':
			case 'text':
			case 'email':
				return this.createTextQuestion(question, sectionId);
			case 'currency':
				return this.createCurrencyQuestion(question, sectionId);
			case 'counter':
				return this.createCounterQuestion(question, sectionId);
			case 'questionText':
				return this.createQuestionText(question, sectionId);
			case 'date':
				return this.createDateQuestion(question, sectionId);
			case 'dropdown':
				return this.createdropDownQuestion(question, sectionId);
			case 'checkbox':
				return this.createCheckboxButton(question, sectionId);
			case 'autocomplete':
				return this.createAutoCompleteQuestion(question, sectionId);
			case 'radio':
				return this.createRadioButton(question, sectionId);
			case 'slider':
				return this.createSliderQuestion(question, sectionId);
			case 'claim':
			case 'penalty':
			case 'group':
				return this.createGroupQuestion(question, sectionId);
			default:
				throw new Error('No model found for this question');
		}
	}


	createAddressQuestion(question: AddressQuestion, sectionId) {
		let q = new AddressQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		q.fields = this.createQuestions(q.fields, q.id);
		q.fields = _.map(q.fields, (e: any) => {
			return e.id;
		});
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createGroupQuestion(question, sectionId: string) {
		let q = new GroupQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		q.fields = this.createQuestions(q.fields, q.id);
		q.fields = _.map(q.fields, (e: any) => {
			return e.id;
		});
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}


	createCurrencyQuestion(question: CurrencyQuestion, sectionId: string) {
		let q = new CurrencyQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createClaimsQuestion(question: ClaimQuestion, sectionId: string) {
		let q = new ClaimQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		q.fields = this.createQuestions(q.fields, q.id);
		q.fields = _.map(q.fields, (e: any) => {
			return e.id;
		});
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createPenaltyQuestion(question: PenaltyQuestion, sectionId: string) {
		let q = new PenaltyQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		q.fields = this.createQuestions(q.fields, q.id);
		q.fields = _.map(q.fields, (e: any) => {
			return e.id;
		});
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}
	createAutoCompleteQuestion(question: AutocompleteQuestion, sectionId: string) {
		let q = new AutocompleteQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createdropDownQuestion(question: DropdownQuestion, sectionId: string) {
		let q = new DropdownQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createCheckboxButton(question: RadioQuestion, sectionId: string) {
		let q = new CheckboxQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createRadioButton(question: RadioQuestion, sectionId: string) {
		let q = new RadioQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createQuestionText(question: QuestionText, sectionId: string) {
		let q = new QuestionText(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createSliderQuestion(question: SliderQuestion, sectionId: string) {
		let q = new SliderQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createTextQuestion(question: TextBox, sectionId: string) {
		let q = new TextBox(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createCounterQuestion(question: CounterQuestion, sectionId: string) {
		let q = new CounterQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}

	createDateQuestion(question: DateQuestion, sectionId: string) {
		let q = new DateQuestion(question);
		q.id = `${sectionId}-${question.key}`;
		this.store.dispatch(new questions.AddQuestionAction({ id: q.id, value: q }));
		return q;
	}


	toFormGroup(questions: QuestionBase<any>[]) {

		if (!questions) {
			throw (new Error('No Questions Found to create a form with'));
		}
		let group: any = {};

		let subGroup = [];

		questions.forEach(question => {

			let qValue = isPresent(question.value) ? question.value : '';

			if (question.fields && question.fields.length > 0) {
				subGroup.push({ group: this.toFormGroup(question.fields), key: question.key });
			} else {
				if (question.required && !question.validators) {
					group[question.key] = new FormControl(qValue, Validators.required)
				} else if (question.required && question.validators) {
					group[question.key] = new FormControl(qValue, Validators.compose([Validators.required].concat(question.validators)));
				} else if (!question.required && question.validators) {
					group[question.key] = new FormControl(qValue, question.validators);
				} else {
					group[question.key] = new FormControl(qValue);
				}
				group[question.key].id = question.id;
			}

		});

		let formGroup = new FormGroup(group);
		subGroup.forEach((e: any) => {
			formGroup.addControl(e.key, e.group);
		});

		return formGroup;
	}

	mapSectionsAndNormaliseQuestions = (result) => {
		let _result = _.assign({}, result);
		_.forIn(_result.entities.sections, (section: SectionObject, key) => {
			let sectionQuestions = this.createQuestions(section['fields'], section.id);
			let questionIdArr = [];
			delete _result.entities.sections[key]['fields'];
			_.forIn(sectionQuestions, (e: QuestionBase<any>, k) => {
				questionIdArr.push([e.id]);
			});
			_result.entities.sections[key].questions = _.map(sectionQuestions, (e) => {
				return e.id;
			});
		});
		return _result;
	}

}
