import { Element } from '../../../lib/svg';
import Line from './line';

class OrthogonalLine extends Line {
  uuid: string;
  type: string;

  element: Element;

  constructor() {
    super();
  }

  refresh(x1: number, y1: number, x2: number, y2: number) {
    console.warn('unimplemented !!!!', x1, y1, x2, y2);
  }
}

export default OrthogonalLine;
