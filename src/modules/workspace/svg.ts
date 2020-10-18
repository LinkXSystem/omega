import Workspace, { WorkspaceConfiguration } from './workspace';

import Listener from '../../lib/listener';
import _ from '../../lib/object';

import { SvgRenderer } from '../renderer';
import { Node } from '../node';

import { SvgGesture } from '../gesture';
import { Mouse } from '../../constants';
import { AuxiliaryLine } from '../accessibility/auxiliary';

class SvgWorkspace extends Workspace {
  renderer: SvgRenderer;
  gesture: SvgGesture;
  auxiliarys: Array<AuxiliaryLine>

  constructor(configuration: WorkspaceConfiguration) {
    super(configuration);

    this._initial();

    this.listener();
  }

  // TODO：初始化环境
  _initial() {
    const { container, width, height } = this;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    this.renderer = new SvgRenderer(this);
    this.gesture = new SvgGesture(this);

    // TODO: 需要在配置中提供用于设置 辅助线 的配置项
    this._handleInitialAuxiliaryLine();
  }

  _handleEvent(name: string, event: MouseEvent) {
    switch (name) {
      case Mouse.MOUSEMOVE:
        this._handleUpdateAuxiliaryLine(event)
        break;
      default:

    }
  }

  // TODO: 辅助线
  _handleInitialAuxiliaryLine() {
    this.auxiliarys = new Array<AuxiliaryLine>();

    const x = new AuxiliaryLine(this, 'x');
    x.render();
    this.auxiliarys.push(x);

    const y = new AuxiliaryLine(this, 'y');
    y.render();
    this.auxiliarys.push(y);
  }

  _handleUpdateAuxiliaryLine(event: MouseEvent) {
    // TODO: 需要优化
    if (this.auxiliarys.length) {
      const [x, y] = this.auxiliarys;
      const { clientX, clientY } = event;

      x.element.setCoordinate(clientX, 0);
      y.element.setCoordinate(0, clientY);
    }

  }

  listener() {
    Listener.bind(window, 'resize', this.resize.bind(this));

    Object.values(Mouse).forEach(name => {
      Listener.bind(this.container, name, (event: MouseEvent) => {
        this.emitter.emit(name, event);

        this._handleEvent(name, event);
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
