import { Mouse } from '../../../constants';

import { LineInterface } from './interface';
import { Element } from '../../../lib/svg';
import { Renderer } from '../../renderer';

/**
 * @description 目前 Line 的类型均是参考 draw.io 的类型定义。
 */

export default abstract class Line implements LineInterface {
  coords: Array<number>;

  uuid: string;
  type: string;

  element: Element;

  isMount: boolean;

  constructor(type?: string) {
    this.element = new Element();
    this.type = type || 'line';
  }

  handleRegisterEvent() {
    const { element } = this;

    element.bind(Mouse.CLICK, this.handleClick.bind(this));
  }

  handleClick() {
    console.warn('please rewrite the method !!!');
  }

  abstract refresh(x1: number, y1: number, x2: number, y2: number);

  // TODO: 未定义如何渲染
  render(renderer: Renderer) {
    const { element, isMount } = this;
    renderer.render(element.toXml());

    if (!isMount) {
      this.handleRegisterEvent();
      this.isMount = true;
    }
  }

  toXml() {
    const { element } = this;
    return element.toXml();
  }
}
