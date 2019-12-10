import { Element } from '../../lib/svg';
import { Connector } from '.';
import { Renderer } from '../renderer';

class ConnectorUtils {
  static compose(input: Connector, output: Connector, renderer: Renderer) {
    const element = input.getElement() || new Element();
    renderer.render(element.toXml());

    input.setConnector(output);
    output.setConnector(input);
    // 设置控制的 DOM，更新曲线
    input.setElement(element);
    output.setElement(element);
  }

  static reverse(input: Connector, output: Connector) {}
}

export default ConnectorUtils;
