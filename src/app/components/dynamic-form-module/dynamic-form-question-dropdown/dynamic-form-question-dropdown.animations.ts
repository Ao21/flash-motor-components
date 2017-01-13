import {
	animate,
	AnimationEntryMetadata,
	state,
	style,
	transition,
	trigger,
} from '@angular/core';

import { COLORS } from './../../../constants';

export const transformPanel: AnimationEntryMetadata =
	trigger('transformPanel', [
		transition('void => *', [
			style({
				transform: `translate(0, -100%)`
			}),
			animate(`330ms cubic-bezier(0.8,0,0.6,1)`,
				style({
					transform: `translate(0, 0)`
				}))
		]),
		transition('* => void', [
			style({
				transform: `translate(0, 0)`
			}),
			animate(`330ms cubic-bezier(0.8,0,0.6,1)`,
				style({ transform: `translate(0, -100%)` }))
		])
	]);

export const transformTrigger: AnimationEntryMetadata =
	trigger('triggerBorder', [
		state('false', style({})),
		state('true', style({
			borderColor: COLORS.dark,
			border: '2px solid ${COLORS.medDarkGrey}',
			borderBottom: 'none',
			borderBottomLeftRadius: '0px',
			borderBottomRightRadius: '0px'
		})),
	]);
