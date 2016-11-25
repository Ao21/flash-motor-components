import { Directive, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { Shape, easing, Timeline } from 'mo-js';
import { FormControl } from '@angular/forms';


@Directive({
	selector: '[autocompleteIcon]'
})
export class AutocompleteIconDirective implements OnInit {
	@Input('autocompleteIcon') control: FormControl;

	mojsContainer: HTMLElement;
	timelineShape: Shape;
	timeline: Timeline = new Timeline();

	constructor(
		private renderer: Renderer,
		private el: ElementRef
	) { }

	ngOnInit() {
		this.control.valueChanges.map((val) => {
			return val === '' ? false : true;
		}).distinctUntilChanged().subscribe((isDirty) => {
			if (isDirty) {
				this.createPencil();
			} else {
				this.removePencil();
			}
			});

		let search  = new Shape({
			shape: 'search',
			isShowStart: true,
			parent: this.el.nativeElement,
			fill: '#9A9B9A',
			radius: 8,
			scale: 1,
		}).then({
			scale: 0,
		})

		let pencil = new Shape({
			shape: 'pencil',
			parent: this.el.nativeElement,
			fill: '#9A9B9A',
			isShowEnd: true,
			radius: 8,
			scale: 0
		}).then({
			scale: 1
		})

		this.timeline.add(search, pencil);
	}

	createPencil() {
		this.timeline.play();
	}

	removePencil() {
		this.timeline.playBackward();
	}

}
