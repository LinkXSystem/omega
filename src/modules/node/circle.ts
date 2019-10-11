import Node from './node';
import { Workspace } from '../workspace';
import Listener from '../../lib/listener';
import StyleSheet from '../../lib/stylesheet';

class Circle extends Node {
  diameter: number;

  constructor(workspace: Workspace, diameter: number) {
    super(workspace, 'circle');

    this.diameter = diameter;
  }

  render() {
    const options = {
      position: 'absolute',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, black, transparent)',
      boxShadow: '0 0 10px #b2b2b2',
    };

    StyleSheet.compose(
      this.element,
      options,
    );

    this.setRect();
  }
}

export default Circle;
