import { Node } from '../node';

interface CommentInterface {
  container: Node;
  width: number;
  height: number;
  textarea: HTMLElement;

  setCoordinate: Function;
  setStyleSheet: Function;

  render: Function;
}

export default CommentInterface;
