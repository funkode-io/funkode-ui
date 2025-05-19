/**
 * Custom button component that enhances buttons with flyonui framework classes.
 */

const validVariants = ["default", "primary", "secondary", "accent", "info", "success", "warning", "error"];

const validStyleTypes = ["soft", "outline", "text"];

const validSizes = ["xs", "sm", "md", "lg", "xl"];

const validStates = ["active", "disabled"];

/**
 * Properties that can be set on a FunkButton component
 */
export interface FunkButtonProps {
  /** Button variant (primary, secondary, accent, info, success, warning, error) */
  variant?: "default" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  /** Button size (xs, sm, lg, xl) */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Button style type (soft, outline, text) */
  styleType?: "soft" | "outline" | "text";
  /** Button state (active, disabled) */
  state?: "active" | "disabled";
  /** Whether the button has rounded pill-style corners */
  pill?: boolean;
}

export class FunkButton extends HTMLElement {
  static observedAttributes = ["variant", "size", "style-type", "state", "pill"];

  private _variant: FunkButtonProps["variant"] | null = "primary";
  private _size: FunkButtonProps["size"] | null = null;
  private _styleType: FunkButtonProps["styleType"] | null = null;
  private _state: FunkButtonProps["state"] | null = null;
  private _pill: FunkButtonProps["pill"] | null = null;

  connectedCallback() {
    this.upgradeButtons();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
        if (newValue === null || newValue === "default") {
          this._variant = null;
        } else if (validVariants.includes(newValue)) {
          this._variant = newValue as FunkButtonProps["variant"];
        } else {
          console.log("variant case not covered", name, newValue);
        }

        break;
      case "size":
        if (validSizes.includes(newValue)) {
          this._size = newValue as FunkButtonProps["size"];
        }
        break;
      case "style-type":
        if (newValue === null || newValue === "default") {
          this._styleType = null;
        } else if (validStyleTypes.includes(newValue)) {
          this._styleType = newValue as FunkButtonProps["styleType"];
        } else {
          console.log("style-type case not covered", name, newValue);
        }
        break;
      case "state":
        if (validStates.includes(newValue)) {
          this._state = newValue as FunkButtonProps["state"];
        }
        break;
      case "pill":
        this._pill = newValue !== null;
        break;
    }

    this.upgradeButtons();
  }

  private upgradeButtons() {
    const buttons = this.querySelectorAll("button");

    for (const button of buttons) {
      // Reset classes to avoid duplicates
      this.resetButtonClasses(button);

      // Add base class
      button.classList.add("btn");

      // Add variant class
      if (this._variant) {
        if (validVariants.includes(this._variant)) {
          button.classList.add(`btn-${this._variant}`);
        }
      }

      // Add style type class (soft, outline, text)
      if (this._styleType) {
        if (validStyleTypes.includes(this._styleType)) {
          button.classList.add(`btn-${this._styleType}`);
        }
      }

      // Add size class
      if (this._size) {
        if (validSizes.includes(this._size)) {
          button.classList.add(`btn-${this._size}`);
        }
      }

      // Add state class
      if (this._state) {
        if (validStates.includes(this._state)) {
          button.classList.add(`btn-${this._state}`);
        }
      }

      // Add pill class
      if (this._pill) {
        button.classList.add("rounded-full");
      }
    }
  }

  private resetButtonClasses(button: HTMLButtonElement) {
    // Remove existing class patterns
    const classesToRemove: string[] = [];

    for (const className of button.classList) {
      if (className.startsWith("btn")) {
        classesToRemove.push(className);
      } else if (className.startsWith("rounded")) {
        classesToRemove.push(className);
      }
    }

    for (const className of classesToRemove) {
      button.classList.remove(className);
    }
  }
}

// Define the custom element
console.log("Registering fk-button");
customElements.define("fk-button", FunkButton);
