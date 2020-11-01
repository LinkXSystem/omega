import { type } from './constants';

import Pen from './pen';

class Brush {
  static Type = type;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  brush: string;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  setBrush(brush: string) {
    this.brush = brush;
  }

  draw() {
    console.warn('umimplement !');
  }

  onMouseDown() {
    const { canvas } = this;
    canvas.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(event: MouseEvent) {
    const { context } = this;
    const { clientX, clientY } = event;
    Pen.simple(context, { x: clientX, y: clientY });
  }

  onMouseUp() {
    const { canvas } = this;
    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('mouseup', this.onMouseUp);
  }
}

export default Brush;
