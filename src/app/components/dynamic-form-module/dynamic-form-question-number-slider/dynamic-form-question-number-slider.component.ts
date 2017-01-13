import { Component, HostBinding, HostListener, OnInit, forwardRef, Renderer, ViewChildren, Output, EventEmitter, Input, QueryList, AfterViewInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, FormControl } from '@angular/forms';
import { coerceNumberProperty, coerceBooleanProperty } from './../../../core/core';
import { DynamicFormQuestionNumberSliderItemComponent } from './dynamic-form-question-slider-item/dynamic-form-question-slider-item.component';
import { Subject } from 'rxjs/Rx';
import { ENTER, SPACE } from './../../../core/keyboard/keycodes';
import { isPresent } from '@angular/core/src/facade/lang';

import * as _ from 'lodash';

const noop = () => { };


/**
 * Provider Expression that allows df-slider to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */

export const DF_SLIDER_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DynamicFormQuestionNumberSliderComponent),
	multi: true
};

/** A simple change event emitted by the DFSlider component. */
export class DFSliderChange {
	source: DynamicFormQuestionNumberSliderComponent;
	value: number;
}

/**
 *	Slider Component
 *
 *	Selector: df-slider
 *	Example:
 *		<df-slider
 *			class="df-question"
 *			[formControl]="control"
 *			[isDisabled]="control.disabled"
 *			[required]="question.required"
 *			[attr.aria-label]="question.label"
 *			[attr.aria-labelledby]="question.key"
 *			[min]="question.min"
 *	      	[max]="question.max"
 *			[steps]="question.steps"
 *			[values]="question.values">
 *		</df-slider>
 *
 *	Unique Model Properties
 *		@param {number} min - The minimum slider value
 *		@param {number} max - The maximum slider value
 *		@param {number} steps - The multiplier on the slider values
 *		@param {number[]} values - Use Values instead of min/max/steps
 *	
 */

@Component({
	selector: 'df-slider',
	templateUrl: './dynamic-form-question-number-slider.component.html',
	styleUrls: ['./dynamic-form-question-number-slider.component.scss'],
	providers: [DF_SLIDER_VALUE_ACCESSOR]
})
export class DynamicFormQuestionNumberSliderComponent implements OnInit, AfterViewInit, ControlValueAccessor {

	/** Sets the tab index of the number slider if its disabled */
	@HostBinding('tabindex') get tabIndex() {
		return this.disabled ? -1 : 0;
	}
	/** Sets roles of the slider to a spinbutton */
	@HostBinding('attr.role') role: string = 'spinbutton';
	/** sets aria-disabled depending on _disabled */
	@HostBinding('attr.aria-disabled') get ariaDisabled() { return this.disabled; }
	/** sets aria-valuemax to the same as max */
	@HostBinding('attr.aria-valuemax') get ariaMax() { return this.max; };
	/** sets aria-valuemin to the same as min */
	@HostBinding('attr.aria-valuemin') get ariaMin() { return this.min; };
	/** sets aria-valuenow to the same as value */
	@HostBinding('attr.aria-valuenow') get getAriaValue() { return this.value; };


	/** creates an external renderer for the slider itself */
	private _renderer: SliderRenderer = null;
	/** The container in which the slider items will reside  */
	private sliderItemsContainer: HTMLElement;

	/** is active at slidestart, slide and set inactive at slideend */
	private isSliding: boolean = false;

	/** Sets which item is currently active */
	private isActive: boolean = false;

	/** Sets the minimum number the slider can go down to */
	private _min: number;
	@Input()
	get min() {
		return this._min;
	}
	set min(v) {
		this._min = coerceNumberProperty(v, this._min);
	}

	/** Sets the maximum number the slider can go up to */
	private _max: number;
	@Input()
	get max() {
		return this._max;
	}
	set max(v) {
		this._max = coerceNumberProperty(v, this._max);
	}

	/** Sets the multiplier of the slider items */
	@Input() steps: number;

	/** Use an array of values instead of min/max/steps */
	@Input() values: number[];

	/** disablaes the component from the question model properties */
	@Input('isDisabled')
	set isDisabled(v) {
		this.disabled = v;
	}

	private _required: boolean;

	@Input()
	get required() {
		return this._required;
	}

	set required(value: any) {
		this._required = coerceBooleanProperty(value);
	}

	private _disabled: boolean = false;

	@Input()
	get disabled(): boolean { return this._disabled; }
	set disabled(value) { this._disabled = coerceBooleanProperty(value); }

	/** The indidivudal numbered containers in the slider  */
	public sliderItems: SliderItem[] = [];

	/** View -> model callback called when value changes */
	private _onChangeCallback: (_: any) => void = noop;

	/** View -> model callback called when slider has been touched */
	private _onTouchedCallback: () => void = noop;

	/** The change emitted when the sliders value changes */
	@Output() change = new EventEmitter<DFSliderChange>();

	/** The internal value of the slider */
	private _value;
	get value() {
		return this._value;
	}
	@Input()
	set value(v: number) {
		if (v !== this._value) {
			this._value = v;
			this._onChangeCallback(v);
		}
	}

	/** The instances of each individual slider item component */
	@ViewChildren(DynamicFormQuestionNumberSliderItemComponent) sliderItemList: QueryList<DynamicFormQuestionNumberSliderItemComponent>;


	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private element: ElementRef,
		private ngZone: NgZone
	) {
		// Create a new slider renderer
		this._renderer = new SliderRenderer(element, ngZone);

	}

	handleKeydown(event: KeyboardEvent, next: boolean) {
		if (event.keyCode === ENTER || event.keyCode === SPACE) {
			event.preventDefault();
			if (next) {
				this.next();
			} else {
				this.prev();
			}
		}
	}

	ngOnInit() {
		// If a values array exists, create the slider items based on the array
		if (isPresent(this.values) && this.values.length > 0) {
			this.values.forEach((e) => {
				this.sliderItems.push({
					value: e,
					text: e
				});
			});
		}
		// Otherwise create the slider items based on the min/max/steps
		else if (isPresent(this.min) && this.min !== undefined) {
			if (!isPresent(this.max)) {
				throw new Error('You need a maximinum amount of items to proceed');
			}
			for (let index = this.min; index <= this.max; index++) {
				let i = index;
				if (this.steps) {
					i = index * this.steps;
				}
				this.sliderItems.push({
					value: i,
					text: i
				});
			}
		} else {
			throw new Error('You need either values or min/max set to generate a slider');
		}

	}

	ngAfterViewInit() {
		this._renderer.initSlider();
		this._renderer.sliderMovementUpdate.distinctUntilChanged().subscribe((next) => {
			this.value = this.sliderItems[next].value;
			this.setActiveSliderItem(next);
		});

		// TODO: Remove for production - setTimeout is for Testing Only
		setTimeout(() => {
			if (this.value) {
				this._renderer.setValue(this.mapValuetoIndex(this.value));
			} else {
				this._renderer.setValue(0);
			}
		}, 1);

	}

	/** Updates the active slider item */
	setActiveSliderItem(index) {
		this.sliderItemList.forEach((e) => {
			e.active = false;
			if (e.index === index) {
				e.active = true;
			}
		});
	}

	/** updates the active slider item from renderer */
	mapValuetoIndex(value: number) {
		let mappedValue;
		mappedValue = _.findIndex(this.sliderItems, (e: SliderItem) => {
			return e.value === value;
		});
		if (mappedValue === -1) {
			throw new Error('This value doesnt exist within this set');
		}
		return mappedValue;
	}


	/** Set the rendere to select a new value */
	handleClickSelect($index) {
		this._renderer.setValue($index);
	}

	/** Set the renderer to select the next value */
	next() {
		if (this.disabled) {
			return;
		}
		this._renderer.nextItem();
	}

	/** Set the renderer to select the last value */
	prev() {
		if (this.disabled) {
			return;
		}
		this._renderer.prevItem();
	}

	/** Handle start sliding event */
	onSlideStart(event: HammerInput) {
		if (this.disabled) {
			return;
		}
		this.isSliding = true;
		this.isActive = true;

		this._renderer.updateSliderPositon(event);
	}

	/** Handle sliding event */
	onSlide(event: HammerInput) {
		if (this.disabled) {
			return;
		}
		this._renderer.updateSliderPositon(event);
	}

	/** Handle slideend event */
	onSlideEnd(event: HammerInput) {
		if (this.disabled) {
			return;
		}
		this.isSliding = false;
		this._renderer.cancelAnimation(event);
	}

	/**
	 *	On Blur, Check if the current element is a date control, if not
	 *	trigger touched event
	 */
	@HostListener('blur', ['$event'])
	_onBlur(e) {
		setTimeout(() => {
			if (!document.activeElement.classList.contains('df-slider__control')) {
				this._onTouchedCallback();
			}
		}, 5);
	}


	/**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   */
	writeValue(value: any): void {
		this._value = value;
	}

	/**
	 * Saves a callback function to be invoked when the select's value
	 * changes from user input. Part of the ControlValueAccessor interface
	 * required to integrate with Angular's core forms API.
	 */
	registerOnChange(fn: any) {
		this._onChangeCallback = fn;
	}

	/**
	 * Saves a callback function to be invoked when the select is blurred
	 * by the user. Part of the ControlValueAccessor interface required
	 * to integrate with Angular's core forms API.
	 */
	registerOnTouched(fn: any) {
		this._onTouchedCallback = fn;
	}

	/**
	 * Implemented as part of ControlValueAccessor.
	 */
	setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
	}


}

export class SliderRenderer {
	private _sliderElement: HTMLElement;
	private _container: HTMLElement | Element;
	private _itemContainer: HTMLElement | Element;
	private _items: NodeListOf<HTMLElement | Element>;

	private _containerDimensions;
	private _itemContainerDimensions;
	private _itemDimension;

	private _slidePosition: number;
	private _previousPosition: number = 0;

	private minPos;
	private maxPos = 0;
	_anim: any;

	private activeItemIdx: number = 0;

	defaultItemDimensions = 48;
	defaultItemMargin = 0;


	public sliderMovementUpdate: Subject<any> = new Subject();

	constructor(
		private elementRef: ElementRef,
		private zone: NgZone
	) {
		this._sliderElement = elementRef.nativeElement;
	}


	cancelAnimation(event: HammerInput) {
		this._previousPosition = this._previousPosition + event.deltaX;

		let nPosition;

		if (this._previousPosition > this.maxPos || this.activeItemIdx === 0) {
			this._previousPosition = this.maxPos;
			this._emitActiveIndex(this.activeItemIdx = 0);
			nPosition = this.maxPos;
		} else if (this._previousPosition < this.minPos || this.activeItemIdx >= this._items.length - 1) {
			this._previousPosition = this.minPos;
			this._emitActiveIndex(this.activeItemIdx = this._items.length - 1);
			nPosition = this.getItemPosition(this._items.length - 1);
		} else {
			nPosition = this.getItemPosition(this.activeItemIdx);
		}

		this._itemContainer['style'].transform = `translate3d(${nPosition}px,0,0)`;
		cancelAnimationFrame(this._anim);

		this._anim = null;
	}

	setValue(index: number) {
		if (index >= 0 && index <= this._items.length - 1) {
			this.activeItemIdx = index;
			this._previousPosition = this.getItemPosition(this.activeItemIdx);
			this._emitActiveIndex(this.activeItemIdx);
			this._itemContainer['style'].transform = `translate3d(${this._previousPosition}px,0,0)`;
		}
	}

	nextItem() {
		if (this.activeItemIdx < this._items.length - 1) {
			this.activeItemIdx = this.activeItemIdx + 1;
			this._emitActiveIndex(this.activeItemIdx);
			this._previousPosition = this.getItemPosition(this.activeItemIdx);
			this._itemContainer['style'].transform = `translate3d(${this._previousPosition}px,0,0)`;
		}
	}

	prevItem() {
		if (this.activeItemIdx > 0) {
			this.activeItemIdx = this.activeItemIdx - 1;
			this._emitActiveIndex(this.activeItemIdx);
			this._previousPosition = this.getItemPosition(this.activeItemIdx);
			this._itemContainer['style'].transform = `translate3d(${this._previousPosition}px,0,0)`;
		}
	}

	getItemPosition(index) {
		if (this._itemDimension.width === 0) {
			return (-index * (this.defaultItemDimensions + (this.defaultItemMargin / 2)));
		}
		return (-index * (this._itemDimension.width + (this._itemDimension.margin / 2)));
	}

	updateSliderPositon(event: HammerInput) {
		if (!this._anim) {
			this.zone.runOutsideAngular(() => {
				this._updateSliderPosition();
			});
		}
		this._slidePosition = event.deltaX;

	}

	_updateSliderPosition() {
		this._setPosition(this._slidePosition);
		this._anim = requestAnimationFrame(() => {
			this._updateSliderPosition();
		});
	}


	private _setPosition(xPos) {
		let idx;
		xPos = xPos + this._previousPosition;
		if (xPos > this.minPos && xPos < this.maxPos) {
			if (idx = this._getActiveItem(xPos)) {
				this.zone.run(() => {
					this._emitActiveIndex(idx);
				})
				this._itemContainer['style'].transform = 'translate3d(' + xPos + 'px,0,0) ';
			}

		}

	}

	private _getActiveItem(position: number) {
		this.activeItemIdx = Math.round(-position / 45);
		return (this.activeItemIdx >= 0 && this.activeItemIdx <= this._items.length - 1);
	}

	private _emitActiveIndex(ind) {
		this.sliderMovementUpdate.next(this.activeItemIdx);
	}

	initSlider() {
		this._container = this._sliderElement.querySelector('.df-slider__inner-container');
		this._containerDimensions = this._container.getBoundingClientRect();
		this._itemContainer = this._sliderElement.querySelector('.df-slider__items');
		this._itemContainerDimensions = this._itemContainer.getBoundingClientRect();
		this._items = this._sliderElement.querySelectorAll('df-slider-item');
		this._itemDimension = this._items[0].getBoundingClientRect();
		this._itemDimension.margin = this._items[1]['offsetLeft'] - this._items[1]['offsetWidth'];

		this.minPos = -(this._itemContainerDimensions.width - 42.5);
	}



	getSliderContainerDimensions() {
		return this._containerDimensions;
	}

	getSliderItemContainerDimensions() {
		return this._itemContainerDimensions;
	}
}
