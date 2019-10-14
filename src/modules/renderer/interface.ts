interface Renderer {
  canvas: Element;
  width: number;
  height: number;

  render: Function;
  remove: Function;
}

export default Renderer;
