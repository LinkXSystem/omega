import { Box } from '../../common';
import { Mouse } from '../../../constants';

class Anchor {
  element: Box;

  x: number;
  y: number;

  width: number;
  height: number;

  color: string;

  constructor(x: number, y: number, color = '#ffffff') {
    this.color = color;

    this.x = x;
    this.y = y;

    this.width = 8;
    this.height = 8;

    this.init();
  }

  init() {
    const { x, y, width, height } = this;
    this.element = new Box();
    this.element
      .setPosition('absolute')
      .setCoordinate(x, y)
      .setStyle({
        'box-sizing': 'border-box',
        width,
        height,
        border: '2px solid #1a73e8',
        'border-radius': '50%',
        background: '#ffffff',
        transform: ' translate(-50%, -50%)'
      });
  }

  setCoordinate(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.element.setCoordinate(x, y);
  }

  onMouseover() {
    this.element.setStyle({
      width: 16,
      height: 16
    });
  }

  onMouseleave() {
    this.element.setStyle({
      width: 10,
      height: 10
    });
  }

  render(container: HTMLElement) {
    this.element.setContainer(container);
  }
}

export default Anchor;
