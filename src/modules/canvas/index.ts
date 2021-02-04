import { Dataset, StyleSheet } from '../../../packages/element';

import { ElementTypeConstant } from '../../constants';

import { Element } from '../../interfaces';

import { Container } from '../container';
import { Connector } from '../connector';

const Label = ElementTypeConstant.CANVAS;

const isDebugger = true;

export class Canvas extends Element {
  uuid: string;
  node: HTMLDivElement;

  width: number;
  height: number;

  origin: {
    x: number;
    y: number;
  };
  matrix: Array<number>;
  scale: number;
  translate: {
    x: number;
    y: number;
  };

  events: Array<Event>;

  constructor() {
    super(Label);

    this._initial();
  }

  _initial() {
    const { uuid } = this;
    const node = document.createElement('div');
    this.node = node;

    StyleSheet.compose(this.node, {
      position: 'relative'
    });

    if (isDebugger) {
      StyleSheet.compose(this.node, {
        border: '1px solid #b2b2b2',
        transform: 'translate(10px, 10px)'
      });
    }

    Dataset.set(node, 'uuid', uuid);
  }

  _handleCallbackOfViewport() {
    const { width, height } = this;
    this.setOrigin(width / 2, height / 2);
  }

  setViewport(width: number, height: number) {
    StyleSheet.compose(this.node, {
      width,
      height
    });

    this.width = width;
    this.height = height;

    this._handleCallbackOfViewport();

    return this;
  }

  setOrigin(x: number, y: number) {
    this.origin = Object.assign({}, { x, y });
    return this;
  }

  getTranslate() {
    const { x, y } = this.node.getBoundingClientRect();
    return {
      x,
      y
    }
  }

  setTranslate(x: number, y: number) {
    StyleSheet.compose(this.node, {
      transform: `translate(${x}px, ${y}px)`
    });
    return this;
  }

  setScale(scale: number) {
    this.scale = scale;
    return this;
  }

  draw(element: Container | Connector) {
    if (element instanceof Container) {
      const { node, coordinate } = element;
      const { x, y } = coordinate;

      {
        const { origin } = this;
        StyleSheet.compose(node, {
          top: `${y + origin.y}px`,
          left: `${x + origin.x}px`
        });
      }

      this.node.appendChild(node);
      element.setCanvas(this);
    }

    if (element instanceof Connector) {
      const { node } = element;
      this.node.appendChild(node);
    }
  }

  clear(element: Container | Connector) {
    const { node } = element;
    this.node.removeChild(node);
  }

  render() {
    return this.node;
  }

  update() {
    return this.node;
  }
}
