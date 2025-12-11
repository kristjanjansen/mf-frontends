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

export function registerLayoutElement(tag: string, App: React.ComponentType) {
  if (customElements.get(tag)) return;

  class MfShadowElement extends HTMLElement {
    private root?: ReactDOM.Root;
    private shadow?: ShadowRoot;

    connectedCallback() {
      if (!this.shadow) {
        this.shadow = this.attachShadow({ mode: "open" });

        // Inject styles for app containers
        const style = document.createElement("style");
        style.textContent = `
          .app-container {
            display: none;
          }
          .app-container.active {
            display: block;
          }
        `;
        this.shadow.appendChild(style);
      }
      if (!this.root) {
        this.root = ReactDOM.createRoot(this.shadow as unknown as Element);
      }

      this.root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }

    disconnectedCallback() {
      this.root?.unmount();
      this.root = undefined;
    }
  }

  customElements.define(tag, MfShadowElement);
}

interface NavigationElementProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function registerNavigationElement(
  tag: string,
  App: React.ComponentType<NavigationElementProps>
) {
  if (customElements.get(tag)) return;

  class MfNavigationElement extends HTMLElement {
    private root?: ReactDOM.Root;
    private currentPath: string = "/";

    static get observedAttributes() {
      return ["current-path"];
    }

    attributeChangedCallback(
      name: string,
      _old: string | null,
      value: string | null
    ) {
      if (name === "current-path") {
        this.currentPath = value ?? "/";
        this.render();
      }
    }

    connectedCallback() {
      if (!this.root) {
        this.root = ReactDOM.createRoot(this);
      }
      this.render();
    }

    disconnectedCallback() {
      if (this.root) {
        this.root.unmount();
        this.root = undefined;
      }
    }

    private handleNavigate = (path: string) => {
      this.dispatchEvent(
        new CustomEvent("mf:navigate", {
          detail: { path },
          bubbles: true,
          composed: true,
        })
      );
    };

    private render() {
      if (!this.root) return;

      this.root.render(
        <App currentPath={this.currentPath} onNavigate={this.handleNavigate} />
      );
    }
  }

  customElements.define(tag, MfNavigationElement);
}
