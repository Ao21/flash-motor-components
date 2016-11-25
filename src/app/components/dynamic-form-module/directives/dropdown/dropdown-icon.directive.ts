import { Directive, OnChanges, Input, Renderer, ElementRef } from '@angular/core';
import { Shape, easing } from 'mo-js';

@Directive({
	selector: '[dropdownIcon]'
})
export class DropdownIconDirective implements OnChanges {
	private _isOpen: boolean = false;
	@Input('dropdownIcon') isOpen: boolean;
	timelineShape: Shape;

	constructor(
		private renderer: Renderer,
		private el: ElementRef
	) {
		this.timelineShape = new Shape({
			shape: 'zigzag',
			radiusY: { [-7]: 0 },
			radiusX: 7,
			duration: 150,
			isShowStart: true,
			strokeWidth: 2,
			fill: 'transparent',
			strokeLinecap: 'round',
			stroke: '#1B1918',
			parent: this.el.nativeElement,
			easing: easing.expo.in
		}).then({
			radiusY: 7,
			easing: easing.expo.out
		});
	}

	ngOnChanges() {
		if (this.isOpen !== this._isOpen) {
			if (this.isOpen) {
				this.open();
			} else {
				this.close();
			}
			this._isOpen = this.isOpen;
		}
	}

	open() {
		this.timelineShape.play();
	}

	close() {
		this.timelineShape.playBackward();
	}

}
