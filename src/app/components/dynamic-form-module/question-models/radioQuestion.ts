import { QuestionBase } from './questionBase';

export class RadioQuestion extends QuestionBase<string> {
	controlType = 'radio';
	options: string[] = [];

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
	}
}