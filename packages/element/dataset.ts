export class Dataset {

  static get(node: HTMLElement, key: string) {
    return node.dataset[key] || '';
  }

  static set(node: HTMLElement, key: string, value: string | number) {
    node.dataset[key] = (value).toString();
  }

}
