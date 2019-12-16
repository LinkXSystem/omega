import { Workspace } from '../workspace';
import { Rectangle } from '../node';
import { CommentInterface } from '../comment';

import Listener from '../../lib/listener';
import StyleSheet from '../../lib/stylesheet';

const radius = 2;

export default class Comment implements CommentInterface {
  container: Rectangle;

  width: number;
  height: number;

  textarea: HTMLElement;

  constructor(workspace: Workspace, width?: number, height?: number) {
    this.height = height || 180;
    this.width = width || 360;
    this.container = new Rectangle(workspace, this.width, this.height, radius);
  }

  created() {
    const { container } = this;

    let textarea = document.createElement('textarea');
    this.textarea = textarea;
    this.setStyleSheet();
    this.handleRegisterEvent();

    container.getElement().appendChild(textarea);
  }

  setCoordinate(x: number, y: number) {
    this.container.setCoordinate(x, y);
  }

  setStyleSheet(styles?: Object) {
    const { textarea } = this;

    let temp = styles || {
      width: '100%',
      height: '100%',
      border: '0px',
      'border-radius': '2px',
      outline: 'none',
      padding: '4px 8px',
      resize: 'none'
    };

    StyleSheet.compose(textarea, temp);
  }

  handleRegisterEvent() {
    const { textarea } = this;

    Listener.bind(textarea, 'click', this.handleClick.bind(this));
  }

  handleClick(event: MouseEvent) {
    event.stopPropagation();
  }

  render() {
    let { container, textarea } = this;

    if (!textarea) {
      this.created();
    }

    container.render();
  }
}
