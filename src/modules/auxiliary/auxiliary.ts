import AuxiliaryInterface from './interface';
import Anchor from './anchor';
import { Node } from '../node';
import { Box } from '../common';

import { Mouse } from '../../constants';

abstract class Auxiliary implements AuxiliaryInterface {
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
    throw new Error('You must overwrite the method in Auxiliary !!!');
  }

  setCacheAnchors(rect: DOMRect) {
    throw new Error('You must overwrite the method in Auxiliary !!!');
  }

  render() {
    const { disabled, node } = this;

    if (!this.element) {
      const rect = node.getShapeInfos() as DOMRect;

      this.setCacheElement(rect);
      this.setCacheAnchors(rect);
    }

    this.element.setStyle({
      visibility: disabled ? 'visible' : 'hidden'
    });

    if (disabled) {
      this.element.bind(Mouse.MOUSEUP, (event: MouseEvent) => {
        event.preventDefault();
        this.setDisabled(false);
      });
    }
  }
}

export default Auxiliary;
