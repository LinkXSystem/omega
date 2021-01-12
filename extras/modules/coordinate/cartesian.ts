import PolarCoordinate from './polar';

class CartesianCoordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone() {
    const { x, y } = this;
    return new CartesianCoordinate(x, y);
  }

  equal(coordinate: CartesianCoordinate) {
    const { x, y } = this;
    let status = true;
    if (x !== coordinate.x || y !== coordinate.y) {
      status = false;
    }
    return status;
  }

  distance() {}

  azimuth() {}

  translate(tx: number, ty: number) {
    const { x, y } = this;
    return new CartesianCoordinate(x + tx, y + ty);
  }

  scale() {}

  rotate() {}

  toString() {
    const { x, y } = this;
    return `(${x}, ${y})`;
  }

  toXml() {}

  toPolar() {
    const { x, y } = this;
    const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const theta = Math.atan(x / y);
    return new PolarCoordinate(r, theta);
  }
}

export default CartesianCoordinate;
