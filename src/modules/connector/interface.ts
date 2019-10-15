import { Element } from '../../lib/svg';

interface Connector {
  element: Element;

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
