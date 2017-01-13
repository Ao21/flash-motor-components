/** Strategy for setting the position on an overlay. */
export interface PositionStrategy {

  /** Updates the position of the overlay element. */
  apply(element: Element, container: string): Promise<void>;
  setScrollContainer?(element: Element): void;
  updateScrollingPosition?(element: Element, x: number, y?: number): void;

}
