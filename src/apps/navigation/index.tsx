import ReactDOM from "react-dom/client";
import NavigationApp from "./NavigationApp";

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
      <NavigationApp
        currentPath={this.currentPath}
        onNavigate={this.handleNavigate}
      />
    );
  }
}

if (!customElements.get("mf-navigation")) {
  customElements.define("mf-navigation", MfNavigationElement);
}
