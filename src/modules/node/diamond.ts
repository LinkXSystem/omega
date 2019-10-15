import Node from './node';
import { Workspace } from '../workspace';
import StyleSheet from '../../lib/stylesheet';

class Diamond extends Node {
  constructor(workspace: Workspace) {
    super(workspace, 'diamond');
  }
}

export default Diamond;
