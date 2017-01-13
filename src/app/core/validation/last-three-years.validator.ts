import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import * as moment from 'moment';

export function validLastThreeYearsValidate(c: FormControl) {
	let date = moment(c.value, 'DD/MM/YYYY');
	return (moment().diff(date, 'years') <= 3) ? null : { invalidYear: true };
}

function validLastThreeYearsValidator() {
	return validLastThreeYearsValidate;
}

@Directive({
	selector: '[validLastThreeYears][ngModel],[validLastThreeYearsValidate][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidLastThreeYearsDirective), multi: true }
	]
})
export class ValidLastThreeYearsDirective {

	validator: Function;

	constructor() {
		this.validator = validLastThreeYearsValidator();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
