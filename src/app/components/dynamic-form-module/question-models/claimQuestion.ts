import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class ClaimQuestion extends QuestionBase<any> {
	isEditing: boolean;
	isComplete: boolean;
	key: string;
	fields?: QuestionBase<any>[];
	constructor(options: {} = {}) {
		super(options);
		this.fields = isPresent(options['fields']) ? options['fields'] : undefined;
		this.isComplete = isPresent(options['isComplete']) ? options['isComplete'] : false;
	}
}
