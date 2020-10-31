import { Position, Background } from '../../../constants';

import Anchor from './anchor';
import { Box } from '../../common';
import { Workspace } from '../../workspace';

class AuxiliaryRectangle {
  anchors: Array<Anchor>;
  disabled: boolean;
  element: Box;

  isRender: boolean;

  workspace: Workspace;

  constructor(workspace: Workspace) {
    this.workspace = workspace;

    this.isRender = false;
  }

  _initialAnchors() {
    this.anchors = new Array<Anchor>();

    const counter = 8;
    const x = 0;
    const y = 0;

    // TODO: 顺时针构建 anchor 点
    for (let i = 0; i < counter; i++) {
      const anchor = new Anchor(x, y);
      this.anchors.push(anchor);
      anchor.render(this.element.toXml());
    }
  }

  render() {
    if (this.isRender) {
      return;
    }

    this.isRender = true;


    const { workspace } = this;
    const { container } = workspace;

    this.element = new Box();
    this.element.setContainer(container);

    if (!this.anchors) {
      this._initialAnchors();
    }

    this.element.setDataProperty('type', 'auxiliary');
    this.element.setStyle({
      position: Position.FIXED,
      background: Background.TRANSPARENT
    });
  }

  update(width: number, height: number, top?: number, left?: number) {
    this.render();

    this.element.setStyle({
      top: top || 0,
      left: left || 0,
      zIndex: 1,
      width,
      height,
      border: '1px dashed rgb(189, 189, 189)'
    });

    const lt = this.anchors[0];
    const mt = this.anchors[1];
    const rt = this.anchors[2];
    const rm = this.anchors[3];
    const rb = this.anchors[4];
    const mb = this.anchors[5];
    const lb = this.anchors[6];
    const lm = this.anchors[7];

    // TODO：以 px 为单位
    const offset = 2;

    lt.setCoordinate(-offset, 0);
    mt.setCoordinate(width / 2 - offset, 0);
    rt.setCoordinate(width - offset, 0);
    rm.setCoordinate(width - offset, height / 2);
    rb.setCoordinate(width - offset, height - offset);
    mb.setCoordinate(width / 2, height - offset);
    lb.setCoordinate(-offset, height - offset);
    lm.setCoordinate(-offset, height / 2);
  }
}

export default AuxiliaryRectangle;
