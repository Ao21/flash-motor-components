import { QuestionBase } from './questionBase';
import { isPresent } from '@angular/core/src/facade/lang';

export class GroupQuestion extends QuestionBase<any> {
	controlType = 'group';
	fields: QuestionBase<any>[];
	questions?: QuestionBase<any>[];
	alignment: string;
	isEditing: boolean;
	isComplete: boolean;
	key: string;
	constructor(options: {} = {}) {
		super(options);
		this.alignment = isPresent(options['alignment']) ? options['alignment'] : 'none';
		this.fields = isPresent(options['fields']) ? options['fields'] : undefined;
		this.isComplete = isPresent(options['isComplete']) ? options['isComplete'] : false;
	}
}
