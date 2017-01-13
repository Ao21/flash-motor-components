import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({ name: 'summaryQuestionFilter' })
export class SummaryQuestionFilter implements PipeTransform {

	transform(value: QuestionBase<any>[]) {
		return _.filter(value, (question) => {
			return question.uiOptions.summaryTitle;
		});
	}

}