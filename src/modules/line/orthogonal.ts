import { LineInterface } from "./interface";
import { Element } from '../../lib/svg';

class OrthogonalLine implements LineInterface {
  uuid: string;
  type: string;

  element: Element;

  constructor() {}
}

export default OrthogonalLine;
