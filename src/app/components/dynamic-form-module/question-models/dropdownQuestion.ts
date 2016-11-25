import { QuestionBase } from './questionBase';

export class DropdownQuestion extends QuestionBase<string> {
	controlType = 'dropdown';
	placeholder: string;
	options: string[] = [];

	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || 'Select Here';
		this.options = options['options'] || [];
	}
}