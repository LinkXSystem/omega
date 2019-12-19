import Listener from '../../lib/listener';
import _ from '../../lib/object';
import EventEmitter from '../../engine/eventemitter';
import Runtime from '../../engine/runtime';

import { CanvasRenderer, SvgRenderer } from '../renderer';
import { Node } from '../node';

import { MouseEvent } from '../../constants';

class Workspace {
  container: HTMLElement;

  width: number;
  height: number;

  emitter: EventEmitter;
  runtime: Runtime;

  renderer: SvgRenderer;

  nodes: Map<string, Node>;

  constructor(container: HTMLElement, width?: number, height?: number) {
    this.container = container;

    this.emitter = new EventEmitter();
    this.runtime = new Runtime(this);

    this.nodes = new Map();

    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;

    this.initial();

    this.listener();
  }

  initial() {
    const { container, width, height } = this;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    this.renderer = new SvgRenderer(this);
  }

  listener() {
    Listener.bind(window, 'resize', this.resize.bind(this));

    Object.values(MouseEvent).forEach(name => {
      Listener.bind(this.container, name, (event: MouseEvent) => {
        this.emitter.emit(name, event);
      });
    });

    // TODO: 点击事件转移至 Workspace 中, 关于 node 中的事件记录，需要考虑保存至栈中
    Listener.bind(this.container, 'click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (_.isEmpty(target.dataset)) {
        console.warn(target.dataset);
      }
    });
  }

  resize() {
    const { container, renderer } = this;

    let width, height;

    this.width = width = window.innerWidth;
    this.height = height = window.innerHeight;

    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    renderer.resize(container);
  }

  setNode(node: Node) {
    const { nodes } = this;
    node.setWorkspace(this);
    node.render();
    nodes.set(node.uuid, node);
  }

  render() {
    const { nodes, container } = this;
    Object.values(nodes).forEach(node => {
      node.render();
    });
  }
}

export default Workspace;
