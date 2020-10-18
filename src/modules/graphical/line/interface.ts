import { Element } from '../../../lib/svg';

export interface LineInterface {
  uuid: string;
  type: string;

  // TODO: 需要考虑 Canvas 的问题
  element: Element;

  refresh: Function;
  render: Function;
}
