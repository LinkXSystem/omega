// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rotate = function(points: Array<number>, angle: number): Array<number> {
  const [i, j] = points;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const x = i * cos - j * sin;
  const y = i * cos + j * sin;

  return [x, y];
};

class Vector {
  x: number;
  y: number;
  z: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  set(option: { x: number; y: number; z: number }) {
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.z = option.z || 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  rotateX() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  rotateY() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  rotateZ() {}
}

export { Vector };
