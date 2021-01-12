import { Line } from './Line';
import { Container } from './container';

export interface Connector {
  uuid: string;
  line: Line;
  relation: {
    from: Container;
    to: Container;
  };
}
