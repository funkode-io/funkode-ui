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

    // if is sticky, add class to the element
    if (this.hasAttribute("sticky")) {
      this.classList.add(...stickyClasses);
    }
  }
}

customElements.define("fk-nav", FunkNavigation, { extends: "nav" });
