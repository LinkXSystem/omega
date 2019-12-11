import Node from './node';

import { Background } from '../../constants';
import StyleSheet from '../../lib/stylesheet';
import { Workspace } from '../workspace';
import Svg, { Element } from '../../lib/svg';

class Geometric extends Node {
  width: number;
  height: number;
  path: string;

  constructor(
    workspace: Workspace,
    width: number,
    height: number,
    path: string
  ) {
    super(workspace, 'geometric');

    this.width = width;
    this.height = height;
    this.path = path;
  }

  getElement() {
    return this.element || Svg.createElement('svg');
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
