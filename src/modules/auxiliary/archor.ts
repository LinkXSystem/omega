import Box from '../box';

class Archar {
  element: Box;

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  init() {
    this.element = new Box();
  }
}

export default Archar;
