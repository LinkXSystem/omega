import Node from './node';

import { Background } from '../../constants';
import StyleSheet from '../../lib/stylesheet';
import Svg, { Element } from '../../lib/svg';

class Geometric extends Node {
  width: number;
  height: number;
  path: string;

  constructor(width: number, height: number, path: string) {
    super('geometric');

    this.width = width;
    this.height = height;
    this.path = path;
  }

  getCoordinate() {
    // TODO: 目前的实现需要实时计算，但是需要考虑可否优化
    // TODO: 由于 SVG 并不支持 offset 的获取，需要重新此部分，是否考虑使用 style 中的值

    // const { width, height } = this.element.getBoundingClientRect() as DOMRect;

    return {
      x: 0,
      y: 0
    };
  }

  handleCreateElement() {
    return Svg.createElement('svg');
  }

  setStyleSheet() {
    const { width, height } = this;
    const style = {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`
    };

    const { element } = this;

    StyleSheet.compose(element, style);
  }
}

export default Geometric;
