import UUID from '../../lib/uuid';
import { Connector } from './interface';
import { Line } from '../line';

class InputConnector implements Connector {
  element: Line;

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

  getElement(): Line {
    return this.element;
  }

  setElement(element: Line) {
    if (element !== this.element) {
      this.element = element;
    }
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    this.element.refresh(x, y, connector.x, connector.y);
  }
}

class OutputConnector implements Connector {
  element: Line;

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

  getElement(): Line {
    return this.element;
  }

  setElement(element: Line) {
    if (element !== this.element) {
      this.element = element;
    }
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    this.element.refresh(x, y, connector.x, connector.y);
  }
}

export { InputConnector, OutputConnector };
