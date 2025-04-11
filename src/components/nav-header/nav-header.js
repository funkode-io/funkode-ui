class NavHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Create the template
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :root {
          --navigation-header-background-color: var(--fk-navigation-header-background-color);
          --navigation-header-color: var(--fk-navigation-header-color);
        }

        :host {
          display: block;
          width: 100%;
        }

        *::before,
        *::after {
          box-sizing: border-box;
          background-repeat: no-repeat;
        }

        nav {
          background-color: var(--navigation-header-background-color);
          color: var(--navigation-header-color);
        }

        nav,
        nav ul {
          display: flex;
        }

        nav {
          justify-content: space-between;
          overflow: visible;
        }
        nav ul {
          align-items: center;
          margin-bottom: 0;
          padding: 0;
          list-style: none;
        }
        nav ul:first-of-type {
          margin-left: calc(var(--fk-nav-element-spacing-horizontal) * -1);
        }
        nav ul:last-of-type {
          margin-right: calc(var(--fk-nav-element-spacing-horizontal) * -1);
        }
        nav li {
          display: inline-block;
          margin: 0;
          padding: var(--fk-nav-element-spacing-vertical) var(--fk-nav-element-spacing-horizontal);
        }
        nav li :where(a, [role=link]) {
          display: inline-block;
          margin: calc(var(--fk-nav-link-spacing-vertical) * -1) calc(var(--fk-nav-link-spacing-horizontal) * -1);
          padding: var(--fk-nav-link-spacing-vertical) var(--fk-nav-link-spacing-horizontal);
          border-radius: var(--fk-border-radius);
        }
        nav li :where(a, [role=link]):not(:hover) {
          text-decoration: none;
        }
        nav li button,
        nav li [role=button],
        nav li [type=button],
        nav li input:not([type=checkbox], [type=radio], [type=range], [type=file]),
        nav li select {
          height: auto;
          margin-right: inherit;
          margin-bottom: 0;
          margin-left: inherit;
          padding: calc(var(--fk-nav-link-spacing-vertical) - var(--fk-border-width) * 2) var(--fk-nav-link-spacing-horizontal);
        }

        ul {
          margin-top: 0;
          margin-bottom: var(--fk-typography-spacing-vertical);
          color: var(--fk-color);
          font-style: normal;
          font-weight: var(--fk-font-weight);
        }     
          
        a {
          -ms-touch-action: manipulation;
        }

        :where(a:not([role=button])),
        [role=link] {
          outline: none;
          background-color: transparent;
          color: var(--fk-primary);
          text-decoration: underline;
          text-decoration-color: var(--fk-primary-underline);
          text-underline-offset: 0.125em;
          transition: background-color var(--fk-transition), 
                    color var(--fk-transition), 
                    box-shadow var(--fk-transition), 
                    text-decoration var(--fk-transition);
        }

        hgroup {
          margin-bottom: var(--fk-typography-spacing-vertical);
        }
        hgroup > * {
          margin-top: 0;
          margin-bottom: 0;
        }

        .brand-description {
          text-align: center;
        }
        
        ::slotted(svg) {
          display: block;
          max-width: 100%;
          height: auto;
        }
      </style>
      <nav>
        <ul>
          <li>
            <hgroup>
              <h1>
                <slot name="logo">
                  <!-- Default logo if none provided -->
                  <svg height="50" viewBox="0 0 380 96" style="background-color: transparent;">
                    <style>
                      text {
                        font-family: 'Roboto', sans-serif;
                      }
                    </style>
                    <path d="M48,16 16,48 48,80 72,16 104,48 72,80" stroke-width="5" stroke-linejoin="round" stroke="white"
                      fill="transparent" />
                    <text x="120" y="72" font-size="64" fill="white">Funkode</text>
                  </svg>
                </slot>
              </h1>
              <p class="brand-description"><slot name="description">Funkode UI library</slot></p>
            </hgroup>
          </li>
        </ul>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    `;

    // Clone the template content and append it to the shadow DOM
    const templateContent = template.content.cloneNode(true);
    this.shadowRoot.appendChild(templateContent);
  }
}

console.log('Registering nav-header component');
customElements.define('nav-header', NavHeader);
