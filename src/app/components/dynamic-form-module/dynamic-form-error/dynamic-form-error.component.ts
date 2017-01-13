import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorService, ERRORS } from './../../../services/error.service';
import { isPresent } from '@angular/core/src/facade/lang';
import { errorAnimations } from './dynamic-form-error.animations';
import * as _ from 'lodash';

@Component({
	selector: 'df-dynamic-form-error',
	templateUrl: './dynamic-form-error.component.html',
	styleUrls: ['./dynamic-form-error.component.scss'],
	animations: errorAnimations
})
export class DynamicFormErrorComponent implements OnInit {
	@Input() control: FormControl;
	errors: string[] = [];

	constructor(
		private errorService: ErrorService
	) {
		this.errors = ERRORS;
	}

	get errorMessage() {
		if (isPresent(this.control) && this.control.touched) {
			for (let i = 0; i < this.errors.length; ++i) {
				if (this.control.hasError(this.errors[i])) {
					return this.errorService.getFieldError(this.errors[i]);
				}
			}
		}
		return null;
	}

	ngOnInit() { }

}
