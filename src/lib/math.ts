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

  constructor() {}

  set(option: { x: number; y: number; z: number }) {
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.z = option.z || 0;
  }

  rotateX() {}

  rotateY() {}

  rotateZ() {}
}

export { Vector };
