import { LineInterface } from "./interface";
import { Element } from '../../lib/svg';

class IsometricLine implements LineInterface {
  uuid: string;
  type: string;

  element: Element;

  constructor() {}
}

export default IsometricLine;
