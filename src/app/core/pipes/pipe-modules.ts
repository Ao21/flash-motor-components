import { NgModule } from '@angular/core';

import { HighlightItemPipe } from './highlight-item-pipe';
import { PriceFrequencyByTypePipe } from './price-frequency-switch';
import { CapitalizePipe } from './capitalize-pipe';
import { SummaryQuestionFilter } from './summary-filter.pipe';
import { NavItemFilter } from './nav-item-filter.pipe';

@NgModule({
	imports: [],
	declarations: [
		HighlightItemPipe,
		PriceFrequencyByTypePipe,
		CapitalizePipe,
		SummaryQuestionFilter,
		NavItemFilter
	],
	exports: [
		HighlightItemPipe,
		PriceFrequencyByTypePipe,
		CapitalizePipe,
		SummaryQuestionFilter,
		NavItemFilter
	]
})
export class PipeModules { }
