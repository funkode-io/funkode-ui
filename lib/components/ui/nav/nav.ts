import classes from "./nav.module.css";

export class FunkNavigation extends HTMLElement {
  static injected = false;

  connectedCallback() {
    if (FunkNavigation.injected) return;

    const style = document.createElement("style");

    style.textContent = classes.textContent;
    document.head.appendChild(style);

    FunkNavigation.injected = true;
  }
}

customElements.define("fk-nav", FunkNavigation);
