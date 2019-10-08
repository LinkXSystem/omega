import { Shape } from './interface';

class Background implements Shape {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  color: string;

  cache: {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
  };

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
  ) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.color = color;

    this.handleCacheLayer();
  }

  update(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.handleCacheLayer();
  }

  handleCacheLayer() {
    const { width, height, color } = this;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    for (let w = 20; w < width; w += 20) {
      for (let h = 20; h < height; h += 20) {
        this.point(context, w, h, color);
      }
    }

    this.cache = {
      canvas,
      context,
    };
  }

  point(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
  ) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, 1, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
  }

  render() {
    const { context, cache, width, height } = this;

    context.drawImage(cache.canvas, 0, 0, width, height);
  }
}

export default Background;
