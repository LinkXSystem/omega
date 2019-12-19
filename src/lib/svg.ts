import Listener from '../lib/listener';

class Svg {
  static Namespace: string = 'http://www.w3.org/2000/svg';

  static createElement(name: string, attributes: Object = {}): SVGElement {
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

  static setAttributes(target: SVGElement, attributes: Object) {
    Object.entries(attributes).forEach(attribute => {
      const [key, name] = attribute;
      target.setAttribute(key, name);
    });
  }

  static getCubicBezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    scale: Function = Svg.setCubicBezierScale
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

  static getQuadraticBezier(x1: number, y1: number, x2: number, y2: number) {}
}

class Element {
  node: SVGElement;
  path: string;
  fill: string;

  width: number;
  stroke: string;

  constructor(path: string = '', fill = 'none') {
    this.path = path;
    this.fill = fill;
  }

  getPath() {
    return this.path;
  }

  setPath(path: string) {
    this.path = path;
    return this;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width: number) {
    this.width = width;
  }

  getStroke() {
    return this.stroke;
  }

  setStroke(stroke) {
    this.stroke = stroke;
    if (this.node) {
      this.node.setAttribute('stroke', stroke);
    }
  }

  bind(event: string, callback: Function) {
    Listener.bind(this.node, event, callback);
  }

  unbind(event: string, callback: Function) {
    Listener.unbind(this.node, event, callback);
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
    absolute = false
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
      const { path, fill, width, stroke } = this;

      this.node = Svg.createElement('path', {
        d: path,
        stroke: stroke || '#c9c9c9',
        fill: 'none',
        'stroke-width': width || '5'
      });
    }

    return this.node;
  }
}

export default Svg;

export { Element };
