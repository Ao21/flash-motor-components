import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validYearValidate(c: FormControl) {
	let Year = parseFloat(c.value);
	let currentYear = parseFloat(moment().format('YYYY'));
	return (Year <= currentYear) ? null : { invalidYear: true };
}

function validYearFactory() {
	return validYearValidate;
}

@Directive({
	selector: '[validYearValidate][ngModel],[validYearValidate][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidYearValidatorDirective), multi: true }
	]
})
export class ValidYearValidatorDirective {

	validator: Function;

	constructor() {
		this.validator = validYearFactory();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
