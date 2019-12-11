import { LineInterface } from "./interface";
import { Element } from '../../lib/svg';

/**
 * @description 目前 Line 的类型均是参考 draw.io 的类型定义。
 */

class StraightLine implements LineInterface {
  uuid: string;
  type: string;

  element: Element;

  constructor() {}
}

export default StraightLine;
