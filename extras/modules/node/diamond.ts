import { Properties } from 'csstype';

import Node from './node';

import { Position } from '../../constants';
import StyleSheet from '../../lib/stylesheet';

class Diamond extends Node {
  width: number;
  height: number;

  style: Properties;

  constructor(width: number, style = {}) {
    super('diamond');

    this.width = this.height = width;
    this.style = style;
  }

  getShapeInfos() {
    const { width, height } = this;
    const rect = this.element.getBoundingClientRect();
    return Object.assign({}, rect, {
      width,
      height
    });
  }

  setStyleSheet() {
    const { element, width, height, style } = this;

    const cache = Object.assign({}, style, {
      position: Position.ABSOLUTE,
      width,
      height,
      transform: 'rotate(45deg)',
    });

    StyleSheet.compose(element, StyleSheet.convert(cache));
  }
}

export default Diamond;
