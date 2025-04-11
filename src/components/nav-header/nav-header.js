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
          --navigation-header-background-color: var(--fk-navigation-header-background-color, var(--pico-background-color));
          --navigation-header-color: var(--fk-navigation-header-color, var(--pico-color));
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
          margin-left: calc(var(--fk-nav-element-spacing-horizontal, var(--pico-nav-element-spacing-horizontal)) * -1);
        }
        nav ul:last-of-type {
          margin-right: calc(var(--fk-nav-element-spacing-horizontal, var(--pico-nav-element-spacing-horizontal)) * -1);
        }
        nav li {
          display: inline-block;
          margin: 0;
          padding: var(--fk-nav-element-spacing-vertical, var(--pico-nav-element-spacing-vertical)) var(--fk-nav-element-spacing-horizontal, var(--pico-nav-element-spacing-horizontal));
        }
        nav li :where(a, [role=link]) {
          display: inline-block;
          margin: calc(var(--fk-nav-link-spacing-vertical, var(--pico-nav-link-spacing-vertical)) * -1) calc(var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal)) * -1);
          padding: var(--fk-nav-link-spacing-vertical, var(--pico-nav-link-spacing-vertical)) var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal));
          border-radius: var(--fk-border-radius, var(--pico-border-radius));
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
          padding: calc(var(--fk-nav-link-spacing-vertical, var(--pico-nav-link-spacing-vertical)) - var(--fk-border-width, var(--pico-border-width)) * 2) var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal));
        }
        nav[aria-label=breadcrumb] {
          align-items: center;
          justify-content: start;
        }
        nav[aria-label=breadcrumb] ul li:not(:first-child) {
          margin-inline-start: var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal));
        }
        nav[aria-label=breadcrumb] ul li a {
          margin: calc(var(--fk-nav-link-spacing-vertical, var(--pico-nav-link-spacing-vertical)) * -1) 0;
          margin-inline-start: calc(var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal)) * -1);
        }
        nav[aria-label=breadcrumb] ul li:not(:last-child)::after {
          display: inline-block;
          position: absolute;
          width: calc(var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal)) * 4);
          margin: 0 calc(var(--fk-nav-link-spacing-horizontal, var(--pico-nav-link-spacing-horizontal)) * -1);
          content: var(--fk-nav-breadcrumb-divider, var(--pico-nav-breadcrumb-divider));
          color: var(--fk-muted-color, var(--pico-muted-color));
          text-align: center;
          text-decoration: none;
          white-space: nowrap;
        }
        nav[aria-label=breadcrumb] a[aria-current]:not([aria-current=false]) {
          background-color: transparent;
          color: inherit;
          text-decoration: none;
          pointer-events: none;
        }  

        ul {
          margin-top: 0;
          margin-bottom: var(--fk-typography-spacing-vertical, var(--pico-typography-spacing-vertical));
          color: var(--fk-color, var(--pico-color));
          font-style: normal;
          font-weight: var(--fk-font-weight, var(--pico-font-weight));
        }     
          
        a {
          -ms-touch-action: manipulation;
          --fk-text-decoration: var(--pico-text-decoration, underline);
        }

        :where(a:not([role=button])),
        [role=link] {
          --fk-color: var(--fk-primary, var(--pico-primary));
          --fk-background-color: transparent;
          --fk-underline: var(--fk-primary-underline, var(--pico-primary-underline));
          outline: none;
          background-color: var(--fk-background-color, var(--pico-background-color));
          color: var(--fk-color, var(--pico-color));
          -webkit-text-decoration: var(--fk-text-decoration, var(--pico-text-decoration));
          text-decoration: var(--fk-text-decoration, var(--pico-text-decoration));
          text-decoration-color: var(--fk-underline, var(--pico-underline));
          text-underline-offset: 0.125em;
          transition: background-color var(--fk-transition, var(--pico-transition)), 
                    color var(--fk-transition, var(--pico-transition)), 
                    box-shadow var(--fk-transition, var(--pico-transition)), 
                    -webkit-text-decoration var(--fk-transition, var(--pico-transition));
          transition: background-color var(--fk-transition, var(--pico-transition)), 
                    color var(--fk-transition, var(--pico-transition)), 
                    text-decoration var(--fk-transition, var(--pico-transition)), 
                    box-shadow var(--fk-transition, var(--pico-transition));
          transition: background-color var(--fk-transition, var(--pico-transition)), 
                    color var(--fk-transition, var(--pico-transition)), 
                    text-decoration var(--fk-transition, var(--pico-transition)), 
                    box-shadow var(--fk-transition, var(--pico-transition)), 
                    -webkit-text-decoration var(--fk-transition, var(--pico-transition));
        }

        hgroup {
          margin-bottom: var(--fk-typography-spacing-vertical, var(--pico-typography-spacing-vertical));
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
