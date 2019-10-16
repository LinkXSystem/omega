import Box from '../box';

class Anchor {
  element: Box;

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.init();
  }

  init() {
    const { x, y } = this;
    this.element = new Box();
    this.element.setPosition('absolute').setCoordinate(x, y);
  }

  setCoordinate(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.element.setCoordinate(x, y);
  }
}

export default Anchor;
