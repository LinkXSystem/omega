import { Workspace } from '../workspace';
import { Point } from '../common';

import { Connector } from '../connector';
interface NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  getPosition: Function;
  setPosition: Function;

  render: Function;
}

export { NodeInterface };
