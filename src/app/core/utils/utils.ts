import { Validators } from '@angular/forms';
import { CustomValidators } from './../validation/';
import { Observable } from 'rxjs/Rx';

export class Utils {
	public static resizeObs = Observable.fromEvent(window, 'resize').share();
	public static scrolling = Observable.fromEvent(window, 'scroll').share();

	public static resizeScrollingCombinationObs = Observable.combineLatest(
		Observable.fromEvent(window, 'resize'),
		Observable.fromEvent(window, 'scroll')
	).share();

	static retrieveValidator(valid: any[]) {
		let arr = [];
		valid.forEach((e) => {
			if (Validators[e]) {
				arr.push(Validators[e]);
			}
			if (CustomValidators[e]) {
				arr.push(CustomValidators[e]());
			}
		});
		return arr;
	}
}

let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unqiue"`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}