/**
 * Counter Web Component
 * 
 * A simple counter component that demonstrates the web component library
 */

import { BaseComponent } from './base-component.js';
import { registerComponent } from '../utils/component-utils.js';

export class CounterComponent extends BaseComponent {
  constructor() {
    super();
    this._count = 0;
    this._init();
  }

  /**
   * Initialize the component
   */
  _init() {
    // Define the component's HTML structure
    this._render();
    
    // Add event listeners
    this.addListener('#increment', 'click', () => this.increment());
    this.addListener('#decrement', 'click', () => this.decrement());
    this.addListener('#reset', 'click', () => this.reset());
  }

  /**
   * Render the component's HTML
   */
  _render() {
    const html = `
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
    `;

    const css = `
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
        background-color: #f5f5f5;
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

    this.render(html);
    this.addStyles(css);
  }

  /**
   * Update the counter display
   */
  _updateDisplay() {
    const countElement = this.shadowRoot.querySelector('#count');
    if (countElement) {
      countElement.textContent = this._count;
    }
    
    // Dispatch a custom event with the new count
    this.dispatch('count-changed', { count: this._count });
  }

  /**
   * Increment the counter
   */
  increment() {
    this._count++;
    this._updateDisplay();
  }

  /**
   * Decrement the counter
   */
  decrement() {
    this._count--;
    this._updateDisplay();
  }

  /**
   * Reset the counter
   */
  reset() {
    this._count = 0;
    this._updateDisplay();
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
  set count(value) {
    this._count = Number(value) || 0;
    this._updateDisplay();
  }
}

// Register the component
registerComponent('counter-component', CounterComponent);
