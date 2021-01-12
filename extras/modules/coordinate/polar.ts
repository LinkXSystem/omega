import { CartesianCoordinate } from '.';

class PolarCoordinate {
  radius: number;
  theta: number;

  constructor(radius: number, theta: number) {
    this.radius = radius;
    this.theta = theta;
  }

  toCartesian() {
    const { radius, theta } = this;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);

    return new CartesianCoordinate(x, y);
  }
}

export default PolarCoordinate;
