import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class RadioQuestion extends QuestionBase<string> {
	controlType = 'radio';
	options: { text: string, value: string }[] = [];
	alignment: string;

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
		this.alignment = isPresent(options['alignment']) ? options['alignment'] : 'horizontal';
	}
}