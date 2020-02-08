import SVG, { Element } from '../../lib/svg';
import Line from './line';

class CurvedLine extends Line {
  coords: Array<number>;

  uuid: string;
  type: string;

  element: Element;

  isActivate: boolean;

  constructor() {
    super('curved');

    this.isActivate = false;
  }

  handleClick() {
    const { isActivate, element } = this;

    const color = isActivate ? '#c9c9c9' : '#2878ff';

    element.setStroke(color);

    this.isActivate = !isActivate;
  }

  refresh(x1: number, y1: number, x2: number, y2: number) {
    const curve = SVG.getCubicBezier(x1, y1, x2, y2);
    this.coords = [].concat(x1, y1, x2, y2);
    this.element && this.element.setPath(curve).update();
  }
}

export default CurvedLine;
