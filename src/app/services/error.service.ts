import { Injectable } from '@angular/core';

export const ERRORS = [
	'required'
]
const ERROR_MESSSAGES = {
	required: {
		message: "Sorry, you forgot to fill in this question."
	},
}


@Injectable()
export class ErrorService {

	constructor() { }

	getFieldError(code) {
		return ERROR_MESSSAGES[code];
	}

}
