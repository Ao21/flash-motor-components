import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validOverEighteenValidate(c: FormControl) {
	let dateOfBirth = moment(c.value, 'DD/MM/YYYY');
	return (moment().diff(dateOfBirth, 'years') >= 18) ? null : { invalidYear: true };
}

function validOverEighteenFactory() {
	return validOverEighteenValidate;
}

@Directive({
	selector: '[validOverEighteen][ngModel],[validOverEighteen][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidYearValidatorDirective), multi: true }
	]
})
export class ValidYearValidatorDirective {

	validator: Function;

	constructor() {
		this.validator = validOverEighteenFactory();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
