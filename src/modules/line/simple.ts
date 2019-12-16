import { Element } from '../../lib/svg';
import Line from './line';

class SimpleLine extends Line {
  uuid: string;
  type: string;

  element: Element;

  constructor() {}
}

export default SimpleLine;