import Listener from '../../lib/listener';
import UUID from '../../lib/uuid';
import { Workspace } from '../workspace';

interface NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;

  rect: DOMRect | ClientRect;

  workspace: Workspace;

  render: Function;
}

abstract class Node implements NodeInterface {
  uuid: string;
  type: string;

  element: HTMLElement;
  rect: DOMRect | ClientRect;
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
    console.log(event);
    Listener.bind(this.element, 'mousemove', this.onDrag);
  }

  onDrag(event: MouseEvent) {
    console.log(event);
    // const { x, y } = event;

    // this.element.style.position = 'absolute';
    // this.element.style.left = `${x}px`;
    // this.element.style.top = `${y}px`;
  }

  onDraggableFinish(event: MouseEvent) {
    console.log(event);
    Listener.unbind(this.element, 'mousemove', this.onDrag);
  }

  render() {
    console.warn('please rewrite the method !!!');
  }
}

export default Node;
