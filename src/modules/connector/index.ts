import Svg from '../../lib/svg';

interface Connector {
  refresh: Function;
}

class InputConnector implements Connector {
  x: number;
  y: number;
  connector: OutputConnector;

  element: SVGPathElement;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setConnector(connector: OutputConnector) {
    this.connector = connector;
  }

  refresh(x: number, y: number) {
    const { connector } = this;
    this.x = x;
    this.y = y;
    Svg.getCubicBezier(x, y, connector.x, connector.y);
  }

  render(path: string) {
    if (this.element) {
      // this.element = document.createElement('path');
       document.createElement('svg');
    }
  }
}

class OutputConnector implements Connector {
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

  refresh() {}
}

export { Connector, InputConnector, OutputConnector };
