import {
	animate,
	AnimationEntryMetadata,
	state,
	style,
	transition,
	trigger,
} from '@angular/core';

export const transformPanel: AnimationEntryMetadata =
	trigger('transformPanel', [
		transition('void => *', [
			style({
				transform: `translate(0, -100%)`
			}),
			animate(`330ms cubic-bezier(0.8,0,0.6,1)`,
				style({transform: `translate(0, 0)`}))
		]),
		transition('* => void', [
			style({
				transform: `translate(0, 0)`
			}),
			animate(`330ms cubic-bezier(0.8,0,0.6,1)`,
				style({transform: `translate(0, -100%)`}))
		])
	]);
