import Node from './node';

import { Background } from '../../constants';
import StyleSheet from '../../lib/stylesheet';
import Svg, { Element } from '../../lib/svg';

class Geometric extends Node {
  width: number;
  height: number;
  path: string;

  constructor(
    width: number,
    height: number,
    path: string
  ) {
    super('geometric');

    this.width = width;
    this.height = height;
    this.path = path;
  }

  handleCreateElement() {
    return Svg.createElement('svg');
  }

  setStyleSheet() {
    const { width, height } = this;
    const style = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`
    };

    const { element } = this;

    StyleSheet.compose(element, style);
  }
}

export default Geometric;
