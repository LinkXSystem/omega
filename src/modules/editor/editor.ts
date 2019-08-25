import { Workspace } from '../workspace';

abstract class Editor {
  workspace: Workspace;

  constructor(container: HTMLElement) {
    this.workspace = new Workspace(container);
  }
}

export default Editor;
