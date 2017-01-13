import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionConfirmationButtonComponent } from './section-confirmation-button/section-confirmation-button.component';
import { TimelineModule } from './timeline/timeline.module';
import { TimelineItemModule } from './timeline/timeline-item/timeline-item.module';

import {RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		TimelineModule,
		TimelineItemModule

	],
	declarations: [
		SectionConfirmationButtonComponent
	],
	exports: [
		SectionConfirmationButtonComponent,
		TimelineItemModule,
		TimelineModule
	]
})
export class NavigationModule { }
