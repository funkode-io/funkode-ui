import "./nav.css";

export interface FunkNavigationProps {
  sticky?: boolean;
}

const stickyClasses = ["sticky", "top-0"];

export class FunkNavigation extends HTMLElement {
  static injected = false;
  static observedAttributes = ["sticky"];

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
