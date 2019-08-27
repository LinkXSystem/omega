import Listener from '../../lib/listener';
import UUID from '../../lib/uuid';
import { Workspace } from '../workspace';
import { Point } from '../common';

interface NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  render: Function;
}

abstract class Node implements NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;
  rect: DOMRect | ClientRect;
  coordinate: Point;
  workspace: Workspace;

  constructor(workspace: Workspace, type: string) {
    this.uuid = UUID.generate();

    this.type = type;
    this.workspace = workspace;

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

    Listener.bind(this.element, 'mousedown', this.onDraggableStart);
    Listener.bind(this.element, 'mouseup', this.onDraggableFinish);
  }

  setRect() {
    this.rect = this.element.getBoundingClientRect();
  }

  onDraggableStart(event: MouseEvent) {
    Listener.bind(this.element, 'mousemove', this.onDrag);
  }

  onDrag(event: MouseEvent) {
    const { width, height } = this.rect;
    const { x, y } = event;

    this.element.style.position = 'absolute';
    this.element.style.left = `${x - width / 2}px`;
    this.element.style.top = `${y - height / 2}px`;
  }

  onDraggableFinish(event: MouseEvent) {
    Listener.unbind(this.element, 'mousemove', this.onDrag);
  }

  render() {
    console.warn('please rewrite the method !!!');
  }
}

export default Node;
