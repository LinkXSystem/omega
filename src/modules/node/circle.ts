import { Properties } from "csstype";

import Node from './node';

import { Position } from '../../constants';
import StyleSheet from '../../lib/stylesheet';

import { AuxiliaryCircle } from '../auxiliary';

class Circle extends Node {
  diameter: number;
  style: Properties;

  constructor(diameter: number, style = {}) {
    super('circle');

    this.diameter = diameter;
    this.style = style;
    this.auxiliary = new AuxiliaryCircle(this);
  }

  setStyleSheet() {
    const { element, diameter, style } = this;

    const cache = Object.assign({}, style, {
      position: Position.ABSOLUTE,
      width: diameter,
      height: diameter,
      borderRadius: '50%',
      transform: 'rotate(45deg)',
    });

    StyleSheet.compose(element, StyleSheet.convert(cache));
  }
}

export default Circle;
