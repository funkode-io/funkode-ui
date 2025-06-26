import "./button.css";
import type { Variant } from "../variants/variants";


/**
 * Properties that can be set on a FunkButton component
 */
export interface FunkButtonProps {
  /** Button variant (primary, secondary, accent, info, success, warning, error) */
  variant?: Variant;
  /** Button size (xs, sm, lg, xl) */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Button style type (soft, outline, text) */
  styleType?: "soft" | "outline" | "text";
  /** Disabled button */
  disabled?: boolean;
  /** Whether the button has rounded pill-style corners */
  pill?: boolean;
}

export class FunkButton extends HTMLButtonElement {
  static observedAttributes = ["variant", "size", "style-type", "state", "pill"];
}

// Define the custom element
console.log("Registering fk-button");
customElements.define("fk-button", FunkButton, { extends: "button" });
