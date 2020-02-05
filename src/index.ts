import { InputConnector, OutputConnector } from './modules/connector';
import { SvgWorkspace, CanvasWorkspace } from './modules/workspace';
import { Node, Circle, Rectangle, Diamond } from './modules/node';
import { Comment } from './modules/comment';
import { RendererType } from './constants';

interface EditorOption {
  container: HTMLElement;
  type: string;
}

function inject(option: EditorOption) {
  const { container, type } = option;

  let workspace;

  switch (type) {
    case RendererType.SVG:
      workspace = new SvgWorkspace(container);
      break;
    case RendererType.CANVAS:
    default:
      workspace = new CanvasWorkspace(container);
  }

  return workspace;
}

export {
  inject,
  SvgWorkspace,
  CanvasWorkspace,
  InputConnector,
  OutputConnector,
  Node,
  Circle,
  Rectangle,
  Diamond,
  Comment
};
