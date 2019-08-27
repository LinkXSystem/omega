abstract class Field extends HTMLElement {
  value: string | number | boolean;
  validator: Function;

  constructor() {
    super();
  }

  setValue(value: string | number | boolean) {
    this.value = value;
  }

  setVaildator(callback: Function) {
    this.validator = callback;
  }

  render() {
    console.warn("please rewrite the method !!!");
  }
}

export default Field;
