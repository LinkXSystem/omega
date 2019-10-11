import { Element } from '../../lib/svg';

interface Connector {
  // element: Element;
  // x: number;
  // y: number;
  // connector: Connector;

  refresh: Function;
  setConnector: Function;
  setElement: Function;
}

interface ConnectSignal {
  type: string;
  uuid: string;
  connect: Connector;
}

export { Connector, ConnectSignal };
