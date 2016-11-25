import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export function validDayValidate(c: FormControl) {
	let day = parseFloat(c.value);
	return (day >= 1 && day <= 31) ? null : { invalidDay: true };
}

function validDayFactory() {
	return validDayValidate;
}

@Directive({
	selector: '[validDayValidate][ngModel],[validDayValidate][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidDayValidatorDirective), multi: true }
	]
})
export class ValidDayValidatorDirective {

	validator: Function;

	constructor() {
		this.validator = validDayFactory();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
