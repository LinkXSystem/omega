import Workspace from './workspace';

class CanvasWorkspace extends Workspace {
  container: HTMLElement;

  constructor(container: HTMLElement, width?: number, height?: number) {
    super(container);
  }
}

export default CanvasWorkspace;
