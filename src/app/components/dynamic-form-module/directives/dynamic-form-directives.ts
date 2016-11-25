import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputIconDirective } from './input/input-icon.directive';
import { DropdownIconDirective } from './dropdown/dropdown-icon.directive';
import { AutocompleteIconDirective } from './autocomplete/autocomplete-icon.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		InputIconDirective,
		DropdownIconDirective,
		AutocompleteIconDirective
	],
	exports: [
		InputIconDirective,
		DropdownIconDirective,
		AutocompleteIconDirective
	]
})
export class DynamicFormDirectivesModule { }
