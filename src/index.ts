import { Omega, OmegaOption } from './omega';
import { Anchor, AnchorPosition, Container } from './modules';

function inject(option: OmegaOption) {
  return new Omega(option);
}

export {
  inject,
  Anchor,
  AnchorPosition,
  Container
}
