import Auxiliary from './interface';
import Anchor from './anchor';
import { Node } from '../node';
import Box from '../box';

class CircleAuxiliary implements Auxiliary {
  anchors: Array<Anchor>;
  node: Node;
  disabled: boolean;
  element: Box;

  constructor(node: Node) {
    this.disabled = false;

    this.node = node;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;

    this.render();
  }

  getCacheElement(rect: DOMRect) {
    const { width, height, x, y } = rect;

    const middle = {
      x: width / 2,
      y: height / 2,
    };
    let { element } = this;
    if (!this.element) {
      element = new Box();
      element.setContainer(document.body).setPosition('absolute');
    }

    element
      .setStyle({
        width,
        height,
      })
      .setCoordinate(x + middle.x, y + middle.y);

    return this.anchors;
  }

  setCacheAnchors(element: Box, rect: DOMRect) {
    const { width, height } = rect;
    const middle = {
      x: width / 2,
      y: height / 2,
    };
    if (!this.anchors) {
      this.anchors = [
        new Anchor(middle.x, 0),
        new Anchor(0, middle.y),
        new Anchor(middle.x, height),
        new Anchor(width, middle.y),
      ];

      return;
    }

    const { anchors } = this;
    anchors[0].setCoordinate(middle.x, 0);
    anchors[0].setCoordinate(0, middle.y);
    anchors[0].setCoordinate(middle.x, height);
    anchors[0].setCoordinate(width, middle.y);
  }

  render() {
    const { disabled, node } = this;

    if (disabled) {
      const rect = node.getShapeInfos() as DOMRect;

      const element = this.getCacheElement(rect);

      console.warn(element);
    }
  }
}

export default CircleAuxiliary;
