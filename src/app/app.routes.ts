import { Routes, RouterModule } from '@angular/router';

import { TextBoxComponent } from './sections/text-box/text-box.component';
import { RadioButtonComponent } from './sections/radio-buttons/radio-buttons.component';
import { QuestionTestComponent } from './sections/question-text/question-text.component';
import { PhoneNumberComponent} from './sections/phone-number/phone-number.component';
import { NumberSliderComponent} from './sections/number-slider/number-slider.component';

import { AutoCompleteComponent } from './sections/autocomplete/autocomplete.component';
import { DateofBirthComponent } from './sections/date-of-birth/date-of-birth.component';
import { DropdownComponent } from './sections/dropdown/dropdown.component';
import { EmailBoxComponent } from './sections/email-box/email-box.component';
import { NumberBoxComponent } from './sections/number-box/number-box.component';

import { GUARD_MODULES } from './core/guards/guard-modules';
import { RESOLVE_MODULES } from './core/resolve/resolve-modules';

const APP_ROUTES: Routes = [
	{ path: 'text-input', component: TextBoxComponent },
	{ path: 'radio-button', component: RadioButtonComponent },
	{ path: 'question-text', component: QuestionTestComponent },
	{ path: 'phone-number', component: PhoneNumberComponent },
	{ path: 'number-slider', component: NumberSliderComponent },
	{ path: 'number-input', component: NumberBoxComponent },
	{ path: 'date-of-birth', component: DateofBirthComponent },
	{ path: 'email-input', component: EmailBoxComponent },
	{ path: 'dropdown', component: DropdownComponent },
	{ path: 'autocomplete', component: AutoCompleteComponent }
];

export const APP_ROUTING_PROVIDERS: any[] = [
	...GUARD_MODULES,
	...RESOLVE_MODULES
];

export const routing = RouterModule.forRoot(APP_ROUTES);
