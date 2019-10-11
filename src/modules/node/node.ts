import { NodeInterface } from './interface';

import { Workspace } from '../workspace';
import { Point } from '../common';

import Listener from '../../lib/listener';
import UUID from '../../lib/uuid';

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

    this.onClick = this.onClick.bind(this);
    this.onDraggableStart = this.onDraggableStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDraggableFinish = this.onDraggableFinish.bind(this);

    this.mount();
  }

  mount() {
    const { container } = this.workspace;

    this.element = document.createElement('div');
    this.element.dataset['type'] = this.type;
    this.element.dataset['uuid'] = this.uuid;

    container.appendChild(this.element);

    this.setRect();

    Listener.bind(this.element, 'mousedown', this.onDraggableStart);
    Listener.bind(this.element, 'mouseup', this.onDraggableFinish);
    Listener.bind(this.element, 'click', this.onClick);
  }

  setRect() {
    this.rect = this.element.getBoundingClientRect();

    const { x, y, width, height } = this.rect as DOMRect;

    this.coordinate = {
      x: x + width / 2,
      y: y + height / 2,
    };
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
    console.warn('please rewrite the method !!!');
  }
}

export default Node;
