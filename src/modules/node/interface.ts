import { Workspace } from '../workspace';
import { Point } from '../common';

interface NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement | SVGElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  isCouldConnect: boolean;

  getElement: Function;

  getCoordinate: Function;
  setCoordinate: Function;

  getShapeInfos: Function;

  getWorkspace: Function;
  setWorkspace: Function;

  handleCreateElement: Function;

  render: Function;

  toJSON: Function;
}

export { NodeInterface };
