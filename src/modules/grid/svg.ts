import SVG from '../../lib/svg';
import { SvgRenderer } from '../renderer';
import UUID from '../../lib/uuid';

interface PatternAttribute {
  x: number;
  y: number;
  width: number;
  height: number;
  patternUnits: 'userSpaceOnUse' | 'userSpaceOnUse';
}

class SvgGrid {
  element: SVGElement;

  mask: SVGElement;
  rect: SVGElement;

  uuid: string;

  config: PatternAttribute;

  constructor(config: PatternAttribute, element?: SVGElement) {
    this.uuid = UUID.generate();
    this.config = config;
    this.element = element || this.handleInitDefaultElement();
  }

  handleInitMask() {
    const { config, element, uuid } = this;
    this.mask = SVG.createElement(
      'pattern',
      Object.assign({}, config, {
        id: uuid
      })
    );
    this.mask.append(element);
    return this.mask;
  }

  handleInitRect() {
    const { uuid } = this;
    this.rect = SVG.createElement('rect', {
      x: 0,
      y: 0,
      fill: `url(#${uuid})`
    });
    return this.rect;
  }

  handleInitDefaultElement() {
    const { width, height } = this.config;

    return SVG.createElement('circle', {
      cx: width / 2,
      cy: height / 2,
      r: 1,
      fill: '#dddddd'
    });
  }

  render(renderer: SvgRenderer) {
    const { width, height } = renderer;
    let { mask, uuid, rect } = this;

    if (!mask) {
      mask = this.handleInitMask();
      renderer.render(mask);
    }

    if (!rect) {
      rect = this.handleInitRect();
    }

    SVG.setAttributes(rect, {
      width,
      height
    });

    renderer.render(rect);
  }
}

export default SvgGrid;
