import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validDateValidate(c: FormControl) {
	let date = moment(c.value, 'DD/MM/YYYY');
	return (date.isValid()) ? null : { invalidDate: true };
}

export function validDateFactory() {
	return validDateValidate;
}

@Directive({
	selector: '[validDate][ngModel],[validDate][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidDateValidatorDirective), multi: true }
	]
})
export class ValidDateValidatorDirective {

	validator: Function;

	constructor() {
		this.validator = validDateFactory();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
