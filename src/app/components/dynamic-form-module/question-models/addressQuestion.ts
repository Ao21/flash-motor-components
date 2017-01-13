import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class AddressQuestion extends QuestionBase<any> {
	key: string;
	fields?: QuestionBase<any>[];
	questions?: QuestionBase<any>[];
	constructor(options: {} = {}) {
		super(options);
		this.fields = isPresent(options['fields']) ? options['fields'] : undefined;
	}
}
