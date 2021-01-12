interface OmegaOption {
  root?: HTMLDivElement | HTMLElement;
}

export class Omega {
  root: HTMLDivElement | HTMLElement;

  static inject(option: OmegaOption) {
    return new Omega(option);
  }

  constructor(option: OmegaOption) {
    const { root } = option;

    this.root = root || document.body;
  }
}
