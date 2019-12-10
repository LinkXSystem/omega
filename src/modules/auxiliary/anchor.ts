import Box from '../box';
import { MouseEvent } from '../../constants';
import Listener from '../../lib/listener';

class Anchor {
  element: Box;

  x: number;
  y: number;

  color: string;

  constructor(x: number, y: number, color: string = '#ffffff') {
    this.color = color;

    this.x = x;
    this.y = y;

    this.init();
  }

  init() {
    const { x, y } = this;
    this.element = new Box();
    this.element
      .setPosition('absolute')
      .setCoordinate(x, y)
      .setStyle({
        background: '#ffffff',
        width: 10,
        height: 10,
        border: '2px solid #1a73e8',
        'border-radius': '50%',
        transform: ' translate(-50%, -50%)',
        transition: 'all .3s ease-in-out',
      });

    Listener.bind(
      this.element.toXml(),
      MouseEvent.MOUSEOVER,
      this.onMouseover.bind(this),
    );

    Listener.bind(
      this.element.toXml(),
      MouseEvent.MOUSELEAVE,
      this.onMouseleave.bind(this),
    );
  }

  setCoordinate(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.element.setCoordinate(x, y);
  }

  onMouseover() {
    this.element.setStyle({
      width: 16,
      height: 16,
    });
  }

  onMouseleave() {
    this.element.setStyle({
      width: 10,
      height: 10,
    });
  }

  render(container: HTMLElement) {
    container.appendChild(this.element.toXml());
  }
}

export default Anchor;
