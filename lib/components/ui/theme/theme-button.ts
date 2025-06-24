import { Trigger, Lifecycle, type TriggerAttributes } from "drab/base";

/** Properties for a theme button */
export interface ThemeButtonProps extends TriggerAttributes {
  /** The theme to apply */
  theme: string;
}

export class FunkThemeButton extends Trigger(Lifecycle(HTMLElement)) {
  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(name: string) {
    if (name === "theme") {
      this.render();
    }
  }

  sendThemeEvent() {
    const theme = this.getAttribute("theme") || "default";
    this.dispatchEvent(new CustomEvent("newtheme", { detail: { theme }, bubbles: true, composed: true }));
    console.log("Theme selected:", theme);
  }

  mount() {
    this.listener(() => this.sendThemeEvent());
  }

  render() {
    const theme = this.getAttribute("theme") || "default";
    const classes = this.classList;

    // create base div
    const rootDiv = document.createElement("div");
    rootDiv.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "min-w-32",
      "bg-base-100",
      "border",
      "border-base-300",
      "rounded-box",
      "color-base-content",
      "py-2",
      "px-4",
      "m-1",
      "cursor-pointer",
    );

    // add classes provided by the user
    rootDiv.classList.add(...classes);
    rootDiv.setAttribute("data-theme", theme);
    rootDiv.setAttribute("data-trigger", "");

    // create button
    const button = document.createElement("button");
    button.setAttribute("is", "fk-button");
    button.classList.add("min-w-24", "text-center");
    button.textContent = capitalize(theme);
    rootDiv.appendChild(button);

    // create div to display theme colors
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("flex", "h-10", "justify-center", "items-center", "ml-1");

    const colors = ["primary", "secondary", "accent", "info", "success"];
    colors.forEach((color, idx) => {
      const colorBox = document.createElement("div");
      colorBox.classList.add("w-2", "h-6", "rounded-selector", `bg-${color}`);
      if (idx < colors.length - 1) {
        colorBox.classList.add("mr-1");
      }
      colorDiv.appendChild(colorBox);
    });

    rootDiv.appendChild(colorDiv);

    this.appendChild(rootDiv);
  }
}

/*
const renderTheme = (theme: string, classes: DOMTokenList) => {
  return html`
    <div 
      data-theme="${theme}"
      class="flex justify-center items-center min-w-32 bg-base-100 border border-base-300 rounded-box color-base-content py-2 px-4 m-1 "
    >
      <button
        is="fk-button"
        data-trigger
        class="min-w-24 text-center"
      >
        ${capitalize(theme)}
      </button>
      <div class="flex h-10 justify-center items-center ml-1">
        <div class="w-2 h-6 rounded-selector bg-primary mr-1"></div>
        <div class="w-2 h-6 rounded-selector bg-secondary mr-1"></div>
        <div class="w-2 h-6 rounded-selector bg-accent mr-1"></div>
        <div class="w-2 h-6 rounded-selector bg-info mr-1"></div>
        <div class="w-2 h-6 rounded-selector bg-success"></div>
      </div>
    </div>
    `;
};
*/

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Define the custom element
console.log("Registering fk-theme-button");
if (!customElements.get("fk-theme-button")) {
  customElements.define("fk-theme-button", FunkThemeButton);
}
