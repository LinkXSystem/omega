import Listener from './listener';
import StyleSheet from './stylesheet';
import { Mouse } from '../constants';

const BODY = window.document.body;

//TODO: 需要优化
class Draggable {
  target: HTMLElement | SVGElement;
  source: HTMLElement;

  disabled: boolean;

  width: number;
  height: number;

  top: number;
  left: number;

  x: number;
  y: number;

  constructor(target: HTMLElement | SVGElement, source?: HTMLElement) {
    this.target = target;
    this.source = source;

    this.onDraggableStart = this.onDraggableStart.bind(this);
    this.onDraggableFinish = this.onDraggableFinish.bind(this);
    this.onDrag = this.onDrag.bind(this);

    Listener.bind(target, Mouse.MOUSEDOWN, this.onDraggableStart);
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }

  onDraggableStart(event: MouseEvent) {
    const { target, disabled } = this;

    if (disabled) {
      return;
    }

    // TODO: 当容器被设置成 absolute ，该库会出现问题
    const { top, left, width, height } = target.getBoundingClientRect();
    const { clientX, clientY } = event;

    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.x = clientX;
    this.y = clientY;

    Listener.bind(BODY, Mouse.MOUSEMOVE, this.onDrag);
    //TODO：是否也应该登记到 body 中
    Listener.bind(target, Mouse.MOUSEUP, this.onDraggableFinish);
  }

  onDrag(event: MouseEvent) {
    const { top, left, x, y, width, height, target, source } = this;

    const { clientX, clientY } = event;

    const MinTopPosition = -(height - window.innerHeight);
    const MinLeftPosition = -(width - window.innerWidth);

    let dx = left + (clientX - x);
    let dy = top + (clientY - y);

    if (dy > 0) dy = 0;

    if (dy <= MinTopPosition) dy = MinTopPosition;

    if (dx > 0) dx = 0;

    if (dx <= MinLeftPosition) dx = MinLeftPosition;

    // TODO: 需要优化
    StyleSheet.compose(source || target, {
      top: `${dy}px`,
      left: `${dx}px`
    });
  }

  onDraggableFinish() {
    const { target } = this;

    Listener.unbind(BODY, Mouse.MOUSEMOVE, this.onDrag);
    Listener.unbind(target, Mouse.MOUSEUP, this.onDraggableFinish);
  }
}

export default Draggable;
