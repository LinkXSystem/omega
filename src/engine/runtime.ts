import {
  Connector,
  InputConnector,
  OutputConnector,
  ConnectorUtils,
} from '../modules/connector';
import { Node } from '../modules/node';
import EventEmitter from './eventemitter';

import { MouseEvent } from '../constants';
import { Workspace } from '../modules/workspace';
import { ConnectSignalInterface } from '../modules/signal';

class Runtime {
  output: OutputConnector;
  input: InputConnector;
  node: Node;

  emitter: EventEmitter;
  workspace: Workspace;

  constructor(workspace: Workspace) {
    const { emitter } = workspace;
    this.emitter = emitter;

    this.workspace = workspace;

    this.handleClearConnector = this.handleClearConnector.bind(this);
    this.handleBuildConnector = this.handleBuildConnector.bind(this);
    this.handleRefreshConnector = this.handleRefreshConnector.bind(this);
    this.handleCancelConnector = this.handleCancelConnector.bind(this);

    this.register();
  }

  register() {
    this.emitter.on('node:connect', this.handleBuildConnector);

    this.emitter.on(MouseEvent.MOUSEMOVE, this.handleRefreshConnector);

    this.emitter.on(MouseEvent.MOUSEDOWN, this.handleCancelConnector);
  }

  handleClearConnector() {
    this.output = this.input = null;
    this.node = null;
  }

  handleBuildConnector(data: ConnectSignalInterface) {
    const { node } = data;

    if (!Boolean(this.input)) {
      const { x, y } = node.getPosition();
      this.input = new InputConnector(x, y);
      node.setConnector(this.input);
      return;
    }

    if (Boolean(this.input)) {
      const { x, y } = node.getPosition();
      const output = new OutputConnector(x, y);
      output.setConnector(this.input);
      node.setConnector(output);
      this.handleClearConnector();
    }
  }

  handleRefreshConnector(event: MouseEvent) {
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
  }

  handleCancelConnector(event: MouseEvent) {
    if (Boolean(this.input) && Boolean(this.output)) {
      const element = this.input.getElement();
      this.workspace.renderer.remove(element.toXml());
      this.input = this.output = null;
    }
  }
}

export default Runtime;
