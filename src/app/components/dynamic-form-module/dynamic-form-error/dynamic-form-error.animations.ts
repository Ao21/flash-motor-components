import {
	animate,
	AnimationEntryMetadata,
	state,
	style,
	transition,
	trigger,
} from '@angular/core';
export const errorAnimations: AnimationEntryMetadata[] = [
    trigger('errorDisplay', [
        transition('void => *', [
            style({ transform: 'translateY(-10%)', opacity: 0 }),
            animate('400ms ease', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition('* => void', [
            style({ transform: 'translateY(0)' }),
            animate('400ms ease', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
    ])
]