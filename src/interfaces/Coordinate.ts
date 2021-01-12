// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Coordinate {
}

export interface XYCoordinate extends Coordinate {
  x: number;
  y: number;
}

export interface XYZCoordinate extends Coordinate {
  x: number;
  y: number;
  z: number;
}
