import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import {
	QuestionBase,
	TextBox,
	DropdownQuestion,
	DateQuestion,
	CounterQuestion,
	QuestionText,
	AutocompleteQuestion,
	RadioQuestion,
	SliderQuestion
} from './../components/dynamic-form-module/question-models/index';

@Injectable()
export class QuestionControlService {
	constructor(
		private http: Http
	) { }


	createQuestionsFromJSON(questions) {
		let qArr: QuestionBase<any>[] = [];
		questions.forEach(question => {
			qArr.push(this.toQuestion(question));
		});
		return qArr.sort((a, b) => a.order - b.order);
	}

	toQuestion(question): TextBox | CounterQuestion | QuestionText | DateQuestion | DropdownQuestion | AutocompleteQuestion {
		switch (question.type) {
			case 'tel':
			case 'text':
			case 'email':
				return this.createTextQuestion(question);
			case 'counter':
				return this.createCounterQuestion(question);
			case 'questionText':
				return this.createQuestionText(question);
			case 'date':
				return this.createDateQuestion(question);
			case 'dropdown':
				return this.createdropDownQuestion(question);
			case 'autocomplete':
				return this.createAutoCompleteQuestion(question);
			case 'radio':
				return this.createRadioButton(question);
			case 'slider':
				return this.createSliderQuestion(question);
			default:
				throw new Error('No model found for this question');
		}
	}

	createAutoCompleteQuestion(question: AutocompleteQuestion) {
		return new AutocompleteQuestion(question);
	}

	createdropDownQuestion(question: DropdownQuestion) {
		return new DropdownQuestion(question);
	}

	createRadioButton(question: RadioQuestion) {
		return new RadioQuestion(question);
	}

	createQuestionText(question: QuestionText) {
		return new QuestionText(question);
	}

	createSliderQuestion(question: SliderQuestion) {
		return new SliderQuestion(question);
	}

	createTextQuestion(question: TextBox) {
		return new TextBox(question);
	}

	createCounterQuestion(question: CounterQuestion) {
		return new CounterQuestion(question);
	}

	createDateQuestion(question: DateQuestion) {
		return new DateQuestion(question);
	}


	toFormGroup(questions: QuestionBase<any>[]) {
		if (!questions) {
			return;
		}
		let group: any = {};

		questions.forEach(question => {
			if (question.required && !question.validators) {
				group[question.key] = new FormControl(question.value || '', Validators.required)
			} else if (question.required && question.validators) {
				group[question.key] = new FormControl(question.value || '', Validators.compose([Validators.required].concat(question.validators)));
			} else if (!question.required && question.validators) {
				group[question.key] = new FormControl(question.value || '', question.validators);
			} else {
				group[question.key] = new FormControl(question.value || '');
			}

		});

		return new FormGroup(group);
	}
}
