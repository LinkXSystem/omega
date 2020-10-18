import { NodeSignalConstants } from './emitter';

const Mouse = {
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MOUSEENTER: 'mouseenter',
  MOUSEMOVE: 'mousemove',
  MOUSEOVER: 'mouseover',
  MOUSELEAVE: 'mouseleave',
  CLICK: 'click'
};

/**
 * @description set the layer level of an element !
 */
const ZIndex = {
  DEFAULT: 0,
  CANVAS: -1000,
  SVG: -1,
  ELEMENT: 1000
};

const Background = {
  LINEARGRADIENT: 'linear-gradient(45deg, black, transparent)'
};

const Position = {
  ABSOLUTE: 'absolute'
};

const RendererType = {
  SVG: 'svg',
  CANVAS: 'canvas'
};

export { Mouse, ZIndex, Background, Position, RendererType, NodeSignalConstants };
