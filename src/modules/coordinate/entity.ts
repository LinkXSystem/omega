import { Point } from '../common';

class Coordinate {
  origin: Point;

  constructor(container: HTMLElement) {
    const rect = container.getBoundingClientRect() as DOMRect;
    const { top, left } = rect;
    this.origin = {
      x: left,
      y: top,
    };
  }
}

export default Coordinate;
