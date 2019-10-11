import Svg, { Element } from '../../lib/svg';
import { Connector } from './interface';

class InputConnector implements Connector {
  element: Element;

  x: number;
  y: number;
  connector: OutputConnector;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.setConnector = this.setConnector.bind(this);
  }

  setConnector(connector: OutputConnector) {
    this.connector = connector;
  }

  setElement(element: Element) {
    this.element = element;
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    Svg.getCubicBezier(x, y, connector.x, connector.y);
  }
}

class OutputConnector implements Connector {
  element: Element;

  x: number;
  y: number;

  connector: InputConnector;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setConnector(connector: InputConnector) {
    this.connector = connector;
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    const curve = Svg.getCubicBezier(x, y, connector.x, connector.y);
    this.element.setPath(curve).update();
  }

  setElement(element: Element) {
    this.element = element;
  }
}

export { InputConnector, OutputConnector };
