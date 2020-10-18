import { Renderer } from './interface';

import SVG from '../../lib/svg';
import Draggable from '../../lib/draggable';

import { SvgGrid } from '../graphical/grid';
import { Workspace } from '../workspace';

class SvgRenderer implements Renderer {
  canvas: SVGElement;
  width: number;
  height: number;
  grid: SvgGrid;
  workspace: Workspace;

  isRender: boolean;

  draggable: Draggable;

  constructor(workspace: Workspace) {
    const { width, height } = workspace.container.getBoundingClientRect();

    const canvas = SVG.createElement('svg', {
      width,
      height,
      viewBox: `0, 0, ${width}, ${height}`,
      xmlns: SVG.Namespace,
      style: `position: absolute;`
    });

    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.workspace = workspace;
    this.grid = new SvgGrid({
      x: 0,
      y: 0,
      width: 20,
      height: 20,
      patternUnits: 'userSpaceOnUse'
    });

    this.init();
  }

  init() {
    const { workspace, canvas, grid } = this;
    const { container } = workspace;
    grid.render(this);
    container.appendChild(canvas);

    this.draggable = new Draggable(canvas, container);
  }

  resize(container: HTMLElement) {
    const { width, height } = container.getBoundingClientRect();
    SVG.setAttributes(this.canvas, {
      width,
      height,
      viewBox: `0, 0, ${width}, ${height}`
    });

    this.height = height;
    this.width = width;
    this.grid.render(this);
  }

  render(element: Element) {
    this.canvas.appendChild(element);
  }

  remove(element: Element) {
    this.canvas.removeChild(element);
  }
}

export default SvgRenderer;
