import { ContainerInterface } from "./container";

export interface CanvasInterface {
  uuid: string;
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

  containers: Array<ContainerInterface>;

  events: Array<Event>;
}
