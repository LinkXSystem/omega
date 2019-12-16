import { LineInterface } from './interface';
import { Element } from '../../lib/svg';

import Listener from '../../lib/listener';

/**
 * @description 目前 Line 的类型均是参考 draw.io 的类型定义。
 */

export default class Line implements LineInterface {
  uuid: string;
  type: string;

  element: Element;

  constructor() {
    this.element = new Element();
  }

  handleRegisterEvent() {
    const { element } = this;

    element.bind(MouseEvent.CLICK, this.handleClick.bind(this));
  }

  handleClick() {
    console.warn('please rewrite the method !!!');
  }

  refresh(x1: number, y2: number, x2: number, y2: number) {
    console.warn('please rewrite the method !!!');
  }

  // TODO: 未定义如何渲染
  render() {}
}
