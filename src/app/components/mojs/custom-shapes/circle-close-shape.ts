import { CustomShape } from 'mo-js';

export class CircleCloseShape {
	leftPath: any;
	path: any;
	rightPath;

	public getLeft() {
		this.leftPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		this.leftPath.setAttributeNS(null, 'd', `M20.4,29.9c0,0,0,0,59.2,47.7c6.9,5.4,12.9,1.8,17.1-10c2.4-6.9,3.3-9.2,3.3-17.6c0-27.6-22.4-50-50-50
	C22.4,0,0,22.4,0,50s22.4,50,50,50V40`);
		return this.leftPath;
	}

	public getRight() {
		this.rightPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		this.rightPath.setAttributeNS(null, 'd', `M50,40v65c27.6,0,50-22.4,50-50S77.6,0,50,0S0,22.4,0,50c0,8.4,0.9,10.7,3.3,17.6c4.2,11.8,10.2,15.4,17.1,10
	c59.2-47.7,59.2-47.7,59.2-47.7`);
		return this.rightPath;
	}


	public getSvg() {
		this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		this.path.setAttributeNS(null, 'd', 'M49.9,94.3c-24.5,0-44.3-19.8-44.3-44.3S25.4,5.6,49.9,5.6s44.3,19.8,44.3,44.3S74.4,94.3,49.9,94.3V44.9');
		return this.path;
	}
}

export class MojoCircleCloseShape extends CustomShape {
	getShape() {
		return `<path d="M49.9,94.3c-24.5,0-44.3-19.8-44.3-44.3S25.4,5.6,49.9,5.6s44.3,19.8,44.3,44.3S74.4,94.3,49.9,94.3V44.9"/>`;
	}
}

export class MojoCircleCloseLeftShape extends CustomShape {
	getShape() {
		return `<path class="st0" d="M20.4,29.9c0,0,0,0,59.2,47.7c6.9,5.4,12.9,1.8,17.1-10c2.4-6.9,3.3-9.2,3.3-17.6c0-27.6-22.4-50-50-50
	C22.4,0,0,22.4,0,50s22.4,50,50,50V40"/>`;
	}
}

export class MojoCircleCloseRightShape extends CustomShape {
	getShape() {
		return `<path class="st0" d="M50,40v65c27.6,0,50-22.4,50-50S77.6,0,50,0S0,22.4,0,50c0,8.4,0.9,10.7,3.3,17.6c4.2,11.8,10.2,15.4,17.1,10
	c59.2-47.7,59.2-47.7,59.2-47.7"/>`;
	}
}

let circleCloseShape = new CircleCloseShape();

export const circleShapeSVG = circleCloseShape.getSvg();
export const circleShapeLeftSVG = circleCloseShape.getLeft();
export const circleShapeRightSVG = circleCloseShape.getRight();

