import { navHeaderTemplate } from './nav-header-template.js';

class NavHeader extends HTMLElement {
  static get observedAttributes() {
    return ['brand-text'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'brand-text' && this.shadowRoot) {
      this.render();
    }
  }

  render() {
    // Clone the template content
    const content = navHeaderTemplate.content.cloneNode(true);
    
    // Set brand text from attribute if provided
    const brandText = this.getAttribute('brand-text');
    if (brandText && !this.querySelector('[slot="brand-text"]')) {
      const brandTextElement = document.createElement('span');
      brandTextElement.setAttribute('slot', 'brand-text');
      brandTextElement.textContent = brandText;
      this.appendChild(brandTextElement);
    }
    
    // Append the template to the shadow DOM
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

console.log('Registering nav-header component');
customElements.define('nav-header', NavHeader);
