import { NodeInterface } from './interface';

import { ZIndex } from '../../constants';
import { Workspace } from '../workspace';
import { Point } from '../common';

import Listener from '../../lib/listener';
import UUID from '../../lib/uuid';
import StyleSheet from '../../lib/stylesheet';

import { Connector } from '../connector';

abstract class Node implements NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement | SVGElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  isDraggable: boolean;

  isCouldConnect: boolean;

  connectors: Array<Connector>;

  constructor(type: string) {
    this.uuid = UUID.generate();

    this.isDraggable = false;
    this.type = type;
    this.isCouldConnect = true;

    this.onDraggableStart = this.onDraggableStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDraggableFinish = this.onDraggableFinish.bind(this);

    this.handleRefreshConnects = this.handleRefreshConnects.bind(this);
  }

  handleCreateElement(): HTMLElement | SVGElement {
    // TODO: 需要设置 `use-select: none;`, 否则存在拓展异常
    return document.createElement('div');
  }

  created() {
    this.element = this.handleCreateElement();

    this.element.dataset['type'] = this.type;
    this.element.dataset['uuid'] = this.uuid;

    StyleSheet.compose(this.element, {
      'user-select': 'none'
    });

    // TODO：未来需要考虑鼠标右键的问题
    Listener.bind(this.element, 'mousedown', this.onDraggableStart);
    Listener.bind(this.element, 'mouseup', this.onDraggableFinish);
    Listener.bind(this.element, 'mouseover', this.onDraggableFinish);
    // Listener.bind(this.element, 'mouseleave', this.onDraggableFinish);

    Listener.bind(this.element, 'contextmenu', (event: MouseEvent) => {
      event.preventDefault();
    });
  }

  mounted() {
    console.warn('It is mount of stage in node !!!');
  }

  getIsCouldConnect() {
    return this.isCouldConnect;
  }

  setIsCouldConnect(status: boolean) {
    this.isCouldConnect = status;
  }

  getElement() {
    if (!this.element) {
      this.created();
    }

    return this.element;
  }

  getWorkspace(): Workspace {
    return this.workspace;
  }

  setWorkspace(workspace: Workspace) {
    this.workspace = workspace;
  }

  getShapeInfos(): DOMRect | ClientRect {
    return this.element.getBoundingClientRect();
  }

  setStyleSheet() {
    console.warn('please rewrite the method !!!');
  }

  getCoordinate() {
    // TODO: 目前的实现需要实时计算，但是需要考虑可否优化

    const { offsetLeft, offsetTop } = this.element as HTMLElement;
    const { width, height } = this.element.getBoundingClientRect() as DOMRect;

    return {
      x: offsetLeft + width / 2,
      y: offsetTop + height / 2
    };
  }

  setCoordinate(x: number, y: number) {
    // TODO: 需要考虑更新坐标的问题，是否考虑启用 translate 的方式，而非 setCoordinate
    this.coordinate = {
      x,
      y
    };
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

  onDraggableStart() {
    // event.stopPropagation();

    StyleSheet.compose(this.element, {
      position: 'absolute',
      zIndex: ZIndex.ELEMENT
    });

    Listener.bind(this.element, 'mousemove', this.onDrag);
  }

  onDrag(event: MouseEvent) {
    // event.stopPropagation();

    // TODO: 非规则的几何图形的 width 和 height 会导致计算偏差。需要重写获取宽高的方法
    // TODO: 坐标系统需要重新设计
    const { offsetTop, offsetLeft } = this.element as HTMLElement;
    const { movementX, movementY } = event;

    this.isDraggable = true;

    StyleSheet.compose(this.element, {
      top: `${offsetTop + movementY}px`,
      left: `${offsetLeft + movementX}px`
    });

    this.handleRefreshConnects();
  }

  onDraggableFinish() {
    // event.stopPropagation();

    StyleSheet.compose(this.element, {
      zIndex: ZIndex.DEFAULT
    });

    Listener.unbind(this.element, 'mousemove', this.onDrag);
  }

  handleRefreshConnects() {
    const { connectors } = this;
    if (connectors && connectors.length) {
      const { x, y } = this.getCoordinate();

      connectors.forEach(connector => {
        connector.refresh(x, y);
      });
    }
  }

  render() {
    if (!this.workspace) {
      return console.error('The workspace is undefined !!!');
    }

    const { container } = this.workspace;
    if (!this.element) {
      this.created();
    }
    container.appendChild(this.element);

    this.setStyleSheet();

    this.mounted();
  }

  destroy(callback: Function) {
    const { container } = this.workspace;
    container.removeChild(this.element);

    callback();
  }

  toJSON() {
    return JSON.stringify(this);
  }
}

export default Node;
