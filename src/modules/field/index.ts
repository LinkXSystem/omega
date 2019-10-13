import Field from './field';
import OmegaInputField from './input';

const elements = {
  'omega-input-field': OmegaInputField,
};

(function install() {
  const entries = Object.entries(elements);
  entries.forEach(entry => {
    const [name, value] = entry;
    if (!customElements) {
      console.warn('The bowers not support custom-element !!!');
      return;
    }
    customElements.define(name, value);
  });
})();

export { Field, OmegaInputField };
