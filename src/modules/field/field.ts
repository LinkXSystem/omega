abstract class Field {
  value: string | number | boolean;

  constructor() {}

  setValue(value: string | number | boolean) {
    this.value = value;
  }

  render() {
    console.warn('please rewrite the method !!!');
  }
}
