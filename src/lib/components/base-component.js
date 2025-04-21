/**
 * Base Web Component
 * 
 * A foundation class for creating custom web components with common functionality
 */

export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Renders the component's HTML content
   * @param {string} html - HTML content to render
   */
  render(html) {
    this.shadowRoot.innerHTML = html;
  }

  /**
   * Adds event listeners to elements in the shadow DOM
   * @param {string} selector - CSS selector for the element
   * @param {string} event - Event name (e.g., 'click')
   * @param {Function} handler - Event handler function
   */
  addListener(selector, event, handler) {
    const element = this.shadowRoot.querySelector(selector);
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  /**
   * Creates and attaches a style element to the shadow DOM
   * @param {string} css - CSS styles as a string
   */
  addStyles(css) {
    const style = document.createElement('style');
    style.textContent = css;
    this.shadowRoot.appendChild(style);
  }

  /**
   * Utility method to dispatch custom events
   * @param {string} name - Event name
   * @param {any} detail - Data to include with the event
   */
  dispatch(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { 
      detail, 
      bubbles: true, 
      composed: true 
    }));
  }
}
