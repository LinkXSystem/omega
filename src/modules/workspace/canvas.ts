import Workspace, { WorkspaceConfiguration } from './workspace';

class CanvasWorkspace extends Workspace {
  container: HTMLElement;

  constructor(configuration: WorkspaceConfiguration) {
    super(configuration);
  }
}

export default CanvasWorkspace;
