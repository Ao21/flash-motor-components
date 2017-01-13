import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class TextBox extends QuestionBase<string> {
	controlType = 'textbox';
	type: string;
	autocapitalize: string;
	autocomplete: string;
	autocorrect: string;
	placeholder: string;

	// Text Area Fields
	rows: number = null;
	cols: number = null;
	wrap: 'soft' | 'hard' = null;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || 'text'; // text | number | email
		this.autocapitalize = options['autocapitalize'] || 'sentences';
		this.autocorrect = options['autocorrect'] || '';
		this.autocomplete = options['autocomplete'] || '';
		this.placeholder = options['placeholder'] || '';
	}
}
