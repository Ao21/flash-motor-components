import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from './timeline-item.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [TimelineItemComponent],
	exports: [TimelineItemComponent]
})
export class TimelineItemModule { }
