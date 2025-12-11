// mf-microfrontends/src/apps/layout/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import LayoutApp from "./LayoutApp";

class MfLayoutElement extends HTMLElement {
  private root?: ReactDOM.Root;
  private shadow?: ShadowRoot;

  connectedCallback() {
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: "open" });
    }
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.shadow as unknown as Element);
    }

    this.root.render(
      <React.StrictMode>
        <LayoutApp />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = undefined;
  }
}

if (!customElements.get("mf-layout")) {
  customElements.define("mf-layout", MfLayoutElement);
}
