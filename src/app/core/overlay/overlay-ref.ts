import { PortalHost, Portal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef implements PortalHost {
	private _backdropElement: HTMLElement = null;
	private _backdropClick: Subject<any> = new Subject();

	constructor(
		private _portalHost: PortalHost,
		private _pane: HTMLElement,
		private _state: OverlayState) { }

	attach(portal: Portal<any>): any {
		if (this._state.hasBackdrop) {
			this._attachBackdrop();
		}
		if (this._state.container) {
			this._setScrollContainer(this._state.container);
		}

		let attachResult = this._portalHost.attach(portal);
		this.updateSize();
		this.updateDirection();
		this.updatePosition();

		return attachResult;
	}

	detach(): Promise<any> {
		this._detatchBackdrop();
		return this._portalHost.detach();
	}

	dispose(): void {
		this._detatchBackdrop();
		this._portalHost.dispose();
	}

	hasAttached(): boolean {
		return this._portalHost.hasAttached();
	}

	backdropClick(): Observable<void> {
		return this._backdropClick.asObservable();
	}

	_setScrollContainer(container) {
		this._state.positionStrategy.setScrollContainer(container);
	}

	/** Gets the current state config of the overlay. */
	getState() {
		return this._state;
	}

	/** Updates the position of the overlay based on the position strategy. */
	updatePosition() {
		if (this._state.positionStrategy) {
			this._state.positionStrategy.apply(this._pane, this._state.container);
		}
	}

	/** Updates the text direction of the overlay panel. **/
	private updateDirection() {
		this._pane.setAttribute('dir', this._state.direction);
	}

	/** Updates the size of the overlay based on the overlay config. */
	updateSize() {
		if (this._state.width || this._state.width === 0) {
			this._pane.style.width = formatCssUnit(this._state.width);
		}

		if (this._state.height || this._state.height === 0) {
			this._pane.style.height = formatCssUnit(this._state.height);
		}

		if (this._state.trigger) {
			let client = this._state.trigger.getBoundingClientRect();
			this._pane.style.width = formatCssUnit(client.width);
		}
	}

	updateScrollPosition(x?, y?) {
		this._state.positionStrategy.updateScrollingPosition(this._pane, x, y);
	}

	updateState(_newStateOptions: OverlayState | any) {
		for (var key in _newStateOptions) {
			if (this._state.hasOwnProperty(key)) {
				this._state[key] = _newStateOptions[key];
			}
		}
	}

	/** Attaches a backdrop for this overlay. */
	private _attachBackdrop() {
		this._backdropElement = document.createElement('div');
		this._backdropElement.classList.add('mf-overlay-backdrop');
		this._backdropElement.classList.add(this._state.backdropClass);

		this._pane.parentElement.appendChild(this._backdropElement);

		// Forward backdrop clicks such that the consumer of the overlay can perform whatever
		// action desired when such a click occurs (usually closing the overlay).
		this._backdropElement.addEventListener('click', () => {
			this._backdropClick.next(null);
		});

		// Add class to fade-in the backdrop after one frame.
		requestAnimationFrame(() => {
			this._backdropElement.classList.add('mf-overlay-backdrop-showing');
		});
	}

	/** Detaches the backdrop (if any) associated with the overlay. */
	private _detatchBackdrop(): void {
		let backdropToDetach = this._backdropElement;

		if (backdropToDetach) {
			backdropToDetach.classList.remove('mf-overlay-backdrop-showing');
			backdropToDetach.classList.remove(this._state.backdropClass);
			backdropToDetach.addEventListener('transitionend', () => {
				backdropToDetach.parentNode.removeChild(backdropToDetach);

				// It is possible that a new portal has been attached to this overlay since we started
				// removing the backdrop. If that is the case, only clear the backdrop reference if it
				// is still the same instance that we started to remove.
				if (this._backdropElement == backdropToDetach) {
					this._backdropElement = null;
				}
			});
		}
	}
}

function formatCssUnit(value: number | string) {
	return typeof value === 'string' ? value as string : `${value}px`;
}
