import { Container } from "./container";

export interface Canvas {
  uuid: string;
  root: HTMLDivElement;
  node: HTMLDivElement;

  width: number;
  height: number;

  origin: {
    x: number;
    y: number;
  };
  matrix: Array<number>;
  scale: number;
  translate: {
    x: number;
    y: number;
  };

  containers: Container;

  events: Array<Event>;
}
