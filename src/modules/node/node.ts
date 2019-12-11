import { NodeInterface } from "./interface";

import { ZIndex } from '../../constants';
import { Workspace } from "../workspace";
import { Point } from "../common";

import Listener from "../../lib/listener";
import UUID from "../../lib/uuid";
import StyleSheet from "../../lib/stylesheet";

import { Connector } from "../connector";

import { Auxiliary } from "../auxiliary";

abstract class Node implements NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement | SVGElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  isDraggable: boolean;

  connectors: Array<Connector>;

  auxiliary: Auxiliary;

  constructor(workspace: Workspace, type: string) {
    this.uuid = UUID.generate();

    this.isDraggable = false;
    this.type = type;
    this.workspace = workspace;

    this.onDraggableStart = this.onDraggableStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDraggableFinish = this.onDraggableFinish.bind(this);
    this.onClick = this.onClick.bind(this);

    this.handleRefreshConnects = this.handleRefreshConnects.bind(this);
  }

  created() {
    this.element = this.getElement();
    this.element.dataset["type"] = this.type;
    this.element.dataset["uuid"] = this.uuid;

    // TODO：未来需要考虑鼠标右键的问题
    Listener.bind(this.element, "mousedown", this.onDraggableStart);
    Listener.bind(this.element, "mouseup", this.onDraggableFinish);
    Listener.bind(this.element, "mouseover", this.onDraggableFinish);
    Listener.bind(this.element, "mouseleave", this.onDraggableFinish);
    Listener.bind(this.element, "click", this.onClick);

    Listener.bind(this.element, "contextmenu", (event: MouseEvent) => {
      event.preventDefault();
    });
  }

  mounted() {
    console.warn("It is mount of stage in node !!!");
  }

  getElement() {
    return this.element || document.createElement("div");
  }

  getShapeInfos() {
    return this.element.getBoundingClientRect();
  }

  setShapeInfos() {
    this.rect = this.element.getBoundingClientRect();

    const { top, left, width, height } = this.rect as DOMRect;

    this.coordinate = {
      x: left + width / 2,
      y: top + height / 2
    };
  }

  setStyleSheet() {
    console.warn("please rewrite the method !!!");
  }

  getCoordinate() {
    return this.coordinate;
  }

  setCoordinate(x: number, y: number) {
    const { element } = this;
    StyleSheet.compose(element, {
      left: `${x}px`,
      top: `${y}px`
    });
    this.setShapeInfos();
  }

  setConnector(connector: Connector) {
    if (!this.connectors) {
      this.connectors = [];
    }
    this.connectors.push(connector);
  }

  delConnector(connector: Connector) {
    if (!this.connectors) return;
    this.connectors = this.connectors.filter(
      item => item.uuid !== connector.uuid
    );
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();

    if (this.isDraggable) {
      this.isDraggable = false;
      return;
    }

    const { emitter } = this.workspace;
    emitter.emit("node:connect", {
      node: this
    });

    // this.auxiliary.setDisabled(true);
  }

  onDraggableStart(event: MouseEvent) {
    event.stopPropagation();

    StyleSheet.compose(this.element, {
      position: "absolute",
      zIndex: ZIndex.ELEMENT,
    });

    Listener.bind(this.element, "mousemove", this.onDrag);
  }

  onDrag(event: MouseEvent) {
    event.stopPropagation();

    // TODO: 非规则的几何图形的 width 和 height 会导致计算偏差。需要重写获取宽高的方法
    const { width, height } = this.rect;
    const { x, y } = event;

    this.isDraggable = true;

    this.coordinate = {
      x,
      y
    };

    StyleSheet.compose(this.element, {
      top: `${y - height / 2}px`,
      left: `${x - width / 2}px`
    });

    this.handleRefreshConnects();
  }

  onDraggableFinish(event: MouseEvent) {
    event.stopPropagation();

    StyleSheet.compose(this.element, {
      zIndex: ZIndex.DEFAULT,
    });
    
    Listener.unbind(this.element, "mousemove", this.onDrag);
  }

  handleRefreshConnects() {
    const { connectors, coordinate } = this;
    if (connectors && connectors.length) {
      const { x, y } = coordinate;
      connectors.forEach(connector => {
        connector.refresh(x, y);
      });
    }
  }

  render() {
    const { container } = this.workspace;
    if (!this.element) {
      this.created();
    }
    container.appendChild(this.element);

    this.setStyleSheet();
    this.setShapeInfos();

    this.mounted();
  }

  destroy(callback: Function) {
    const { container } = this.workspace;
    container.removeChild(this.element);

    callback();
  }
}

export default Node;
