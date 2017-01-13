import { Pipe, ChangeDetectorRef, PipeTransform, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Pipe({ name: 'abvDateMonth', pure: false })
export class AbreviatedDateMonth implements PipeTransform {
	transform(value: Date |string | any): string {
		return moment(value, 'DD/MM/YYYY').format(`MMM 'YY`);
	}
}
