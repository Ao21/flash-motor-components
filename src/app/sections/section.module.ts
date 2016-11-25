import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './text-box/text-box.component';
import { RadioButtonComponent } from './radio-buttons/radio-buttons.component';
import { DynamicFormModule } from './../components/dynamic-form-module/dynamic-form-module';
import { QuestionTestComponent } from './question-text/question-text.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { NumberSliderComponent } from './number-slider/number-slider.component';
import { AutoCompleteComponent } from './autocomplete/autocomplete.component';
import { DateofBirthComponent } from './date-of-birth/date-of-birth.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { EmailBoxComponent } from './email-box/email-box.component';
import { NumberBoxComponent } from './number-box/number-box.component';
@NgModule({
	imports: [
		CommonModule,
		DynamicFormModule
	],
	declarations: [
		TextBoxComponent,
		RadioButtonComponent,
		QuestionTestComponent,
		PhoneNumberComponent,
		NumberSliderComponent,
		AutoCompleteComponent,
		DateofBirthComponent,
		EmailBoxComponent,
		DropdownComponent,
		NumberBoxComponent
	],
	exports: [
		TextBoxComponent,
		RadioButtonComponent,
		QuestionTestComponent,
		PhoneNumberComponent,
		NumberSliderComponent,
		AutoCompleteComponent,
		DateofBirthComponent,
		EmailBoxComponent,
		DropdownComponent,
		NumberBoxComponent
	]
})
export class SectionModules { }
