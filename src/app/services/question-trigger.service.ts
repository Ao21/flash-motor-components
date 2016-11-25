import { Injectable } from '@angular/core';
import { TRIGGERS_DICT} from './../core/triggers/triggers';

/**
 * Question Trigger Service
 *
 * Certain form fields need extra functionality that affect other components,
 * the trigger service is what allows us to link generic components to specific
 * functions that affect other areas of the application. They are specific to each
 * indidivual field and are contained in the core folder under triggers. Each trigger
 * should have its own file.
 */

@Injectable()
export class QuestionTriggerService {

	getFormTrigger(trigger) {
		return TRIGGERS_DICT[trigger.name];
	}

}
