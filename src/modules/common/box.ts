import StyleSheet from '../../lib/stylesheet';
import Listener from '../../lib/listener';

export default class Box {
  container: HTMLElement | SVGElement;
  element: HTMLElement;

  constructor(tag = 'div') {
    this.element = document.createElement(tag);
  }

  setContainer(container: HTMLElement | SVGElement): Box {
    if (this.container !== container) {
      const o = this.container || container;
      const n = (this.container = container);

      o.appendChild(this.element);
      n.appendChild(this.element);
    }

    return this;
  }

  bind(event: string, callback: any): Box {
    Listener.bind(this.element, event, callback);
    return this;
  }

  unbind(event: string, callback: any): Box {
    Listener.unbind(this.element, event, callback);
    return this;
  }

  getRect() {
    const { element } = this;
    return element.getBoundingClientRect;
  }

  getPosition() {
    return this.element.style.position;
  }

  setPosition(position: string): Box {
    this.setStyle({
      position
    });

    return this;
  }

  setCoordinate(x: number, y: number): Box {
    this.setStyle({
      top: y,
      left: x
    });

    return this;
  }

  setStyle(style: Object): Box {
    const { element } = this;

    StyleSheet.compose(element, StyleSheet.convert(style));

    return this;
  }

  toXml() {
    return this.element;
  }
}
