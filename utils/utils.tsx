import React from "react";
import ReactDOM from "react-dom/client";

export function registerCustomElement(tag: string, App: React.ComponentType) {
  if (customElements.get(tag)) return;

  class MfElement extends HTMLElement {
    private root?: ReactDOM.Root;

    connectedCallback() {
      if (!this.root) {
        this.root = ReactDOM.createRoot(this);
      }

      this.root.render(<App />);
    }

    disconnectedCallback() {
      if (this.root) {
        this.root.unmount();
        this.root = undefined;
      }
    }
  }

  customElements.define(tag, MfElement);
}
