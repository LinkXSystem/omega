import StyleSheet from '../../lib/stylesheet';

class Box {
  container: HTMLElement;
  element: HTMLElement;

  constructor(tag: string = 'div') {
    this.element = document.createElement(tag);
  }

  setContainer(container: HTMLElement) {
    if (this.container !== container) {
      const o = this.container || container;
      const n = (this.container = container);

      o.appendChild(this.element);
      n.appendChild(this.element);
    }

    return this;
  }

  getRect() {
    const { element } = this;
    return element.getBoundingClientRect;
  }

  getPosition() {
    return this.element.style.position;
  }

  setPosition(position: string) {
    this.setStyle({
      position,
    });

    return this;
  }

  setCoordinate(x: number, y: number) {
    this.setStyle({
      top: x,
      left: y,
    });

    return this;
  }

  setStyle(style: Object) {
    const { element } = this;

    StyleSheet.compose(
      element,
      StyleSheet.convert(style),
    );

    return this;
  }

  toXml() {
    return this.element;
  }
}

export default Box;
