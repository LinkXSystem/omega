import Node from './node';
import { Workspace } from '../workspace';

class Rectangle extends Node {
  width: number;
  height: number;

  constructor(workspace: Workspace, width: number, height: number) {
    super(workspace, 'rectangle');

    this.width = width;
    this.height = height;
  }

  render() {}
}

export default Rectangle;
