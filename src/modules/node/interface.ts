import { Workspace } from '../workspace';
import { Point } from '../common';

import { Connector } from '../connector';
interface NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement | SVGElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  getElement: Function;

  getCoordinate: Function;
  setCoordinate: Function;

  getShapeInfos: Function;
  setShapeInfos: Function;

  render: Function;
}

export { NodeInterface };
