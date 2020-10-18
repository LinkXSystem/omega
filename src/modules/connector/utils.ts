import { Connector } from '.';

import { Renderer } from '../renderer';
import { LineUtils } from '../line';

class ConnectorUtils {
  static compose(input: Connector, output: Connector, renderer: Renderer) {
    // TODO: 需要替换成新的 Line 模块，注意从配置传入，或 runtime 获取
    const line = input.getElement() || LineUtils.getLineInstancebyType('simple');
    line.render(renderer);

    input.setConnector(output);
    output.setConnector(input);
    // 设置控制的 DOM，更新曲线
    input.setElement(line);
    output.setElement(line);
  }

  static reverse(input: Connector, output: Connector) {
    console.warn("unimplemented feature !", input, output);
  }
}

export default ConnectorUtils;
