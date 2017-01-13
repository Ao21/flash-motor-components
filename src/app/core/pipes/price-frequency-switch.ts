import {
	isBlank,
} from '@angular/platform-browser/src/facade/lang';

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'priceFrequencyType'
})
export class PriceFrequencyByTypePipe implements PipeTransform {
	transform(value: any, frequency: any = 'monthly', type: any = null): any {
		if (isBlank(type) || value === "") {
			return null;
		}

		if (type === 'deposit') {
			return value[frequency].deposit.amount / 100;
		} else if (type === 'installments') {
			return value[frequency].installments.instalment.amount / 100;
		} else if (type === 'total') {
			return value[frequency].total.amount / 100;
		}
	}
}
