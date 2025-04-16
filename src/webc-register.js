// This file will handle WebC component registration
class HelloWorld extends HTMLElement {
  connectedCallback() {
    // The actual rendering is handled by the WebC plugin
    // This is just a fallback if needed
    if (!this.innerHTML.trim()) {
      this.innerHTML = `
        <div class="hello-component">
          <h2>Hello from WebC!</h2>
          <p>This is a WebC component</p>
          <slot></slot>
        </div>
      `;
    }
  }
}

// Register the custom element
customElements.define('hello-world', HelloWorld);
