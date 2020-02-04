import Auxiliary from './auxiliary';
import Anchor from './anchor';
import { Node } from '../node';
import { Box } from '../common';

import { Mouse } from '../../constants';

class AuxiliaryCircle extends Auxiliary {
  anchors: Array<Anchor>;
  node: Node;
  disabled: boolean;
  element: Box;

  constructor(node: Node) {
    super(node);
  }

  setCacheElement(rect: DOMRect) {
    const { width, height } = rect;

    if (!this.element) {
      this.element = new Box();

      const { node } = this;

      this.element
        .setContainer(node.element)
        .setPosition('absolute')
        .setStyle({
          'box-sizing': 'border-box',
          'border-radius': 4,
          'box-shadow': '0px 0px 1px #1a73e8'
        });
    }

    this.element.setStyle({
      width,
      height
    });
  }

  setCacheAnchors(rect: DOMRect) {
    const { width, height } = rect;
    const { element } = this;

    const middle = {
      x: width / 2,
      y: height / 2
    };

    if (!this.anchors) {
      this.anchors = [
        new Anchor(middle.x, 0),
        new Anchor(0, middle.y),
        new Anchor(middle.x, height),
        new Anchor(width, middle.y)
      ];

      this.anchors.map(anchor => {
        anchor.render(element.toXml());
      });
    }
  }
}

export default AuxiliaryCircle;
