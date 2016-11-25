/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
export class OverlayContainer {
	private _containerElement: HTMLElement;
	private _defaultContainer: HTMLElement | Element = document.body;


	setContainerLocation(el: Element) {
		this._defaultContainer = el;
	}	
	/**
	 * This method returns the overlay container element.  It will lazily
	 * create the element the first time  it is called to facilitate using
	 * the container in non-browser environments.
	 * @returns {HTMLElement} the container element
	 */
	getContainerElement(): HTMLElement {
		if (!this._containerElement) { this._createContainer(); }
		return this._containerElement;
	}

	/**
	 * Create the overlay container element, which is simply a div
	 * with the 'md-overlay-container' class on the document body.
	 */
	private _createContainer(): void {
		let container = document.createElement('div');
		container.classList.add('mf-overlay-container');
		this._defaultContainer.appendChild(container);
		this._containerElement = container;
	}
}
