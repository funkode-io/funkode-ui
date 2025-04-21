class r extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  /**
   * Renders the component's HTML content
   * @param {string} html - HTML content to render
   */
  render(t) {
    this.shadowRoot.innerHTML = t;
  }
  /**
   * Adds event listeners to elements in the shadow DOM
   * @param {string} selector - CSS selector for the element
   * @param {string} event - Event name (e.g., 'click')
   * @param {Function} handler - Event handler function
   */
  addListener(t, e, s) {
    const o = this.shadowRoot.querySelector(t);
    o && o.addEventListener(e, s);
  }
  /**
   * Creates and attaches a style element to the shadow DOM
   * @param {string} css - CSS styles as a string
   */
  addStyles(t) {
    const e = document.createElement("style");
    e.textContent = t, this.shadowRoot.appendChild(e);
  }
  /**
   * Utility method to dispatch custom events
   * @param {string} name - Event name
   * @param {any} detail - Data to include with the event
   */
  dispatch(t, e) {
    this.dispatchEvent(new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    }));
  }
}
function i(n, t) {
  return n.includes("-") ? customElements.get(n) ? !1 : (customElements.define(n, t), !0) : (console.error("Custom element tag names must contain a hyphen (-)"), !1);
}
class c extends r {
  constructor() {
    super(), this._count = 0, this._init();
  }
  /**
   * Initialize the component
   */
  _init() {
    this._render(), this.addListener("#increment", "click", () => this.increment()), this.addListener("#decrement", "click", () => this.decrement()), this.addListener("#reset", "click", () => this.reset());
  }
  /**
   * Render the component's HTML
   */
  _render() {
    const t = `
      <div class="counter-container">
        <h2>Counter Component</h2>
        <div class="counter-display">
          <span id="count">${this._count}</span>
        </div>
        <div class="counter-controls">
          <button id="decrement">-</button>
          <button id="reset">Reset</button>
          <button id="increment">+</button>
        </div>
      </div>
    `, e = `
      .counter-container {
        font-family: Arial, sans-serif;
        max-width: 300px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
      }
      
      .counter-display {
        font-size: 2rem;
        margin: 1rem 0;
        padding: 0.5rem;
        background-color: #a3a3a3;
        border-radius: 4px;
      }
      
      .counter-controls {
        display: flex;
        justify-content: space-between;
      }
      
      button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        transition: background-color 0.3s;
      }
      
      button:hover {
        background-color: #45a049;
      }
      
      #reset {
        background-color: #f44336;
      }
      
      #reset:hover {
        background-color: #d32f2f;
      }
    `;
    this.render(t), this.addStyles(e);
  }
  /**
   * Update the counter display
   */
  _updateDisplay() {
    const t = this.shadowRoot.querySelector("#count");
    t && (t.textContent = this._count), this.dispatch("count-changed", { count: this._count });
  }
  /**
   * Increment the counter
   */
  increment() {
    this._count++, this._updateDisplay();
  }
  /**
   * Decrement the counter
   */
  decrement() {
    this._count--, this._updateDisplay();
  }
  /**
   * Reset the counter
   */
  reset() {
    this._count = 0, this._updateDisplay();
  }
  /**
   * Get the current count
   */
  get count() {
    return this._count;
  }
  /**
   * Set the current count
   */
  set count(t) {
    this._count = Number(t) || 0, this._updateDisplay();
  }
}
i("my-counter", c);
export {
  r as BaseComponent,
  c as CounterComponent
};
