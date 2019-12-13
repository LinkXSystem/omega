import { Workspace } from '../workspace';
import { Rectangle } from '../node';

const radius = 2;

// TODO: 该模块应该基于 node 模块实现设计，但这个模块只能移动，不可以参与连接
class Comment {
  container: Rectangle;

  width: number;
  height: number;

  constructor(workspace: Workspace, width?: number, height?: number) {
    this.height = height || 100;
    this.width = width || 200;
    this.container = new Rectangle(workspace, width, height, radius);
  }

  init() {
    const { container } = this;
    this.textarea = document.createElement('textarea');
    container.getElement().appendChild(textarea);
  }

  render() {
    const { container, textarea } = this;

    if (!textarea) {
      this.init();
    }
    container.render();
  }
}

export default Comment;
