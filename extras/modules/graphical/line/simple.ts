import SVG, { Element } from '../../../lib/svg';
import Line from './line';

class SimpleLine extends Line {
  uuid: string;
  type: string;

  element: Element;

  constructor() {
    super();
  }

  refresh(x1: number, y1: number, x2: number, y2: number) {
    const curve = SVG.getSimpleLine(x1, y1, x2, y2);
    this.coords = [].concat(x1, y1, x2, y2);
    this.element && this.element.setPath(curve).update();
  }
}

export default SimpleLine;
