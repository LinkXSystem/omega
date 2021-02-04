import { Line } from './line';
import { ContainerInterface } from './container';

export interface ConnectorInterface {
  uuid: string;
  line: Line;
  relation: {
    from: ContainerInterface;
    to: ContainerInterface;
  };
}
