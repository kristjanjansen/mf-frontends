import React from "react";
import ReactDOM from "react-dom/client";

type RegisterOptions = {
  shadow?: boolean;
  css?: string;
};

export function registerCustomElement(
  tag: string,
  App: React.ComponentType<any>,
  options: RegisterOptions = {}
) {
  if (customElements.get(tag)) return;

  class MfElement extends HTMLElement {
    private root?: ReactDOM.Root;
    private shadow?: ShadowRoot;

    connectedCallback() {
      const { shadow, css } = options;

      let mountTarget: Element = this;

      if (shadow) {
        if (!this.shadow) {
          this.shadow = this.attachShadow({ mode: "open" });

          if (css) {
            const style = document.createElement("style");
            style.textContent = css;
            this.shadow.prepend(style);
          }
        }

        mountTarget = this.shadow as unknown as Element;
      }

      if (!this.root) {
        this.root = ReactDOM.createRoot(mountTarget);
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

interface NavigationElementProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function registerNavigationElement(
  tag: string,
  App: React.ComponentType<NavigationElementProps>,
  css?: string
) {
  if (customElements.get(tag)) return;

  class MfNavigationElement extends HTMLElement {
    private root?: ReactDOM.Root;
    private currentPath: string = "/";
    private shadow?: ShadowRoot;

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
      if (!this.shadow) {
        this.shadow = this.attachShadow({ mode: "open" });

        if (css) {
          const style = document.createElement("style");
          style.textContent = css;
          this.shadow.prepend(style);
        }
      }

      if (!this.root) {
        this.root = ReactDOM.createRoot(this.shadow as unknown as Element);
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
        new MessageEvent("mf:navigate", {
          data: { path },
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
