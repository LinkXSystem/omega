import { Element } from '../../../lib/svg';
import Shape from './shape';

abstract class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();

    this.width = width;
    this.height = height;
  }

  setWidth(width: number) {
    this.width = width;

    this.render();
  }

  setHeight(height: number) {
    this.height = height;
  }
}

class Canvas extends Rectangle {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    super(width, height);

    this.canvas = canvas;
  }

  render() {
    const { width, height, canvas } = this;
    const context = canvas.getContext('2d');

    context.save();
    context.beginPath();
    context.fillRect(0, 0, width, height);
    context.closePath();
    context.restore();
  }
}

class Svg extends Rectangle {
  canvas: SVGElement;

  constructor(canvas: SVGElement, width: number, height: number) {
    super(width, height);

    this.canvas = canvas;
  }

  render() {
    const { width, height } = this;
    const element = new Element();
    element
      .moveTo(0, 0)
      .vertical(height)
      .horizontal(width)
      .vertical(-height)
      .close();

    return element;
  }
}

export { Canvas, Svg };
