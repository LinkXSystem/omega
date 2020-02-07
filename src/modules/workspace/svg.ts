import Workspace, { WorkspaceConfiguration } from './workspace';

import Listener from '../../lib/listener';
import _ from '../../lib/object';

import { SvgRenderer } from '../renderer';
import { Node } from '../node';

import { SvgGesture } from '../gesture';
import { Mouse } from '../../constants';

class SvgWorkspace extends Workspace {
  renderer: SvgRenderer;
  gesture: SvgGesture;

  constructor(configuration: WorkspaceConfiguration) {
    super(configuration);

    this.initial();

    this.listener();
  }

  initial() {
    const { container, width, height } = this;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    this.renderer = new SvgRenderer(this);
    this.gesture = new SvgGesture(this);
  }

  listener() {
    Listener.bind(window, 'resize', this.resize.bind(this));

    Object.values(Mouse).forEach(name => {
      Listener.bind(this.container, name, (event: MouseEvent) => {
        this.emitter.emit(name, event);
      });
    });
  }

  resize() {
    // const { container, renderer } = this;
    // let width, height;
    // this.width = width = window.innerWidth;
    // this.height = height = window.innerHeight;
    // container.style.width = `${width}px`;
    // container.style.height = `${height}px`;
    // renderer.resize(container);
  }

  setNode(node: Node) {
    const { nodes } = this;
    node.setWorkspace(this);
    node.render();
    nodes.set(node.uuid, node);
  }

  render() {
    const { nodes } = this;
    Object.values(nodes).forEach(node => {
      node.render();
    });
  }
}

export default SvgWorkspace;
