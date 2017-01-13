import { QuestionBase } from './questionBase';
import { ValidatorFn } from '@angular/forms';
import { isPresent } from '@angular/core/src/facade/lang';


export class AutocompleteQuestion extends QuestionBase<AutocompleteItem> {
	controlType: string = 'autocomplete';
	serviceUrl?: string;
	options?: AutocompleteItem[] = [];
	placeholder: string;
	type?: string;
	link?: string;

	constructor(options: {
		value?: AutocompleteItem,
		key?: string,
		options?: AutocompleteItem[],
		autoCompleteType?: any,
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
		link?: string;
	} = {}) {
		super(options);
		this.type = options['autoCompleteType'] || 'options';
		this.serviceUrl = options['serviceUrl'] || '';
		this.options = options['options'] || [];
		this.link = isPresent(options['link']) ? options['link'] : undefined;
		this.placeholder = options['placeholder'] || 'Start typing to get a list of options';
	}
}
