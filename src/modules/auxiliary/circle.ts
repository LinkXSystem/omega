import Auxiliary from './interface';
import Anchor from './anchor';
import { Node } from '../node';
import Box from '../box';

class AuxiliaryCircle implements Auxiliary {
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

  setCacheElement(rect: DOMRect) {
    const { width, height, x, y } = rect;
    
    if (!this.element) {
      this.element = new Box();

      const { node } = this;

      node.element.appendChild(this.element.toXml());

      this.element
        .setContainer(document.body)
        .setPosition('absolute')
        .setStyle({
          border: '1px solid #1a73e8',
          'border-radius': 4,
        });
    }

    this.element
      .setStyle({
        width,
        height,
      })
      .setCoordinate(x, y);

    return this.element;
  }

  setCacheAnchors(rect: DOMRect) {
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

      return this.anchors;
    }

    const { anchors } = this;

    anchors[0].setCoordinate(middle.x, 0);
    anchors[1].setCoordinate(0, middle.y);
    anchors[2].setCoordinate(middle.x, height);
    anchors[3].setCoordinate(width, middle.y);

    return anchors;
  }

  render() {
    const { disabled, node } = this;

    if (disabled) {
      const rect = node.getShapeInfos() as DOMRect;

      const element = this.setCacheElement(rect);
      const anchors = this.setCacheAnchors(rect);

      anchors.map(anchor => {
        anchor.render(element.toXml());
      });
    }
  }
}

export default AuxiliaryCircle;
