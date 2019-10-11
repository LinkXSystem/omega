import Renderer from '../interface';

import Svg from '../../../lib/svg';
import { ZIndex } from '../../../constants';

class SvgRenderer implements Renderer {
  canvas: SVGElement;
  width: number;
  height: number;

  constructor(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();

    const canvas = Svg.createElement('svg', {
      width,
      height,
      viewBox: `0, 0, ${width}, ${height}`,
      xmlns: Svg.Namespace,
      style: `position: absolute; z-index: ${ZIndex.SVG}`,
    });

    this.canvas = canvas;
    this.width = width;
    this.height = height;

    container.appendChild(canvas);
  }

  resize(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }

  render(element: Element) {
    // debugger;
    this.canvas.appendChild(element);
  }
}

export default SvgRenderer;
