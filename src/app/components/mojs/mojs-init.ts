import { addShape } from 'mo-js';
import { MojoInfoShape } from './custom-shapes/info';
import { MojoPencilShape } from './custom-shapes/pencil';
import { MojoArrowDownShape } from './custom-shapes/arrows';
import { MojoSearchShape } from './custom-shapes/search';
export class MojsInit {

	constructor() {
		addShape('info', MojoInfoShape);
		addShape('pencil', MojoPencilShape);
		addShape('arrowDown', MojoArrowDownShape);
		addShape('search', MojoSearchShape);
	}
}