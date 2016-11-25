import { isPresent } from '@angular/core/src/facade/lang';
import { ValidatorFn } from '@angular/forms';

import { Utils } from './../../../core/utils/utils';

export class QuestionBase<T> {
	value?: T;
	key: string;
	label: string;
	required: boolean;
	order: number;
	controlType?: string;
	validators?: ValidatorFn[];
	timeline?: boolean;
	trigger?: any;
	disabled?: boolean;

	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		validators?: ValidatorFn[],
		order?: number,
		controlType?: string,
		timeline?: boolean,
		trigger?: any,
		disabled?: boolean;
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.order = options.order === undefined ? 1 : options.order;
		this.required = options.required || false;
		this.validators = isPresent(options.validators) ? Utils.retrieveValidator(options.validators) : [];
		this.controlType = options.controlType || '';
		this.timeline = isPresent(options.timeline) ? options.timeline : true;
		this.disabled = options.disabled === undefined ? false : options.disabled;
		this.trigger = options.trigger === undefined ? undefined : options.trigger;
	}
}
