import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class TimelineControlService {

	private _timelineItems: BehaviorSubject<any> = new BehaviorSubject<TimelineItem[]>([]);
	public timelineItems: Observable<TimelineItem[]> = this._timelineItems.asObservable();

	constructor() {}

	addTimelineItems(timelineItems: TimelineItem[]) {
		this._timelineItems.next(timelineItems);
	}

	updateTimelineItems(timelineItem: TimelineItemUpdate) {
		// console.log(timelineItem);
	}
}
