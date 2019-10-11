import { Workspace } from '../workspace';
import { Point } from '../common';

import { Connector } from '../connector';

interface ConnectSignalInterface {
  type: string;
  connector: Connector;
}

interface NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  render: Function;
}

export { NodeInterface, ConnectSignalInterface };
