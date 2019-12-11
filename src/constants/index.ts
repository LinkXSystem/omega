const MouseEvent = {
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MOUSEENTER: 'mouseenter',
  MOUSEMOVE: 'mousemove',
  MOUSEOVER: 'mouseover',
  MOUSELEAVE: 'mouseleave',
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
}

export { MouseEvent, ZIndex, Background};
