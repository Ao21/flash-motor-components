import {
	animate,
	AnimationEntryMetadata,
	state,
	style,
	transition,
	trigger,
} from '@angular/core';
export const routeAnimations: AnimationEntryMetadata[] = [
	trigger('routeAnimation', [
		state('*', style({ transform: 'translateY(0rem)', opacity: 1 })),
		// transition('void => *', [
		// 	style({ transform: 'translateY(-100vh)', opacity: 1 }),
		// 	animate('350ms 350ms')
		// ]),
		transition('* => void', [
			animate('350ms ease', style({ transform: 'translateY(-100vh)', opacity: 1 }))
		])
	]),
	trigger('routeAnimationNoDelay', [
		state('*', style({ transform: 'translateY(0rem)', opacity: 1 })),
		transition('void => *', [
			style({ transform: 'translateY(-100vh)', opacity: 1 }),
			animate('350ms')
		]),
		transition('* => void', [
			animate('350ms', style({ transform: 'translateY(100vh)', opacity: 1 }))
		])
	])
];