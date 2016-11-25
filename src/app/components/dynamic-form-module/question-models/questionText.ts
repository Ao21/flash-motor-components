import { QuestionBase } from './questionBase';

export class QuestionText extends QuestionBase<string> {
	controlType = 'questionText';
	content: string;

	constructor(options: {} = {}) {
		super(options);
		this.content = options['content'] || [];

	}
}
