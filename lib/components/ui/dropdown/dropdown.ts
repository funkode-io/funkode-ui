import { type Variant, isVariant } from "../variants/variants";
import "./dropdown.css";

export interface FunkDropdownProps {
  /** Button variant (primary, secondary, accent, info, success, warning, error) */
  variant?: Variant;
}

class FKDropdown extends HTMLDetailsElement {
  static observedAttributes = ["variant"];

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
        if (newValue === null || newValue === "default") {
          break;
        }

        if (!isVariant(newValue)) {
          console.error(`Invalid variant: ${newValue}. Expected one of: primary, secondary, accent, info, success, warning, error.`);
        }
        break;
    }
  }
}

customElements.define("fk-dropdown", FKDropdown, { extends: "details" });

export { FKDropdown };
