import { Directive, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { Shape, easing, Timeline } from 'mo-js';
import { coerceBooleanProperty } from './../../../../core/coersion/boolean-property';
@Directive({
	selector: '[tickIcon]'
})
export class TickDirective {
	private _isTicked: boolean = false;

	@Input('tickIcon')
	set isTicked(v) {
		this._isTicked = coerceBooleanProperty(v);
		if (this._isTicked) {
			this.setTicked();
		} else {
			this.setUnTicked();
		}
	}

	shape: Shape;
	timeline: Timeline;

	constructor(
		private renderer: Renderer,
		private el: ElementRef
	) {
		this.timeline = new Timeline();

		let circle = new Shape({
			shape: 'circle',
			radius: 9,
			className: 'shape',
			top: 0,
			fill: 'transparent',
			stroke: { '#1B1918': '#44b491'},
			parent: this.el.nativeElement,
			isShowStart: true,
			left: 0
		});

		let tick = new Shape({
			shape: 'tick',
			scale: { 0: 0.1 },
			className: 'shape',
			top: 0,
			left: 0,
			y: 2,
			isShowStart: false,
			fill: 'black',
			strokeLinecap: 'round',
			stroke: 'transparent',
			parent: this.el.nativeElement,
			easing: easing.expo.in
		});

		this.timeline.add(circle, tick);
	}

	setTicked() {
		this.timeline.play();
	}

	setUnTicked() {
		this.timeline.playBackward();
	}

}
