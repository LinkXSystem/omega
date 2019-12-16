interface CommentInterface {
  container: Rectangle;
  width: number;
  height: number;
  textarea: HTMLElement;

  setCoordinate: Function;
  setStyleSheet: Function;

  render: Function;
}

export default CommentInterface;
