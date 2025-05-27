import { type Variant, isVariant } from "../variants/variants";
import "./dropdown.css";

export interface FunkDropdownProps {
  /** Button variant (primary, secondary, accent, info, success, warning, error) */
  variant?: Variant;
}

class FKDropdown extends HTMLDetailsElement {
  static observedAttributes = ["variant"];

  private _variant: FunkDropdownProps["variant"] | null = null;

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
        if (newValue === null || newValue === "default") {
          this._variant = null;
        } else if (isVariant(newValue)) {
          this._variant = newValue as FunkDropdownProps["variant"];
        } else {
          console.log("variant case not covered", name, newValue);
        }
        break;
    }

    this.applyClasses();
  }

  connectedCallback() {
    this.applyClasses();
  }

  private updateVariantClass(oldValue: string | null, newValue: string | null) {
    if (oldValue) {
      this.classList.remove(`fk-dropdown--${oldValue}`);
    }
    if (newValue) {
      this.classList.add(`fk-dropdown--${newValue}`);
    }
  }
}

customElements.define("fk-dropdown", FKDropdown, { extends: "details" });

export { FKDropdown };
