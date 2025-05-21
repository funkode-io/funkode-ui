import classes from "./nav.module.css";

export interface FunkNavigationProps {
  sticky?: boolean;
}

const stickyClasses = ["sticky", "top-0"];

export class FunkNavigation extends HTMLElement {
  static injected = false;
  static observedAttributes = ["sticky"];

  _injectStyles() {
    if (FunkNavigation.injected) return;

    const style = document.createElement("style");

    style.textContent = classes.textContent;
    document.head.appendChild(style);

    FunkNavigation.injected = true;
  }

  connectedCallback() {
    this._injectStyles();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "sticky":
        console.log("sticky attribute changed", newValue);
        if (newValue !== null) {
          this.classList.add(...stickyClasses);
        } else {
          this.classList.remove(...stickyClasses);
        }
        break;
    }
  }
}

customElements.define("fk-nav", FunkNavigation, { extends: "nav" });
