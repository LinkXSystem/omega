import { Shape, Background } from '../../shape';

class CanvasRenderer {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;

  context: CanvasRenderingContext2D;

  shapes: Array<Shape> = [];

  constructor(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '-1';

    this.width = canvas.width = width;
    this.height = canvas.height = height;

    container.appendChild(canvas);

    this.canvas = canvas;

    this.context = canvas.getContext('2d');

    this.shapes.push(new Background(this.context, width, height, '#bbbbbb'));
  }

  resize(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();

    const { canvas } = this;

    this.width = canvas.width = width;
    this.height = canvas.height = height;

    this.refresh();
  }

  refresh() {
    const { width, height } = this;

    this.shapes.forEach(shape => {
      shape.update(width, height);
    });
  }

  execute() {
    this.shapes.forEach(shape => {
      shape.render();
    });
  }

  render() {
    const { context, width, height } = this;

    context.clearRect(0, 0, width, height);

    this.execute();

    requestAnimationFrame(this.render.bind(this));
  }
}

export default CanvasRenderer;
