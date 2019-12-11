import Svg, { Element } from '../../lib/svg';
import UUID from '../../lib/uuid';
import { Connector } from './interface';

class InputConnector implements Connector {
  element: Element;

  uuid: string;
  x: number;
  y: number;
  connector: OutputConnector;

  constructor(x: number, y: number) {
    this.uuid = UUID.generate();

    this.x = x;
    this.y = y;

    this.setConnector = this.setConnector.bind(this);
  }

  setConnector(connector: OutputConnector) {
    this.connector = connector;
  }

  getElement() {
    return this.element;
  }

  setElement(element: Element) {
    if (element !== this.element) {
      this.element = element;
    }
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    const curve = Svg.getCubicBezier(x, y, connector.x, connector.y);
    this.element.setPath(curve).update();
  }
}

class OutputConnector implements Connector {
  element: Element;

  uuid: string;
  x: number;
  y: number;

  connector: InputConnector;

  constructor(x: number, y: number) {
    this.uuid = UUID.generate();
    this.x = x;
    this.y = y;
  }

  setConnector(connector: InputConnector) {
    this.connector = connector;
  }

  getElement() {
    return this.element;
  }

  setElement(element: Element) {
    if (element !== this.element) {
      this.element = element;
    }
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    const curve = Svg.getCubicBezier(x, y, connector.x, connector.y);
    this.element && this.element.setPath(curve).update();
  }
}

export { InputConnector, OutputConnector };
