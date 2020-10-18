import Anchor from './anchor';
interface AuxiliaryInterface {
  anchors: Array<Anchor>;
  disabled: boolean;

  setDisabled: Function;

  render: Function;
}

export default AuxiliaryInterface;
