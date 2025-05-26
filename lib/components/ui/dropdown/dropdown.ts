import "./dropdown.css";

class FKDropdown extends HTMLDetailsElement {}

customElements.define("fk-dropdown", FKDropdown, { extends: "details" });

export { FKDropdown };
