import { QuestionBase } from './questionBase';

export class CurrencyQuestion extends QuestionBase<string> {
	controlType = 'currency';
	type: string;
	placeholder: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = 'number';
		this.placeholder = options['placeholder'] || '';

	}
}
