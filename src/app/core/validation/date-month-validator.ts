import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

export function validMonthValidate(c: FormControl) {
	let Month = parseFloat(c.value);
	return (Month >= 1 && Month <= 12) ? null : { invalidMonth: true };
}

function validMonthFactory() {
	return validMonthValidate;
}

@Directive({
	selector: '[validMonthValidate][ngModel],[validMonthValidate][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidMonthValidatorDirective), multi: true }
	]
})
export class ValidMonthValidatorDirective {

	validator: Function;

	constructor() {
		this.validator = validMonthFactory();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
