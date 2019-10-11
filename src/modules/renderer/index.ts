// import Renderer from './interface';

import CanvasRenderer from './canvas';
import SvgRenderer from './svg';

interface Renderer {
  canvas: Element;
  width: number;
  height: number;

  render: Function;
}

export { Renderer, CanvasRenderer, SvgRenderer };
