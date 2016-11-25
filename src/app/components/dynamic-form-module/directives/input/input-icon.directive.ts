import { Directive, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { Shape } from 'mo-js';
import { FormControl } from '@angular/forms';
@Directive({
	selector: '[inputIcon]'
})
export class InputIconDirective implements OnInit {
	@Input('inputIcon') control: FormControl;
	@Input('formControlName') name: string;

	mojsContainer: HTMLElement;
	timelineShape: Shape;

	constructor(
		private renderer: Renderer,
		private el: ElementRef
	) { }

	ngOnInit() {
		let div = document.createElement('div')
		div.className = `input-icon-status input-icon-status--${this.name || 'default'}`;
		this.mojsContainer = this.el.nativeElement.parentNode.insertBefore(div, this.el.nativeElement.nextSibling);
		this.control.valueChanges.map((val) => {
			return val === '' ? false : true;
		}).distinctUntilChanged().subscribe((isDirty) => {
			if (isDirty) {
				this.createPencil();
			} else {
				this.removePencil();
			}
		});

		this.timelineShape = new Shape({
			shape: 'pencil',
			parent: this.mojsContainer,
			fill: '#9A9B9A',
			radius: 8,
			scale: { 0: 1 },
		});
	}

	createPencil() {
		this.timelineShape.play();
	}

	removePencil() {
		this.timelineShape.playBackward();
	}

}
