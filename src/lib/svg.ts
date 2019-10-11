class Svg {
  static Namespace: string = 'http://www.w3.org/2000/svg';

  static createElement(name: string, attributes: Object): SVGElement {
    const element = document.createElementNS(Svg.Namespace, name);
    Object.entries(attributes).forEach(attribute => {
      const [name, value] = attribute;
      element.setAttribute(name, value);
    });

    return <SVGAElement>element;
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
  node: SVGElement;
  path: string;

  constructor(path: string = '') {
    this.path = path;
  }

  getPath() {
    return this.path;
  }

  setPath(path: string) {
    this.path = path;
    return this;
  }

  lineTo(x: number, y: number, absolute: Boolean = false) {
    const temp = absolute ? `L ${x}, ${y}` : `l ${x}, ${y}`;

    this.path = ''.concat(this.path, ' ', temp);

    return this;
  }

  moveTo(x: number, y: number, absolute: Boolean = true) {
    const temp = absolute ? `M ${x}, ${y}` : `m ${x}, ${y}`;

    this.path = ''.concat(this.path, ' ', temp);

    return this;
  }

  vertical(height: number, absolute: Boolean = false) {
    const temp = absolute ? `V ${height}` : `v ${height}`;

    this.path = ''.concat(this.path, ' ', temp);

    return this;
  }

  horizontal(width: number, absolute: Boolean = false) {
    const temp = absolute ? `V ${width}` : `v ${width}`;

    this.path = ''.concat(this.path, ' ', temp);

    return this;
  }

  close() {
    this.path = ''.concat(this.path, ' ', 'Z');

    return this;
  }

  arc(
    rx: number,
    ry: number,
    angle: number,
    large: number,
    sweep: number,
    x: number,
    y: number,
    absolute = false,
  ) {
    const temp = absolute
      ? `A ${rx} ${ry} ${angle} ${large} ${sweep} ${x} ${y}`
      : `a ${rx} ${ry} ${angle} ${large} ${sweep} ${x} ${y}`;

    this.path = ''.concat(this.path, ' ', temp);

    return this;
  }

  curve(path: string) {
    this.path = ''.concat(this.path, ' ', path);

    return this;
  }

  update() {
    const { path, node } = this;
    node.setAttribute('d', path);
  }

  toString() {
    return this.path;
  }

  toXml() {
    if (!Boolean(this.node)) {
      this.node = Svg.createElement('path', {
        d: this.path,
        stroke: 'black',
        'stroke-width': '1',
      });
    }

    return this.node;
  }
}

export default Svg;

export { Element };
