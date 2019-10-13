import { NodeInterface } from './interface';

import { Workspace } from '../workspace';
import { Point } from '../common';

import Listener from '../../lib/listener';
import UUID from '../../lib/uuid';
import StyleSheet from '../../lib/stylesheet';

import { Connector, InputConnector } from '../connector';

abstract class Node implements NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  connector: Connector;

  constructor(workspace: Workspace, type: string) {
    this.uuid = UUID.generate();

    this.type = type;
    this.workspace = workspace;

    this.onDraggableStart = this.onDraggableStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDraggableFinish = this.onDraggableFinish.bind(this);
    this.onClick = this.onClick.bind(this);

    this.created();
  }

  created() {
    this.element = document.createElement('div');
    this.element.dataset['type'] = this.type;
    this.element.dataset['uuid'] = this.uuid;

    Listener.bind(this.element, 'mousedown', this.onDraggableStart);
    Listener.bind(this.element, 'mouseup', this.onDraggableFinish);
    Listener.bind(this.element, 'mouseover', this.onDraggableFinish);
    Listener.bind(this.element, 'mouseleave', this.onDraggableFinish);
    Listener.bind(this.element, 'click', this.onClick);
  }

  mounted() {
    console.warn('It is mount of stage in node !!!');
  }

  setShapeInfos() {
    this.rect = this.element.getBoundingClientRect();

    const { x, y, width, height } = this.rect as DOMRect;

    this.coordinate = {
      x: x + width / 2,
      y: y + height / 2,
    };
  }

  setStyleSheet() {
    console.warn('please rewrite the method !!!');
  }

  setPosition(x: number, y: number) {
    const { element } = this;
    this.coordinate = {
      x,
      y,
    };
    StyleSheet.compose(
      element,
      {
        left: `${x}px`,
        top: `${y}px`,
      },
    );
  }

  onClick() {
    const { emitter } = this.workspace;

    const { x, y } = this.coordinate;

    this.connector = new InputConnector(x, y);

    emitter.emit('node:connect', {
      uuid: this.uuid,
      connector: this.connector,
    });
  }

  onDraggableStart(event: MouseEvent) {
    Listener.bind(this.element, 'mousemove', this.onDrag);
  }

  onDrag(event: MouseEvent) {
    const { width, height } = this.rect;
    const { x, y } = event;

    this.coordinate = {
      x: x - width / 2,
      y: y - height / 2,
    };

    this.element.style.position = 'absolute';
    this.element.style.left = `${this.coordinate.x}px`;
    this.element.style.top = `${this.coordinate.y}px`;
  }

  onDraggableFinish(event: MouseEvent) {
    Listener.unbind(this.element, 'mousemove', this.onDrag);
  }

  render() {
    const { container } = this.workspace;
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
