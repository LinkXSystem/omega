import Listener from '../../lib/listener';
import EventEmitter from '../../engine/eventemitter';
import Runtime from '../../engine/runtime';

import { CanvasRenderer, SvgRenderer } from '../renderer';

import { MouseEvent } from '../../constants';

class Workspace {
  container: HTMLElement;

  width: number;
  height: number;

  emitter: EventEmitter;
  runtime: Runtime;

  renderer: CanvasRenderer;
  auxiliary: SvgRenderer;

  constructor(container: HTMLElement, width?: number, height?: number) {
    this.container = container;

    this.emitter = new EventEmitter();
    this.runtime = new Runtime(this);

    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;

    this.initial();

    this.listener();
  }

  initial() {
    const { container, width, height } = this;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    this.renderer = new CanvasRenderer(container);
    this.auxiliary = new SvgRenderer(container);

    this.renderer.render();
  }

  listener() {
    Listener.bind(window, 'resize', this.resize.bind(this));

    Object.values(MouseEvent).forEach(name => {
      Listener.bind(this.container, name, (event: MouseEvent) => {
        this.emitter.emit(name, event);
      });
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

  render() {}
}

export default Workspace;
