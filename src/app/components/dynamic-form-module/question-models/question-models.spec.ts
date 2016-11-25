import {
	DateQuestion,
	DropdownQuestion,
	RadioQuestion,
	SliderQuestion,
	QuestionBase,
	AutocompleteQuestion,
	CounterQuestion,
	QuestionText
} from './index';

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Shape } from 'mo-js';



describe('Question Models', () => {

	describe('Base', () => {
		let questionBase = new QuestionBase({
			value: 'Hello',
			validators: [],
		});

		it('should generate a set of default properties', () => {
			expect(questionBase.key).toBe('');
			expect(questionBase.label).toBe('')
			expect(questionBase.order).toBe(1);
			expect(questionBase.required).toBeFalsy();
			expect(questionBase.validators.length).toBe(0);
			expect(questionBase.controlType).toBe('');
			expect(questionBase.timeline).toBeTruthy();
			expect(questionBase.disabled).toBeFalsy();
			expect(questionBase.trigger).toBeUndefined();
		})


	})


	describe('Autocomplete', () => {
		let autocompleteOptions: AutocompleteOptions = {
			label: 'Autocomplete Label',
			key: 'autocompleteKey',
			serviceUrl: 'http://localhost',
			required: false,
			validators: [],
			order: 0,
			placeholder: 'placeholder',
			value: { id: 'opt-1', text: 'Option1' },
			options: [
				{ id: 'opt-1', text: 'Option1' },
				{ id: 'opt-2', text: 'Option1' }
			]
		}
		
		let autocomplete = new AutocompleteQuestion(autocompleteOptions);

		it('should create an autocomplete question', () => {
			expect(autocomplete.controlType).toBe('autocomplete');
			expect(autocomplete.key).toBe('autocompleteKey');
			expect(autocomplete.placeholder).toBe('placeholder');
			expect(autocomplete.type).toBe('options');
			expect(autocomplete.options.length).toBe(2);
			expect(autocomplete.label).toBe('Autocomplete Label');
			expect(autocomplete.serviceUrl).toBe('http://localhost');
		})

	})
});
