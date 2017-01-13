import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class CheckboxQuestion extends QuestionBase<boolean> {
	controlType = 'checkbox';
	options: { text: string, value: string }[] = [];
	alignment: string;
	name: string;
	indeterminate: boolean;
	value: boolean;

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
		this.name = options['name'];
		this.indeterminate = isPresent(options['indeterminate']) ? options['indeterminate'] : false;
		this.value = isPresent(options['indeterminate']) ? undefined : false;
		this.alignment = isPresent(options['alignment']) ? options['alignment'] : 'horizontal';
	}
}