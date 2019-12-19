import Node from './node';

import { Background } from '../../constants';
import StyleSheet from '../../lib/stylesheet';

import { AuxiliaryCircle } from '../auxiliary';

class Circle extends Node {
  diameter: number;

  constructor(diameter: number) {
    super('circle');

    this.diameter = diameter;
    this.auxiliary = new AuxiliaryCircle(this);
  }

  setStyleSheet() {
    const style = {
      position: 'absolute',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: Background.LINEARGRADIENT,
      boxShadow: '0 0 10px #b2b2b2'
    };

    const { element } = this;

    StyleSheet.compose(element, style);
  }
}

export default Circle;
