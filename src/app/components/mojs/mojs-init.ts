import { addShape } from 'mo-js';
import { MojoInfoShape } from './custom-shapes/info';
import { MojoPencilShape } from './custom-shapes/pencil';
import { MojoArrowDownShape } from './custom-shapes/arrows';
import { MojoSearchShape } from './custom-shapes/search';
import { MojoCircleCloseShape, MojoCircleCloseLeftShape, MojoCircleCloseRightShape } from './custom-shapes/circle-close-shape';
import { MojoTickShape } from './custom-shapes/tick';

import { GettingStartedShape, PenaltyPointShape, YourAddressShape, YourCarShape, YourCoverShape, YourClaimsShape, YourDetailsShape, YourLicenceShape } from './page-shapes/';


export const PAGEICONS = {
	'getting-started': true,
	'your-details': true,
	'your-address': true,
	'your-car': true,
	'your-cover': true,
	'your-claims': true,
	'your-licence': true,
	'your-penalties': true,
	'choose-your-product': true
};

export class MojsInit {

	constructor() {

		addShape('getting-started', GettingStartedShape);
		addShape('your-details', YourDetailsShape);
		addShape('your-address', YourAddressShape);
		addShape('your-car', YourCarShape);
		addShape('your-cover', YourCoverShape);
		addShape('your-claims', YourClaimsShape);
		addShape('your-licence', YourLicenceShape);
		addShape('your-penalties', PenaltyPointShape);

		addShape('choose-your-product', GettingStartedShape);
		addShape('choose-your-product2', GettingStartedShape);


		addShape('circleclose', MojoCircleCloseShape);
		addShape('circleCloseLeft', MojoCircleCloseLeftShape);
		addShape('circleCloseRight', MojoCircleCloseRightShape);
		addShape('info', MojoInfoShape);
		addShape('pencil', MojoPencilShape);
		addShape('arrowDown', MojoArrowDownShape);
		addShape('search', MojoSearchShape);
		addShape('tick', MojoTickShape);
	}
}