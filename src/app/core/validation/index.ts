export * from './date-day-validator';
export * from './date-month-validator';
export * from './date-year-validator';
export * from './date-validator';

import { validDateValidate } from './date-validator';
import { validOverEighteenValidate } from './over-eighteen-validator';
import { validPhoneNumberValidate } from './phone-number-validator';

export class CustomValidators {
	static validDateValidate() {
		return validDateValidate;
	};
	static validOverEighteenValidate() {
		return validOverEighteenValidate;
	}
	static validPhoneNumberValidate() {
		return validPhoneNumberValidate;
	}
}