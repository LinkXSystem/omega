import { MouseEvent } from '../../constants';

import { LineInterface } from './interface';
import { Element } from '../../lib/svg';
import Listener from '../../lib/listener';
import Renderer from '../renderer/interface';
import { SvgRenderer } from '../renderer';

/**
 * @description 目前 Line 的类型均是参考 draw.io 的类型定义。
 */

export default class Line implements LineInterface {
  coords: Array<Number>;

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

    element.bind('click', this.handleClick.bind(this));
  }

  handleClick() {
    console.warn('please rewrite the method !!!');
  }

  refresh(x1: number, y1: number, x2: number, y2: number) {
    console.warn('please rewrite the method !!!');
  }

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
