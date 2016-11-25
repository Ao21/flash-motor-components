import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class CounterQuestion extends QuestionBase<string> {
	controlType = 'counter';
	min: number;
	max: number;

	constructor(options: {} = {}) {
		super(options);
		this.min = isPresent(options['min']) ? options['min'] : null;
		this.max = isPresent(options['max']) ? options['max'] : null;
	}
}
