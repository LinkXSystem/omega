import { ConnectorInterface } from "../../../packages/type";

import { Container } from "../container";
import { Canvas } from "../canvas";

import { Dragger } from '../../../packages/dragger';
import { Anchor } from "../anchor";
import { Connector } from "../connector";

export class Runtime {
  root: HTMLElement;

  canvas: Canvas;

  containers: Array<Container>;

  connectors: {
    from: Array<ConnectorInterface>;
    to: Array<ConnectorInterface>;
  }

  _connector: Connector;

  anchors: Map<string, Anchor>;

  dragger: Dragger;

  constructor(root: HTMLElement) {
    this.root = root;

    this.initial();
  }

  initial() {
    // eslint-disable-next-line no-undef
    this.anchors = new Map<string, Anchor>();
    this.containers = [];
    this.connectors = { from: [], to: [] };

    const { width, height } = this._handleRootElement();
    this.canvas = new Canvas();
    this.canvas.setViewport(width, height);

    this._handleDragger();
  }

  _handleRootElement() {
    return this.root.getBoundingClientRect();
  }

  _handleDragger() {
    let _temp = {
      x: 0,
      y: 0
    };

    this.dragger = new Dragger(this.root);
    this.dragger.setBeforeDraggerCallback(() => {
      const { node } = this.canvas;
      const { x, y } = node.getBoundingClientRect();

      _temp = Object.assign({}, {
        x, y
      });
    });

    this.dragger.setDraggerCallback((event, position) => {
      if (this.canvas) {
        const { x, y } = position;
        this.canvas.setTranslate(_temp.x + x, _temp.y + y);
      }
    });

    this.dragger.setAfterDraggerCallback(() => {
      _temp = { x: 0, y: 0 };
    });
  }

  // eslint-disable-next-line
  setCurrentConnector() { }

  // eslint-disable-next-line
  handleLockConnector() { }

  setAnchor(anchor: Anchor) {
    const { uuid } = anchor;
    this.anchors.set(uuid, anchor);

    anchor.setEvent('mousedown', (event: MouseEvent) => {
      event.stopPropagation();

      const target = event.target as HTMLElement;
      const { x, y } = target.getBoundingClientRect();
      const id = target.dataset.uuid;
      const type = target.dataset.type;

      const _anchor = this.anchors.get(id);

      const startY = event.clientY;
      const startX = event.clientX;

      // eslint-disable-next-line
      const self = this;

      function _handleMouseMove(eventM: MouseEvent) {
        eventM.stopPropagation();

        const currX = eventM.clientX;
        const currY = eventM.clientY;

        const dy = currY - startY;
        const dx = currX - startX;

        self._connector.setPath({
          x,
          y
        }, {
          x: x + dx,
          y: y + dy
        });
      }


      function _handleMouseUp(event: MouseEvent) {
        event.stopPropagation();

        const target = event.target as HTMLElement;
        const type = target.dataset.type;

        // TODO: 删除未连接的 connector
        if (type !== 'anchor') {
          self.canvas.clear(self._connector);
        }

        const id = target.dataset.uuid;
        const _anchor = self.anchors.get(id);
        console.warn(_anchor);
        self._connector.setAnchor(_anchor, 'to');
        _anchor.setConnector(self._connector, 'to');

        self._connector = null;
        document.removeEventListener('mouseup', _handleMouseUp);
        document.removeEventListener('mousemove', _handleMouseMove);
      }


      document.addEventListener('mousemove', _handleMouseMove);
      document.addEventListener('mouseup', _handleMouseUp);

      this._connector = new Connector();
      this._connector.setCoordinate({ x: 9999, y: 9999 });
      this._connector.setAnchor(_anchor);
      _anchor.setConnector(this._connector);

      this.canvas.draw(this._connector);
    });
  }

  setContainer(container: Container) {
    this.canvas.draw(container);
    container.setRuntime(this);
    this.containers.push(container);
  }

  run() {
    const { root } = this;
    if (root) {
      root.appendChild(this.canvas.render());
    }
  }

  toSerialize() {
    const containers = this.containers.map(container => container.toSerialize());

    return {
      containers,
      connectors: []
    }
  }
}
