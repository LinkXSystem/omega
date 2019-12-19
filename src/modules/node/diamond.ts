import Node from './node';

import { Background } from '../../constants';
import StyleSheet from '../../lib/stylesheet';

class Diamond extends Node {
  width: number;
  height: number;
  radius: number;

  constructor(width: number, radius: number) {
    super('diamond');

    this.width = this.height = width;
    this.radius = radius;
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
    const { width, height, radius } = this;
    const style = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      'border-radius': `${radius}px`,
      transform: 'rotate(45deg)',
      background: Background.LINEARGRADIENT,
      boxShadow: '0 0 10px #b2b2b2'
    };

    const { element } = this;
    StyleSheet.compose(element, style);
  }
}

export default Diamond;
