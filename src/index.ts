import { InputConnector, OutputConnector } from './modules/connector';
import { Workspace } from './modules/workspace';
import { Node, Circle } from './modules/node';

interface EditorOption {
  container: HTMLElement;
}

function inject(option: EditorOption) {
  const { container } = option;
  new Workspace(container);
}

export { inject, Workspace, InputConnector, OutputConnector, Node, Circle };
