import { XYCoordinate } from '../../../packages/type';

export interface Area {
  width: number;
  height: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TL(area: Area): XYCoordinate {
  return {
    x: 0,
    y: 0
  }
}

function TM(area: Area): XYCoordinate {
  const { width } = area;

  return {
    x: width / 2,
    y: 0
  }
}

function TR(area: Area): XYCoordinate {
  const { width } = area;

  return {
    x: width,
    y: 0
  }
}

function ML(area: Area): XYCoordinate {
  const { height } = area;

  return {
    x: 0,
    y: height / 2
  }
}

function MR(area: Area): XYCoordinate {
  const { width, height } = area;

  return {
    x: width,
    y: height / 2
  }
}

function BL(area: Area): XYCoordinate {
  const { height } = area;

  return {
    x: 0,
    y: height
  }
}

function BM(area: Area): XYCoordinate {
  const { width, height } = area;

  return {
    x: width / 2,
    y: height
  }
}

function BR(area: Area): XYCoordinate {
  const { width, height } = area;

  return {
    x: width,
    y: height
  }
}

export {
  TL,
  TM,
  TR,
  ML,
  MR,
  BL,
  BM,
  BR
}
