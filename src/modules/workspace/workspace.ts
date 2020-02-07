import _ from '../../lib/object';
import EventEmitter from '../../engine/eventemitter';
import Runtime from '../../engine/runtime';

import { Node } from '../node';
import { Renderer } from '../renderer';

export interface WorkspaceConfiguration {
  container: HTMLElement;

  width: number;
  height: number;
}

abstract class Workspace {
  configuration: WorkspaceConfiguration;

  container: HTMLElement;

  width: number;
  height: number;

  emitter: EventEmitter;
  runtime: Runtime;

  nodes: Map<string, Node>;

  renderer: Renderer;

  constructor(configuration: WorkspaceConfiguration) {
    const { container, width, height } = configuration;

    this.configuration = configuration;
    this.container = container;

    this.emitter = new EventEmitter();
    this.runtime = new Runtime(this);
    this.nodes = new Map<string, Node>();

    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
  }
}

export default Workspace;
