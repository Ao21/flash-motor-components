import { Component, Output, OnInit, ElementRef, EventEmitter, HostListener, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Shape } from 'mo-js';
import { PAGEICONS} from './../../../mojs/mojs-init';
import { COLORS } from './../../../../constants';
import { Utils } from './../../../../core/utils/utils';

import { coerceNumberProperty } from './../../../../core/coersion/number-property';
import * as _ from 'lodash';

@Component({
	selector: 'timeline-item',
	templateUrl: './timeline-item.component.html',
	styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent implements OnInit {
	@Input() control: FormControl;
	@Input() question: QuestionBase<any>;
	@Input() status: string;
	@Input() pristine: string;
	@Input() shape: string = 'circle';
	@Output() onClick: EventEmitter<any> = new EventEmitter();

	@Input() fill: string = 'transparent';
	@Input() stroke: string = 'transparent';
	@Input() radius: number = 8;
	@Input() width: number;

	@Input() animate: string = 'stroke';

	_delay: number = 400;	
	@Input() 
	get delay() {
		return this._delay
	}
	set delay(v) {
		this._delay = coerceNumberProperty(v);
	}


	timelineShape: Shape;
	infoIcon = `<path d="M12.5,24.56A12.06,12.06,0,1,0,.44,12.5,12.07,12.07,0,0,0,12.5,24.56ZM2.94,12.5a9.56,9.56,0,1,1,9.56,9.56A9.57,9.57,0,0,1,2.94,12.5Z" transform="translate(-0.44 -0.44)"/>
	<path d="M12.5,9.48A1.47,1.47,0,0,0,11,10.94v8a1.47,1.47,0,0,0,2.93,0v-8A1.47,1.47,0,0,0,12.5,9.48Z" transform="translate(-0.44 -0.44)"/>
	<path d="M12.5,7.83h0a1.68,1.68,0,1,0-1.69-1.68A1.69,1.69,0,0,0,12.5,7.83Z" transform="translate(-0.44 -0.44)"/>`;

	lastColor: string;

	isPlaying: boolean = false;
	currentPosition: number;



	constructor(
		private el: ElementRef
	) {
		this.lastColor = COLORS.medLightGrey;
	}

	ngOnInit() {
		if (!PAGEICONS[this.shape]) {
			this.shape = 'circle';
		}
		if (this.control) {
			this.updateStatus(this.control['_status']);
			this.control.statusChanges.subscribe((status) => {
				this.updateStatus(status);
			})
			this.createShape();
		} else {
			this.createShape();
		}

	}

	createShape() {
		let element: any = this.el.nativeElement.querySelector('.shape');

		let SHAPE_OPTS: any = {
			x: 0,
			y: 0,
			delay: this.delay,
			fill: this.getFill(),
			stroke: this.getStroke(),
			duration: 350,
			parent: element,
			shape: this.shape,
			radius: this.radius,
			scale: { 0: 1 },
			onStart: () => {
				this.isPlaying = true;
			},
			onComplete: () => {
				this.isPlaying = false;
			}
		}

		if (this.width) {
			SHAPE_OPTS = _.assign({}, SHAPE_OPTS, {
				width: this.width,
				height: this.width
			});
		}

		if (this.question && this.question.helpId !== undefined) {
			SHAPE_OPTS = _.assign({}, SHAPE_OPTS, {
				fill: this.getStroke(),
				stroke: 'transparent',
				shape: 'info'
			});
			this.animate = 'fill';
		};

		this.timelineShape = new Shape(SHAPE_OPTS);
		this.timelineShape.play();
	}



	@HostListener('click')
	handleClickEvent() {
		if (this.question && this.question.helpId) {
			this.onClick.next('OPEN_HELP');
		}
	}

	getStroke = () => {
		if (!this.control) {
			return this.stroke;
		}

		if (this.control && this.control.pristine && !this.control.value) {
			return COLORS.medLightGrey;
		}
		switch (this.status) {
			case 'INVALID':
				return COLORS.redWarning;
			case 'VALID':
				return COLORS.primary;
			default:
				return COLORS.medLightGrey;
		}
	}


	getFill = () => {
		if (!this.control) {
			return this.fill;
		}
		return 'transparent';

	}


	updateStatus = (status: string) => {
		if (this.control && this.control.pristine && !this.control.value) {
			this.status = 'NEUTRAL';
		}
		switch (status) {
			case 'VALID':
				this.status = 'VALID';
				break;
			case 'INVALID':
				this.status = 'INVALID';
				break;
			default:
				this.status = 'NEUTRAL';
				break;
		}
		if (this.timelineShape) {
			this.updateObjectStatus();
		}
	}

	updateObjectStatus() {
		switch (this.status) {
			case 'VALID':
				this.setNewColor(COLORS.primary);
				break;
			case 'INVALID':
				this.setNewColor(COLORS.redWarning);
				break;
			default:
				this.setNewColor(COLORS.medLightGrey);
				break;
		}
	}

	setNewColor(newColor) {
		if (this.animate === 'fill') {
			this.setNewFill(newColor)
		} else {
			this.setNewStroke(newColor)
		}
	}

	setNewStroke(newColor) {
		this.timelineShape.pause().setProgress(1).then({
			scale: 1,
			stroke: { [this.lastColor]: [newColor] },
		}).play();
		this.lastColor = newColor;
	}

	setNewFill(newColor) {
		this.timelineShape.pause().setProgress(1).then({
			scale: 1,
			fill: { [this.lastColor]: [newColor] },
		}).play();
		this.lastColor = newColor;
	}
}
