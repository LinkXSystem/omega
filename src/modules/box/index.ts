import StyleSheet from '../../lib/stylesheet';

class Box {
  element: HTMLElement;

  constructor(tag: string = 'div') {
    this.element = document.createElement(tag);
  }

  getPosition() {
    return this.element.style.position;
  }

  setPosition(position: string) {
    StyleSheet.compose(
      this.element,
      {
        position
      }
    );

    return this;
  }
}

export default Box;
