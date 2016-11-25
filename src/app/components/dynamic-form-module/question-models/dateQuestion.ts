import { QuestionBase } from './questionBase';

export class DateQuestion extends QuestionBase<string> {
	controlType = 'date';
	constructor(options: {} = {}) {
		super(options);
	}
}
