interface SVGElementOption {
  label: string;
  width: string | number;
  fill: string;
  stroke: string;
}

export default class Svg {
  static setCubicBezierScale(offset: number, scale: number = 1.5) {
    return offset / scale;
  }

  static getCubicBezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    scale: Function = Svg.setCubicBezierScale,
  ) {
    const offset = scale(Math.abs(x1 - x2));

    return `M ${x1}, ${y1} C ${x1 + offset}, ${y1} ${x2 -
      offset}, ${y2} ${x2}, ${y2}`;
  }

  static getQuadraticBezier(x1: number, y1: number, x2: number, y2: number) {}

  static createElement(option: SVGElementOption) {
    const { label } = option;
    const element = document.createElement(label);
    const entries = Object.entries(option);
    entries.forEach(entry => {
      const [name, value] = entry;
      element.setAttribute(name, value);
    });

    return element;
  }
}

export { SVGElementOption };
