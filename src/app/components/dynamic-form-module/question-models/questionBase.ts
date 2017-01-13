import { isPresent } from '@angular/core/src/facade/lang';
import { ValidatorFn } from '@angular/forms';
import { coerceNumberProperty } from './../../../core/coersion/number-property';
import { Utils } from './../../../core/utils/utils';

export class QuestionBase<T> {
	value?: T;
	id?: string;
	key: string;
	label: string;
	required: boolean;
	order: number;
	helpId?: number;
	controlType?: string;
	validators?: ValidatorFn[];
	timeline?: boolean;
	trigger?: any;
	disabled?: boolean;
	fields?: any;
	uiOptions?: any;
	control: any;

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
		helpId?: number;
		uiOptions?: any;
		disabled?: boolean;
	} = {}) {
		this.value =  isPresent(options.value) ? options.value : null;
		this.key = options.key || '';
		this.label = options.label || '';
		this.helpId = isPresent(options.helpId) ? coerceNumberProperty(options.helpId) : undefined;
		this.order = options.order === undefined ? 1 : options.order;
		this.required = options.required || false;
		this.validators = isPresent(options.validators) ? Utils.retrieveValidator(options.validators) : [];
		this.controlType = options.controlType || '';
		this.timeline = isPresent(options.timeline) ? options.timeline : true;
		this.disabled = options.disabled === undefined ? false : options.disabled;
		this.trigger = options.trigger === undefined ? undefined : options.trigger;
		this.uiOptions = options.uiOptions === undefined ? { } : options.uiOptions;
	}
}
