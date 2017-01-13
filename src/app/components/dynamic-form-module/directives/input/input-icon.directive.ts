import { Directive, AfterViewInit, Input, Renderer,  OnDestroy, ElementRef } from '@angular/core';
import { Shape } from 'mo-js';
import { FormControl } from '@angular/forms';
@Directive({
	selector: '[inputIcon]'
})
export class InputIconDirective implements AfterViewInit, OnDestroy {
	@Input('inputIcon') control: FormControl;
	@Input('formControlName') name: string;

	div: any;

	mojsContainer: HTMLElement;
	timelineShape: Shape;
	
	constructor(
		private renderer: Renderer,
		private el: ElementRef
	) { }

	ngAfterViewInit() {
		this.div = document.createElement('div');
		let element: HTMLElement = this.el.nativeElement;
		this.div.className = `input-icon-status input-icon-status--${this.name || 'default'}`;
		this.mojsContainer = this.el.nativeElement.appendChild(this.div);
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

	ngOnDestroy() {
	}

}
