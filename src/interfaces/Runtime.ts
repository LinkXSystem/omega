import { Container } from "./container";
import { Connector } from "../../extras/modules/connector";

export interface Runtime {
  containers: Map<string, Container>;
  edge: Map<string, Connector>;
}
