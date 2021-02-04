export class SVG {
  static NAMESPACE = 'http://www.w3.org/2000/svg';

  static createElement(name: string, attributes = {}): SVGElement {
    const element = document.createElementNS(SVG.NAMESPACE, name) as SVGElement;
    Object.entries(attributes).forEach(attribute => {
      const [name, value] = attribute;
      element.setAttribute(name, value as string);
    });

    return element;
  }

  static setCubicBezierScale(offset: number, scale = 1.5) {
    return offset / scale;
  }

  static getCubicBezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    scale: Function = SVG.setCubicBezierScale
  ) {
    if (!Math.floor(Math.abs(x1 - x2)) || !Math.floor(Math.abs(y1 - y2))) {
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }

    const offset = scale(Math.abs(x1 - x2));

    return x1 < x2
      ? `M ${x1}, ${y1} C ${x1 + offset}, ${y1} ${x2 -
      offset}, ${y2} ${x2}, ${y2}`
      : `M ${x2}, ${y2} C ${x2 + offset}, ${y2} ${x1 -
      offset}, ${y1} ${x1}, ${y1}`;
  }
}
