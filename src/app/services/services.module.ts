import {
	NgModule,
	ModuleWithProviders,
} from '@angular/core';

import { QuestionControlService } from './question-control.service';
import { QuestionTriggerService} from './question-trigger.service';
import { TimelineControlService } from './timeline-control.service';
import { SectionControlService } from './section-control.service';
import { ProductConfigService } from './product-config.service';

@NgModule({
	imports: [],
	declarations: [],
	exports: []
})
export class SharedServicesModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedServicesModule,
			providers: [
				QuestionTriggerService,
				QuestionControlService,
				TimelineControlService,
				SectionControlService,
				ProductConfigService
			]
		};
	}
}
