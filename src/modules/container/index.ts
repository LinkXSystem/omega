import { XYCoordinate, ConnectorInterface } from '../../../packages/type';

import { Dragger } from '../../../packages/dragger';
import { Dataset, StyleSheet } from '../../../packages/element';
import { Coordinate } from '../../../packages/mathematics';

import { Element } from '../../interfaces';

import { ElementTypeConstant, CommonDirectionConstant } from '../../constants';

import { Canvas } from "../canvas";
import { Anchor } from "../anchor";
import { Runtime } from "../runtime";

export const TYPE = ElementTypeConstant.CONTAINER;

export interface ContainerOption {
  width: number;
  height: number;
}

export class Container extends Element {
  uuid: string;
  root: HTMLElement;
  node: HTMLElement;

  canvas: Canvas;
  runtime: Runtime;

  connectors: Array<ConnectorInterface>;
  anchors: Array<Anchor>;

  width: number;
  height: number;

  coordinate: XYCoordinate;

  dragger: Dragger;

  constructor(option?: ContainerOption) {
    super(TYPE);

    const { width, height } = option || {
      width: 120,
      height: 120,
    }

    this.width = width;
    this.height = height;

    this.coordinate = {
      x: 0,
      y: 0,
    }

    this._initial();
  }

  _initial() {
    this.anchors = [];

    const { uuid, width, height } = this;
    const node = document.createElement('div');
    this.node = node;

    Dataset.set(node, 'uuid', uuid);
    Dataset.set(node, 'type', TYPE);

    StyleSheet.compose(this.node, {
      position: 'absolute',
      zIndex: 1,
      width,
      height,
      border: '1px solid #b2b2b2',
    });

    this._handleInitInlineDragger();
  }

  _handleInitInlineDragger() {
    this.dragger = new Dragger(this.node, {
      isCurrent: true
    });

    this.dragger.setBeforeDraggerCallback(this._handleCallbackOfBeforeDragger.bind(this));
    this.dragger.setDraggerCallback(this._handleCallbackOfDragger.bind(this));
    this.dragger.setAfterDraggerCallback(this._handleCallbackOfCoordinate.bind(this));
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _handleCallbackOfBeforeDragger() { }

  _handleCallbackOfCoordinate() {
    const { x, y } = this.node.getBoundingClientRect();

    if (this.canvas) {
      const { origin } = this.canvas;
      const dx = x - origin.x;
      const dy = y - origin.y;

      this.setCoordinate({ x: dx, y: dy });
    }
  }

  _handleCallbackOfDragger() {
    const { FROM, TO } = CommonDirectionConstant;
    // TODO: 需要优化结构设计
    this.anchors.forEach((anchor) => {
      const { x, y } = anchor.getCoordinateToViewport();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(anchor.from).forEach(([i, item]) => {
        item.setPathToCoordinate({ x, y }, FROM);
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(anchor.to).forEach(([i, item]) => {
        item.setPathToCoordinate({ x, y }, TO);
      });
    });
  }

  getCoordinateToViewport() {
    return Coordinate.minus(Coordinate.add(this.canvas.origin, this.coordinate), this.canvas.getTranslate());
  }

  setRuntime(runtime: Runtime) {
    this.runtime = runtime;

    if (this.anchors && this.anchors.length) {
      this.anchors.forEach(anchor => {
        this.runtime.setAnchor(anchor);
      })
    }
  }

  setCanvas(canvas: Canvas) {
    this.canvas = canvas;
  }

  setStyle(style) {
    StyleSheet.compose(this.node, {
      ...style
    });
  }

  getCoordinate() {
    return this.coordinate;
  }

  setCoordinate(coordinate: XYCoordinate) {
    this.coordinate = coordinate;
    return this;
  }

  getAnchor() {
    return this.anchors;
  }

  setAnchor(anchor: Anchor) {
    this.anchors.push(anchor);
    anchor.setContainer(this);

    this.node.appendChild(anchor.render());
  }

  render() {
    return this.node;
  }

  update() {
    const { coordinate } = this;

    if (this.canvas) {
      const { origin } = this.canvas;
      const dx = coordinate.x + origin.x;
      const dy = coordinate.y + origin.y;

      StyleSheet.compose(this.node, {
        top: dy,
        left: dx,
      });
    }
  }

  toSerialize() {
    const { uuid, coordinate } = this;
    return {
      uuid,
      coordinate
    };
  }
}
