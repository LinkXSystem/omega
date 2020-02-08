import { Renderer } from './interface';
import { ZIndex } from '../../constants';

class CanvasRenderer implements Renderer {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;

  context: CanvasRenderingContext2D;

  constructor(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.zIndex = ZIndex.CANVAS.toString();

    this.width = canvas.width = width;
    this.height = canvas.height = height;

    container.appendChild(canvas);

    this.canvas = canvas;

    this.context = canvas.getContext('2d');
  }

  resize(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();

    const { canvas } = this;

    this.width = canvas.width = width;
    this.height = canvas.height = height;

    this.refresh();
  }

  refresh() {
    console.warn('it needs re-implement !');
  }

  execute() {
    console.warn('it needs re-implement !');
  }

  render() {
    const { context, width, height } = this;

    context.clearRect(0, 0, width, height);

    this.execute();

    requestAnimationFrame(this.render.bind(this));
  }

  remove() {
    console.warn('it needs re-implement !');
  }
}

export default CanvasRenderer;
