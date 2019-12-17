import { Element } from '../../lib/svg';
import { Connector } from '.';
import { Renderer } from '../renderer';
import { CurvedLine } from '../line';

class ConnectorUtils {
  static compose(input: Connector, output: Connector, renderer: Renderer) {
    // TODO: 需要替换成新的 Line 模块，注意从配置传入，或 runtime 获取
    const line = input.getElement() || new CurvedLine();
    line.render(renderer);

    input.setConnector(output);
    output.setConnector(input);
    // 设置控制的 DOM，更新曲线
    input.setElement(line);
    output.setElement(line);
  }

  static reverse(input: Connector, output: Connector) {}
}

export default ConnectorUtils;
