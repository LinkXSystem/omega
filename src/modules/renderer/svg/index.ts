import Svg, { Element } from '../../../lib/svg';

class SvgRenderer {
  canvas: HTMLElement;
  width: number;
  height: number;

  constructor(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();

    const canvas = Svg.createElement('svg', {
      width,
      height,
      viewBox: `0, 0, ${width}, ${height}`,
      xmlns: Svg.Namespace,
    });

    this.width = width;
    this.height = height;

    container.appendChild(canvas);
  }

  resize(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }
}

export default SvgRenderer;
