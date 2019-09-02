import Listener from '../../lib/listener';
import EventEmitter from '../../engine/eventemitter';
import Runtime from '../../engine/runtime';

class Workspace {
  container: HTMLElement;
  automatic: boolean = true;

  width: number;
  height: number;

  emitter: EventEmitter;
  runtime: Runtime;

  constructor(
    container: HTMLElement,
    width?: number,
    height?: number,
    automatic?: boolean,
  ) {
    this.container = container;
    this.automatic = automatic;

    this.emitter = new EventEmitter();
    this.runtime = new Runtime(this.emitter);

    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;

    if (this.automatic) {
      this.render();
    }

    Listener.bind(window, 'resize', this.resize);
  }

  resize() {
    const { container } = this;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.width = width;
    this.height = height;

    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
  }

  render() {
    const { container, width, height } = this;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;

    container.style.background = '#f5f5f5';
  }
}

export default Workspace;
