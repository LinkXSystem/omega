import Field from "./field";

class OmegaInputField extends Field {
  constructor() {
    super();
    const ShadowRoot = this.attachShadow({ mode: "open" });
    ShadowRoot.innerHTML = `
    <style>
      input {
        text-align: center;

        outline: 0;
        border: 0;
        padding: 0.5em;

        transition: all ease 0.5s;
      }

      input:hover {
        background: #f5f5f5;
        border-radius: 2px;
      }
    </style>
    <label for="input">
      <input type="text" value="功能测试" />
    </label>
    `;
  }
}

export default OmegaInputField;
