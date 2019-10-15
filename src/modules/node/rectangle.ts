import Node from './node';
import StyleSheet from '../../lib/stylesheet';
import { Workspace } from '../workspace';

class Rectangle extends Node {
  width: number;
  height: number;
  radius: number;

  constructor(
    workspace: Workspace,
    width: number,
    height: number,
    radius: number,
  ) {
    super(workspace, 'rectangle');

    this.width = width;
    this.height = height;
    this.radius = radius;
  }

  setStyleSheet() {
    const { width, height, radius } = this;
    const style = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      'border-radius': `${radius}px`,
      background: 'linear-gradient(45deg, black, transparent)',
      boxShadow: '0 0 10px #b2b2b2',
    };

    const { element } = this;
    StyleSheet.compose(
      element,
      style,
    );
  }
}

export default Rectangle;
