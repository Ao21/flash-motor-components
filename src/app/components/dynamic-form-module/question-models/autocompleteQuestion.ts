import { QuestionBase } from './questionBase';
import { ValidatorFn } from '@angular/forms';

export class AutocompleteQuestion extends QuestionBase<AutocompleteItem> {
	controlType: string = 'autocomplete';
	serviceUrl?: string;
	options?: AutocompleteItem[] = [];
	placeholder: string;
	type?: string;

	constructor(options: {
		value?: AutocompleteItem,
		key?: string,
		options?: AutocompleteItem[],
		autoCompleteType?: string;
		placeholder?: string,
		type?: string,
		label?: string,
		serviceUrl?: string,
		required?: boolean,
		validators?: ValidatorFn[],
		order?: number,
		timeline?: boolean,
		trigger?: any,
		disabled?: boolean;
		controlType?: string
	} = {}) {
		super(options);
		this.type = options['autoCompleteType'] || 'options';
		this.serviceUrl = options['serviceUrl'] || '';
		this.options = options['options'] || [];
		this.placeholder = options['placeholder'] || 'Start typing to get a list of options';
	}
}