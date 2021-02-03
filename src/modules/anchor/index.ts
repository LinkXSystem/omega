import { Dataset, StyleSheet } from "../../../packages/element";
import { Coordinate } from '../../../packages/mathematics';

import { XYCoordinate } from '../../../packages/type';

import { ElementTypeConstant } from '../../constants';

import { Element } from '../../interfaces';

import { Container } from "../container";
import { Connector } from "../connector";

import AnchorPosition, { AnchorPositionInterface } from "./position";

import { AnchorStyle } from '../../definition/stylesheets';

export type AnchorConnectorType = 'from' | 'to';

export {
  AnchorPosition
}

const Label = ElementTypeConstant.ANCHOR;

export class Anchor extends Element {
  static bind(container: Container, position: AnchorPositionInterface) {
    const anchor = new Anchor();
    anchor.setPosition(position);

    container.setAnchor(anchor);
  }

  uuid: string;
  node: HTMLElement;

  metadata: {
    width: number;
    height: number;
  }

  coordinate: XYCoordinate;
  container: Container;

  from: Map<string, Connector>
  to: Map<string, Connector>

  _compute: Function;

  constructor() {
    super(Label);

    // eslint-disable-next-line no-undef
    this.from = new Map<string, Connector>();
    // eslint-disable-next-line no-undef
    this.to = new Map<string, Connector>();

    this._initial();
  }

  _initial() {
    this.node = document.createElement('div');
    this.node.style.position = 'absolute';

    Dataset.set(this.node, 'uuid', this.uuid);
    Dataset.set(this.node, 'type', this.type);

    this.setStyle();
  }

  setPosition(position: AnchorPositionInterface) {
    const { style, compute } = position;
    this.setStyle(style);
    this._compute = compute;
  }

  setStyle(style = {}) {
    StyleSheet.compose(this.node, { ...style, ...AnchorStyle.DefaultStyle });
    return this;
  }

  setEvent(event: string, listener: EventListenerOrEventListenerObject) {
    this.node.addEventListener(event, listener);
  }

  setContainer(container: Container) {
    this.container = container;
  }

  getCoordinate(): XYCoordinate {
    return this.coordinate;
  }

  setCoordinate(coordinate: XYCoordinate) {
    this.coordinate = coordinate;
    return this;
  }

  getCoordinateToViewport() {
    const coordinate = this.container.getCoordinateToViewport();
    if (!this.metadata) {
      const { width, height } = this.node.getBoundingClientRect();
      this.metadata = Object.assign(this.metadata || {}, { width, height });
    }

    if (this.metadata) {
      // TODO: 优化点
      const { width, height } = this.container;
      return Coordinate.add(this._compute({ width, height }), coordinate);
    }
  }

  getConnector() {
    const { from, to } = this;
    return {
      from,
      to
    }
  }

  setConnector(connector: Connector, type: AnchorConnectorType = 'from') {
    const { uuid } = connector;
    if (type !== 'from') {
      this.to.set(uuid, connector);
      return this;
    }

    this.from.set(uuid, connector);
    return this;
  }

  render() {
    return this.node;
  }

  update() {
    console.warn('unimplemented feature !');
  }

  toSerialize() {
    const { uuid, coordinate } = this;
    return {
      uuid,
      coordinate
    };
  }

}

