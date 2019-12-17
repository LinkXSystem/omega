import Svg, { Element } from '../../lib/svg';
import Line from './line';

class CurvedLine extends Line {
  coords: Array<Number>;

  uuid: string;
  type: string;

  element: Element;

  constructor() {
    super('curved');
  }

  handleClick() {
    this.element.setStroke('#2878ff');
  }

  refresh(x1: number, y1: number, x2: number, y2: number) {
    const curve = Svg.getCubicBezier(x1, y1, x2, y2);
    this.coords = [].concat(x1, y1, x2, y2);
    this.element && this.element.setPath(curve).update();
  }
}

export default CurvedLine;
