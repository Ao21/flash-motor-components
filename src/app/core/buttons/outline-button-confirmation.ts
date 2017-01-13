import { Directive, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import * as _ from 'lodash';

@Directive({
	selector: 'button[outline]'
})
export class ButtonOutlineDirective {
	@Input('outline') outline: any;
	@HostBinding('class.c-button--outline') get baseLine() { return this._baseLine; };
	@HostBinding('class.c-button--image-only') get image() { return this._image; };
	@HostBinding('class.c-button--outline-green') get greenOutline() { return this._greenOutline; };

	set greenOutline(p) {
		this._greenOutline = p;
	}
	set image(p) {
		this._image = p;
	}

	set baseLine(p) {
		this._baseLine = p;
	}

	@Output('onNext') onNext: EventEmitter<any> = new EventEmitter();
	evt: Event;
	// Colours
	_baseLine: boolean = true;
	_image: boolean = false;
	_greenOutline: boolean = false;

	@HostListener('click', ['$event'])
	onClick($event: Event) {
		$event.stopPropagation();
		this.evt = $event;
		if (this.outline.type) {
			this._baseLine = false;
			_.forEach(this.outline.type, (e) => {
				this[e] = true;
			});
		}
		setTimeout(() => {
			this.onNext.next($event);
		}, 300);
	}
}
