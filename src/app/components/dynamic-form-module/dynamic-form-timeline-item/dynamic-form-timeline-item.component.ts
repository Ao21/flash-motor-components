import { Component, OnInit, ElementRef, Input, OnChanges } from '@angular/core';
import { Shape } from 'mo-js';
import { COLORS } from './../../../constants';
import { Utils } from './../../../core/utils/utils';

@Component({
	selector: 'df-timeline-item',
	templateUrl: './dynamic-form-timeline-item.component.html',
	styleUrls: ['./dynamic-form-timeline-item.component.scss']
})
export class DynamicFormTimelineItemComponent implements OnInit, OnChanges {
	@Input() status: string;
	@Input() pristine: string;
	timelineShape: Shape;
	infoIcon = `<path d="M12.5,24.56A12.06,12.06,0,1,0,.44,12.5,12.07,12.07,0,0,0,12.5,24.56ZM2.94,12.5a9.56,9.56,0,1,1,9.56,9.56A9.57,9.57,0,0,1,2.94,12.5Z" transform="translate(-0.44 -0.44)"/>
	<path d="M12.5,9.48A1.47,1.47,0,0,0,11,10.94v8a1.47,1.47,0,0,0,2.93,0v-8A1.47,1.47,0,0,0,12.5,9.48Z" transform="translate(-0.44 -0.44)"/>
	<path d="M12.5,7.83h0a1.68,1.68,0,1,0-1.69-1.68A1.69,1.69,0,0,0,12.5,7.83Z" transform="translate(-0.44 -0.44)"/>`;

	lastColor: string = COLORS.medLightGrey;

	isPlaying: boolean = false;
	currentPosition: number;

	constructor(
		private el: ElementRef
	) { }

	ngOnInit() {
		let element: any = this.el.nativeElement.querySelector('.shape');
		this.timelineShape = new Shape({
			x: 0,
			y: 0,
			delay: 300,
			fill: this.getColorByStatus(this.status),
			duration: 350,
			parent: element,
			shape: 'info',
			radius: 10,
			scale: { 0: 1 },
			onStart: () => {
				this.isPlaying = true;
			},
			onComplete: () => {
				this.isPlaying = false;
			}
		});

		this.timelineShape.play();

	}

	ngOnChanges(_) {
		if (_.status) {
			this.updateStatus(this.status);
		}
	}


	getColorByStatus(status?: string) {
		status = status || this.status;
		if (this.pristine && status !== 'VALID') {
			return COLORS.medLightGrey;
		}
		switch (status) {
			case 'INVALID':
				return COLORS.redWarning;
			case 'VALID':
				return COLORS.primary;
			default:
				return COLORS.medLightGrey;
		}
	}


	updateStatus(status: string) {
		if (!this.timelineShape) {
			return;
		}
		if (this.pristine) {
			return this.setStatusNeutral();
		}
		switch (status) {
			case 'VALID':
				this.setStatusValid();
				break;
			case 'INVALID':
				this.setStatusInvalid();
				break;
			default:
				this.setStatusNeutral();
				break;
		}
	}

	setStatusNeutral() {
		this.timelineShape.pause().setProgress(1).then({
			scale: 1,
			fill: { [this.lastColor]: [COLORS.medLightGrey] },
		}).play();
		this.lastColor = COLORS.medLightGrey;
	}

	setStatusValid() {
		this.timelineShape.pause().setProgress(1).then({
			scale: 1,
			fill: { [this.lastColor]: [COLORS.primary] },
		}).play();
		this.lastColor = COLORS.primary;
	}

	setStatusInvalid() {
		this.timelineShape.pause().setProgress(1).then({
			scale: 1,
			fill: { [this.lastColor]: [COLORS.redWarning] },
		}).play();
		this.lastColor = COLORS.redWarning;
	}

}
