import { Mouse, NodeSignalConstants } from '../constants';

import {
  InputConnector,
  OutputConnector,
  ConnectorUtils
} from '../modules/connector';
import { Node } from '../modules/node';
import EventEmitter from './eventemitter';

import { Workspace } from '../modules/workspace';

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
    this.emitter.on(NodeSignalConstants.CONNECT, this.handleBuildConnector);
    this.emitter.on(NodeSignalConstants.DISCONNECT, this.handleCancelConnector);
    this.emitter.on(Mouse.MOUSEMOVE, this.handleRefreshConnector);
  }

  handleClearConnector(isClearConnect = false) {
    if (isClearConnect) {
      this.node.delConnector(this.input);
    }

    this.output = this.input = this.node = null;
  }

  handleBuildConnector(data: { node: Node }) {
    const { node } = data;

    if (!this.input) {
      const { x, y } = node.getCoordinate();
      this.node = node;
      this.input = new InputConnector(x, y);
      node.setConnector(this.input);
      return;
    }

    if (this.input) {
      if (node === this.node) {
        return this.handleCancelConnector();
      }

      const { x, y } = node.getCoordinate();
      this.output = new OutputConnector(x, y);
      ConnectorUtils.compose(this.input, this.output, this.workspace.renderer, this.workspace.configuration.connection.line);
      node.setConnector(this.output);
      this.handleClearConnector();
    }
  }

  handleRefreshConnector(event: MouseEvent) {
    const { x, y } = event;

    if (this.input && !this.output) {
      this.output = new OutputConnector(x, y);
      ConnectorUtils.compose(this.input, this.output, this.workspace.renderer, this.workspace.configuration.connection.line);
    }

    if (this.output) {
      this.output.refresh(x, y);
    }
  }

  handleCancelConnector() {
    if (this.input && this.output) {
      const line = this.input.getElement();
      this.workspace.renderer.remove(line.toXml());
      this.handleClearConnector(true);
    }
  }
}

export default Runtime;
