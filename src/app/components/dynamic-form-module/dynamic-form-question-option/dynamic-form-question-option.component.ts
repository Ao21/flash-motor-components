import { Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { ENTER, SPACE } from './../../../core/keyboard/keycodes';

let _uniqueIdCounter = 0;

@Component({
	selector: 'df-option',
	templateUrl: './dynamic-form-question-option.component.html',
	styleUrls: ['./dynamic-form-question-option.component.scss']
})

export class DynamicFormQuestionOptionComponent implements OnInit {
	private _selected = false;


	@HostBinding('attr.role') get role() {
		return 'option';
	}

	@HostBinding('attr.tabindex') get tabIndex() {
		return '0';
	}

	@HostBinding('class.selected') get classSelected() {
		return this._selected;
	}

	@HostBinding('attr.aria-selected') get ariaSelected() {
		return this._selected;
	}
	@Input() value: any;
	@Input() highlight: any;
	@Output() onSelect = new EventEmitter();

	constructor(private _element: ElementRef, private _renderer: Renderer) { }

	get selected(): boolean {
		return this._selected;
	}

	get viewValue(): string {
		return this._getHostElement().textContent.trim();
	}

	select(): void {
		this._selected = true;
		this.onSelect.emit();
	}

	deselect(): void {
		this._selected = false;
	}

	focus(): void {
		this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
	}

	/** Ensures the option is selected when activated from the keyboard. */
	@HostListener('keydown', ['$event'])
	_handleKeydown(event: KeyboardEvent): void {
		if (event.keyCode === ENTER || event.keyCode === SPACE) {
			event.preventDefault();
			this._selectViaInteraction();
		}
	}

	@HostListener('click')
	_selectViaInteraction() {
		this._selected = true;
		this.onSelect.emit(true);
	}

	_getHostElement(): HTMLElement {
		return this._element.nativeElement;
	}

	ngOnInit() {
	}

}
