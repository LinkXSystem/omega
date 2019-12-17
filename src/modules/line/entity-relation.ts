import { Element } from '../../lib/svg';
import Line from './line';

class EntityRelationLine extends Line {
  uuid: string;
  type: string;

  element: Element;

  constructor() {
    super();
  }
}

export default EntityRelationLine;
