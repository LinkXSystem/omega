export interface CoordinateInterface {
  x: number;
  y: number;
}

export class Coordinate {
  static add(i: CoordinateInterface, j: CoordinateInterface): CoordinateInterface {
    return {
      x: i.x + j.x,
      y: i.y + j.y
    }
  }

  static minus(i: CoordinateInterface, j: CoordinateInterface): CoordinateInterface {
    return {
      x: i.x - j.x,
      y: i.y - j.y
    }
  }
}
