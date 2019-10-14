import {
  Connector,
  InputConnector,
  OutputConnector,
  ConnectorUtils,
} from '../modules/connector';
import EventEmitter from './eventemitter';

import { MouseEvent } from '../constants';
import { Workspace } from '../modules/workspace';
import { ConnectSignalInterface } from '../modules/signal';

class Runtime {
  output: Connector;
  input: Connector;

  emitter: EventEmitter;
  workspace: Workspace;

  constructor(workspace: Workspace) {
    const { emitter } = workspace;
    this.emitter = emitter;

    this.workspace = workspace;

    this.register();
  }

  register() {
    this.emitter.on('node:connect', (data: ConnectSignalInterface) => {
      const { node } = data;
      if (!Boolean(this.input)) {
        const { x, y } = node.getPosition();
        this.input = new InputConnector(x, y);
        node.setConnector(this.input);
      }
    });

    this.emitter.on(MouseEvent.MOUSEMOVE, (event: MouseEvent) => {
      const { x, y } = event;

      if (Boolean(this.input) && !Boolean(this.output)) {
        this.output = new OutputConnector(x, y);
        ConnectorUtils.compose(
          this.input,
          this.output,
          this.workspace.renderer,
        );
      }

      if (this.output) {
        this.output.refresh(x, y);
      }
    });

    this.emitter.on(MouseEvent.MOUSEDOWN, (event: MouseEvent) => {
      if (Boolean(this.input) && Boolean(this.output)) {
        const element = this.input.getElement();
        this.workspace.renderer.remove(element.toXml());
        this.input = this.output = null;
      }
    });
  }
}

export default Runtime;
