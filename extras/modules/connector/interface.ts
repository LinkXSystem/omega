import { Line } from '../graphical/line';

interface Connector {
  element: Line;

  uuid: string;
  x: number;
  y: number;
  connector: Connector;

  refresh: Function;
  setConnector: Function;
  getElement: Function;
  setElement: Function;
}

export { Connector };
