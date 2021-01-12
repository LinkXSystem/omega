import { InputConnector, OutputConnector } from './modules/connector';
import {
  SvgWorkspace,
  CanvasWorkspace,
  WorkspaceConfiguration
} from './modules/workspace';
import { Node, Circle, Rectangle, Diamond } from './modules/node';
import { Comment } from './modules/accessibility/comment';
import { RendererType } from './constants';

interface Configuration {
  workspace: WorkspaceConfiguration;
  type: string;
}

function inject(configuration: Configuration) {
  const config = configuration.workspace;
  let workspace;

  switch (configuration.type) {
    case RendererType.SVG:
      workspace = new SvgWorkspace(config);
      break;
    case RendererType.CANVAS:
      workspace = new CanvasWorkspace(config);
      break;
    default:
      throw new Error('Your must select the type of renderer');
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
