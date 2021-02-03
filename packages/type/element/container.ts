import { ConnectorInterface } from "./connector";
import { AnchorInterface } from './anchor';

export interface ContainerInterface {
  uuid: string;
  node: HTMLElement;

  connectors: Array<ConnectorInterface>;
  anchors: Array<AnchorInterface>;

}

