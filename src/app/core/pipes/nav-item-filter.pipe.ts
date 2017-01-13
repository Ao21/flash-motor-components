import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({ name: 'navItemFilter' })
export class NavItemFilter implements PipeTransform {

	transform(pages: Page[]) {
		return _.reject(pages, (page) => {
			return page.uiOptions.isTitleHidden;
		});
	}
}
