import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
@Component({
	selector: 'df-slider-item',
	templateUrl: './dynamic-form-question-slider-item.component.html',
	styleUrls: ['./dynamic-form-question-slider-item.component.scss']
})
export class DynamicFormQuestionNumberSliderItemComponent implements OnInit {

	/** Value of the Slider Item */
	@Input() value: any;

	/** Index of the Slider Item */
	@Input() index: number;

	/** Event Emitted on Selected Item */
	@Output() onSelect: EventEmitter<any> = new EventEmitter();

	/** Sets the active class if its set to active from the renderer */	
	private _active: boolean;
	@Input()
	set active(v) {
		this._active = v;
	}

	get active() {
		return this._active;
	}

	ngOnInit() { }


	/** Emits onSelect event on click */	
	@HostListener('click')
	emitSelect() {
		this.onSelect.next(this.index);
	}

}
