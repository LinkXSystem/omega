import { Connector } from "./Connector";
import { Anchor } from './Anchor';

export interface Container {
  uuid: string;
  node: HTMLElement;

  connectors: Array<Connector>;
  anchors: Array<Anchor>;

}

