import { Properties } from 'csstype';

import Node from './node';

import { Position } from '../../constants';
import StyleSheet from '../../lib/stylesheet';

class Rectangle extends Node {
  width: number;
  height: number;

  style: Properties;

  constructor(width: number, height: number, style = {}) {
    super('rectangle');

    this.width = width;
    this.height = height;

    this.style = style;

  }

  setStyleSheet() {
    const { element, width, height, style } = this;

    const cache = Object.assign({}, style, {
      position: Position.ABSOLUTE,
      width,
      height,
    });

    StyleSheet.compose(element, StyleSheet.convert(cache));
  }
}

export default Rectangle;
