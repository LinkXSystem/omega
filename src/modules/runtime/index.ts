import { Connector } from "../../interfaces/Connector";
import { Container } from "../../interfaces/Container";
import { Anchor } from "../../interfaces/Anchor";

class Runtime {
  containers: Array<Container>;

  connectors: {
    from: Array<Connector>;
    to: Array<Connector>;
  }

  // 内建缓存
  _AnchorBuffer: Array<Anchor>;
  _ConnectorBuffer: Array<Connector>;

  anchors: Array<Anchor>;

  // eslint-disable-next-line
  setCurrentConnector() { }

  // eslint-disable-next-line
  handleLockConnector() { }
}
