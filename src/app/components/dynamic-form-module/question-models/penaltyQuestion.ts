import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class PenaltyQuestion extends QuestionBase<any> {
	fields: QuestionBase<any>[];
	isEditing: boolean;
	isComplete: boolean;
	key: string;
	constructor(options: {} = {}) {
		super(options);
		this.fields = isPresent(options['fields']) ? options['fields'] : undefined;
		this.isComplete = isPresent(options['isComplete']) ? options['isComplete'] : false;
	}
}
