import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { isPresent } from '@angular/core/src/facade/lang';

export function validPhoneNumberValidate(c: FormControl) {
	let re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
	if (isPresent(c.value) && c.value.match(re) && c.value.length <= 20) {
		return null;
	} else {
		return {
			invalidPhoneNumber: true
		};
	}
}

function validPhoneNumberFactory() {
	return validPhoneNumberValidate;
}

@Directive({
	selector: '[validPhoneNumber][ngModel],[validPhoneNumber][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidPhoneNumberValidatorDirective), multi: true }
	]
})
export class ValidPhoneNumberValidatorDirective {

	validator: Function;

	constructor() {
		this.validator = validPhoneNumberFactory();
	}

	validate(c: FormControl) {
		return this.validator(c);
	}
}
