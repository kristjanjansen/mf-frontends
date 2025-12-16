import React from "react";
import ReactDOM from "react-dom/client";

type RegisterOptions = {
  shadow?: boolean;
  css?: string;
};

export function navigateHost(path: string) {
  window.dispatchEvent(
    new MessageEvent("mf:navigate", {
      data: { path },
      bubbles: true,
      composed: true,
    })
  );

  const rn = window.ReactNativeWebView;
  if (rn && typeof rn.postMessage === "function") {
    rn.postMessage(JSON.stringify({ type: "mf:navigate", path }));
  }
}

export function useHostAttribute(host: HTMLElement, attribute: string) {
  const [value, setValue] = React.useState(() => host.getAttribute(attribute));

  React.useEffect(() => {
    setValue(host.getAttribute(attribute));

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "attributes") continue;
        if (m.attributeName !== attribute) continue;
        setValue(host.getAttribute(attribute));
      }
    });

    observer.observe(host, {
      attributes: true,
      attributeFilter: [attribute],
    });

    return () => observer.disconnect();
  }, [attribute, host]);

  return value;
}

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

      this.root.render(<App host={this} />);
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
