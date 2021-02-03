type DraggerStrategy = 'translate';

export interface DraggerOption {
  strategy?: DraggerStrategy;
  isCurrent: boolean;
}

export interface DraggerPosition {
  x: number;
  y: number;
}

export class Dragger {
  target: HTMLElement;

  isCurrent: boolean;

  _beforeDraggerCallbacks: Array<Function>;
  _DraggerCallbacks: Array<Function>;
  _afterDraggerCallbacks: Array<Function>;

  constructor(target: HTMLElement, option?: DraggerOption) {
    const { isCurrent } = option || {};

    if (isCurrent) {
      this.isCurrent = isCurrent;
    }

    this.target = target;

    this._beforeDraggerCallbacks = [];
    this._DraggerCallbacks = [];
    this._afterDraggerCallbacks = [];

    this.target.addEventListener('mousedown', this.handleEvent.bind(this));
  }

  setBeforeDraggerCallback(callback) {
    this._beforeDraggerCallbacks.push(callback);
  }

  setDraggerCallback(callback) {
    this._DraggerCallbacks.push(callback);
  }

  setAfterDraggerCallback(callback: Function) {
    this._DraggerCallbacks.push(callback);
  }

  handleBeforeDragger(event: MouseEvent) {
    this._beforeDraggerCallbacks.forEach(callback => callback(event));
  }

  handleDragger(event: MouseEvent, position: DraggerPosition) {
    this._DraggerCallbacks.forEach(callback => callback(event, position));
  }

  handleAfterDragger(event: MouseEvent) {
    this._afterDraggerCallbacks.forEach(callback => callback(event));
  }

  handleEvent(event: MouseEvent) {
    event.stopPropagation();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    let element;
    let position;

    if (this.isCurrent) {
      element = event.target as HTMLElement;

      position = {
        top: element.getBoundingClientRect().top - element.parentNode.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left - element.parentNode.getBoundingClientRect().left
      };
    }

    const startY = event.clientY;
    const startX = event.clientX;

    let startTop;
    let startLeft;

    if (this.isCurrent) {
      startTop = Number(position.top);
      startLeft = Number(position.left);
    }

    this.handleBeforeDragger(event);

    function _handleInlineMousemove(event: MouseEvent) {
      const currX = event.clientX;
      const currY = event.clientY;

      if (self.isCurrent) {
        position.top = currY - startY + startTop;
        position.left = currX - startX + startLeft;

        element.style.top = `${position.top}px`;
        element.style.left = `${position.left}px`;
      }

      self.handleDragger(event, {
        x: currX - startX,
        y: currY - startY,
      });
    }

    function _handleInlineMouseup(event: MouseEvent) {
      document.removeEventListener('mouseup', /**/_handleInlineMouseup);
      document.removeEventListener('mousemove', _handleInlineMousemove);

      self.handleAfterDragger(event);
    }

    document.addEventListener('mousemove', _handleInlineMousemove);
    document.addEventListener('mouseup', /**/_handleInlineMouseup);
  }

}
