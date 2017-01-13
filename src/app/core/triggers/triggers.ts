import { occupation } from './occupation.trigger';
import { additionalDrivers } from './additionalDrivers.trigger';
import { hideBasedOnKey, showBasedOnKey, showDualKey, showIfKeyEquals, hideIfKeyEquals} from './hideBasedOnKey';
import { disabledBasedOnKey } from './disabledBasedOnKey';
export const TRIGGERS_DICT: any = {
	occupation: occupation,
	additionalDrivers: additionalDrivers,
	hideBasedOnKey: hideBasedOnKey,
	showBasedOnKey: showBasedOnKey,
	showDualKey: showDualKey,
	disabledBasedOnKey: disabledBasedOnKey,
	showIfKeyEquals: showIfKeyEquals,
	hideIfKeyEquals: hideIfKeyEquals
}