import {
	NgModule,
	ModuleWithProviders,
} from '@angular/core';

import { QuestionControlService } from './question-control.service';
import { QuestionTriggerService} from './question-trigger.service';
import { TimelineControlService } from './timeline-control.service';
import { SectionControlService } from './section-control.service';
import { ProductConfigService } from './product-config.service';
import { ClaimsControlService } from './claims-control.service';
import { PenaltiesControlService } from './penalties-control.service';
import { HelpCenterService } from './help-center.service';
import { CarControlService } from './car-control.service';
import { StageManagerService } from './stage-manager.service';
import { ErrorService } from './error.service';
import { PaymentControlService } from './payment-control.service';
import { QuoteControlService } from './quote-control.service';
import { CrossSellService } from './cross-sell.service';

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
				ProductConfigService,
				ClaimsControlService,
				PenaltiesControlService,
				HelpCenterService,
				CarControlService,
				StageManagerService,
				ErrorService,
				PaymentControlService,
				QuoteControlService,
				CrossSellService
			]
		};
	}
}
