import { Dialog, type DialogAttributes } from "drab/dialog";

import "./dialog.css";

export interface FunkDialogProps extends DialogAttributes, HTMLDialogElement {
  position: "center" | "right";
}

/**
 * Default show position for the dialog
 */
export const DEFAULT_DIALOG_SHOW: FunkDialogProps["position"] = "center";

/**
 * Just use drab dialog as it is, it works well with flyonui
 */
export class FunkDialog extends Dialog {}
// Register the custom element
if (!customElements.get("fk-dialog")) {
  customElements.define("fk-dialog", FunkDialog);
}
