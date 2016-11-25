import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class SliderQuestion extends QuestionBase<string> {
	controlType = 'slider';
	min: number;
	max: number;
	steps: number;
	values: number[];

	constructor(options: {} = {}) {
		super(options);
		this.min = isPresent(options['min']) ? options['min'] : undefined;
		this.max = isPresent(options['max']) ? options['max'] : undefined;
		this.steps = isPresent(options['steps']) ? options['steps'] : undefined;
		this.values = isPresent(options['values']) ? options['values'] : undefined;
	}
}
