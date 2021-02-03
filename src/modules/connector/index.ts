import { SVG, StyleSheet } from "../../../packages/element";
import { XYCoordinate } from '../../../packages/type';

import { ElementTypeConstant, CommonDirectionConstant } from '../../constants';

import { Anchor } from "../anchor";
import { Element } from "../../interfaces";

import { ConnectorStyle } from '../../definition/stylesheets';

export const Label = ElementTypeConstant.CONNECTOR;

export class Connector extends Element {
  uuid: string;
  node: SVGElement;
  path: SVGElement;

  from: Anchor;
  to: Anchor;

  controllers: {
    from: XYCoordinate;
    to: XYCoordinate;
  }

  constructor() {
    super(Label);
    this._initial();
  }

  _initial() {
    this.node = SVG.createElement('svg', {
      style: `overflow: visible !important; position: absolute;`
    });

    this.path = SVG.createElement('path');
    StyleSheet.compose(this.path, ConnectorStyle.DefaultPathStyle);
    this.node.appendChild(this.path);
  }

  setCoordinate(coordinate: XYCoordinate) {
    const { x, y } = coordinate;

    StyleSheet.compose(this.node, {
      transform: `translate(${x}px, ${y}px)`
    });
    StyleSheet.compose(this.path, {
      transform: `translate(-${x}px, -${y}px)`
    });

    return this;
  }

  setAnchor(anchor: Anchor, direction?: string) {
    if (direction !== CommonDirectionConstant.FROM) {
      this.to = anchor;
      return this;
    }

    this.from = anchor;
    return this;
  }

  setPath(from: XYCoordinate, to: XYCoordinate) {
    this.controllers = Object.assign({}, {
      from,
      to
    });
    const t = SVG.getCubicBezier(from.x, from.y, to.x, to.y);
    this.path.setAttribute('d', t);
  }

  setPathToCoordinate(coord: XYCoordinate, direction?: string) {
    const _coordinate = direction !== CommonDirectionConstant.TO ? { from: coord } : { to: coord };
    Object.assign(this.controllers, _coordinate);

    {
      const { from, to } = this.controllers;
      this.path.setAttribute('d', SVG.getCubicBezier(from.x, from.y, to.x, to.y));
    }
  }

  render() {
    return this.node;
  }
}
