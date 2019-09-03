class Svg {
  static Namespace: string = 'http://www.w3.org/2000/svg';

  static createElement(name: string, attributes: Object) {
    const element = document.createElementNS(Svg.Namespace, name);
    Object.entries(attributes).forEach(attribute => {
      const [name, value] = attribute;
      element.setAttribute(name, value);
    });

    return element;
  }

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
}

class Element {
  path: string;

  constructor() {}

  lineTo(x: number, y: number) {
    this.path = ''.concat(this.path, `M ${x}, ${y}`);
  }
}

export default Svg;

export { Element };
