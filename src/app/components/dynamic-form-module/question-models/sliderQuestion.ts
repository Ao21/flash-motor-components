import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';
import { coerceNumberProperty } from './../../../core/coersion/number-property';
export class SliderQuestion extends QuestionBase<number> {
	controlType = 'slider';
	min: number;
	max: number;
	steps: number;
	value: number;
	values: number[];

	constructor(options: {} = {}) {
		super(options);
		this.value = isPresent(options['value']) ? coerceNumberProperty(options['value']) : null;
		this.min = isPresent(options['min']) ? options['min'] : undefined;
		this.max = isPresent(options['max']) ? options['max'] : undefined;
		this.steps = isPresent(options['steps']) ? options['steps'] : undefined;
		this.values = isPresent(options['values']) ? options['values'] : undefined;
	}
}
