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
  pattern: SVGElement;

  uuid: string;

  config: PatternAttribute;

  constructor(config: PatternAttribute, element?: SVGElement) {
    this.uuid = UUID.generate();
    this.config = config;
    this.element = element || this.handleInitDefaultElement();
  }

  handleInitPattern() {
    const { config, element } = this;
    this.pattern = SVG.createElement(
      'pattern',
      Object.assign({}, config, {
        id: 'zhi'
      })
    );
    this.pattern.append(element);
    return this.pattern;
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
    let { pattern, uuid } = this;
    if (!pattern) {
      pattern = this.handleInitPattern();
    }
    const { width, height } = renderer;
    const rect = SVG.createElement('rect', {
      x: 0,
      y: 0,
      width,
      height,
      fill: `url(#zhi)`
    });
    renderer.render(pattern);
    renderer.render(rect);
  }
}

export default SvgGrid;
