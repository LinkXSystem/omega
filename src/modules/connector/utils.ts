import { Element } from '../../lib/svg';
import { Connector } from '.';
import { Renderer } from '../renderer';

class ConnectorUtils {
  static compose(input: Connector, output: Connector, renderer: Renderer) {
    // TODO: 需要替换成新的 Line 模块，注意从配置传入，或 runtime 获取
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
