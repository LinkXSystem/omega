import { Mouse, NodeSignalConstants } from '../../constants';

import Listener from '../../lib/listener';
import _ from '../../lib/object';

import { Workspace } from '../workspace';

export default class SvgGesture {
  workspace: Workspace;

  constructor(workspace) {
    this.workspace = workspace;

    this.handleRegisterListener();
  }

  handleRegisterListener() {
    this.handleSingleClick();
  }

  handleSingleClick() {
    const { container, emitter, nodes } = this.workspace;

    let position;

    Listener.bind(container, Mouse.MOUSEDOWN, (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (_.isEmpty(target.dataset)) {
        return;
      }

      position = target.getBoundingClientRect();
    });

    Listener.bind(container, Mouse.MOUSEUP, (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (_.isEmpty(target.dataset)) {
        return emitter.emit(NodeSignalConstants.DISCONNECT);
      }

      const temp = target.getBoundingClientRect();

      if (temp.top !== position.top || temp.left !== position.left) {
        return;
      }

      const { uuid } = target.dataset;
      const node = nodes.get(uuid);

      return emitter.emit(NodeSignalConstants.CONNECT, {
        node
      });
    });
  }
}
