import {
  Connector,
  OutputConnector,
  ConnectorUtils,
} from '../modules/connector';
import { ConnectSignalInterface } from '../modules/node';
import EventEmitter from './eventemitter';

import { MouseEvent } from '../constants';
import { Workspace } from '../modules/workspace';

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
      if (!Boolean(this.input)) {
        this.input = data.connector;
      }
    });

    this.emitter.on(MouseEvent.MOUSEMOVE, (event: MouseEvent) => {
      const { x, y } = event;

      if (Boolean(this.input) && !Boolean(this.output)) {
        this.output = new OutputConnector(x, y);
        ConnectorUtils.compose(
          this.input,
          this.output,
          this.workspace.auxiliary,
        );
      }

      if (this.output) {
        this.output.refresh(x, y);
      }
    });
  }
}

export default Runtime;
