import { Runtime, Container } from "./modules";

export interface OmegaOption {
  root?: HTMLDivElement | HTMLElement;
}

export class Omega {
  root: HTMLDivElement | HTMLElement;
  runtime: Runtime;

  constructor(option: OmegaOption) {
    const { root } = option || {};

    this.root = root || document.body;

    this.initial();
  }

  initial() {
    this.runtime = new Runtime(this.root);
    this.runtime.run();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getContainer(uuid: string) {
    console.warn('unsupported feature !');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delContainer(uuid: string) {
    console.warn('unsupported feature !');
  }

  setContainer(container: Container) {
    this.runtime.setContainer(container);
    return this;
  }

  toSerialize() {
    return this.runtime.toSerialize();
  }
}
