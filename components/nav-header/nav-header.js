class NavHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :root {
          --navigation-header-background-color: var(--pico-background-color);
          --navigation-header-color: var(--pico-color);
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
          margin-left: calc(var(--pico-nav-element-spacing-horizontal) * -1);
        }
        nav ul:last-of-type {
          margin-right: calc(var(--pico-nav-element-spacing-horizontal) * -1);
        }
        nav li {
          display: inline-block;
          margin: 0;
          padding: var(--pico-nav-element-spacing-vertical) var(--pico-nav-element-spacing-horizontal);
        }
        nav li :where(a, [role=link]) {
          display: inline-block;
          margin: calc(var(--pico-nav-link-spacing-vertical) * -1) calc(var(--pico-nav-link-spacing-horizontal) * -1);
          padding: var(--pico-nav-link-spacing-vertical) var(--pico-nav-link-spacing-horizontal);
          border-radius: var(--pico-border-radius);
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
          padding: calc(var(--pico-nav-link-spacing-vertical) - var(--pico-border-width) * 2) var(--pico-nav-link-spacing-horizontal);
        }
        nav[aria-label=breadcrumb] {
          align-items: center;
          justify-content: start;
        }
        nav[aria-label=breadcrumb] ul li:not(:first-child) {
          margin-inline-start: var(--pico-nav-link-spacing-horizontal);
        }
        nav[aria-label=breadcrumb] ul li a {
          margin: calc(var(--pico-nav-link-spacing-vertical) * -1) 0;
          margin-inline-start: calc(var(--pico-nav-link-spacing-horizontal) * -1);
        }
        nav[aria-label=breadcrumb] ul li:not(:last-child)::after {
          display: inline-block;
          position: absolute;
          width: calc(var(--pico-nav-link-spacing-horizontal) * 4);
          margin: 0 calc(var(--pico-nav-link-spacing-horizontal) * -1);
          content: var(--pico-nav-breadcrumb-divider);
          color: var(--pico-muted-color);
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
          margin-bottom: var(--pico-typography-spacing-vertical);
          color: var(--pico-color);
          font-style: normal;
          font-weight: var(--pico-font-weight);
        }     
          
        a {
          -ms-touch-action: manipulation;
          --pico-text-decoration: underline;
        }

        :where(a:not([role=button])),
        [role=link] {
          --pico-color: var(--pico-primary);
          --pico-background-color: transparent;
          --pico-underline: var(--pico-primary-underline);
          outline: none;
          background-color: var(--pico-background-color);
          color: var(--pico-color);
          -webkit-text-decoration: var(--pico-text-decoration);
          text-decoration: var(--pico-text-decoration);
          text-decoration-color: var(--pico-underline);
          text-underline-offset: 0.125em;
          transition: background-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition), -webkit-text-decoration var(--pico-transition);
          transition: background-color var(--pico-transition), color var(--pico-transition), text-decoration var(--pico-transition), box-shadow var(--pico-transition);
          transition: background-color var(--pico-transition), color var(--pico-transition), text-decoration var(--pico-transition), box-shadow var(--pico-transition), -webkit-text-decoration var(--pico-transition);
        }

        hgroup {
          margin-bottom: var(--pico-typography-spacing-vertical);
        }
        hgroup > * {
          margin-top: 0;
          margin-bottom: 0;
        }
      </style>
      <nav>
        <ul>
          <li>
            <hgroup>
              <h1>
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
              </h1>
              <p style="text-align: center">Funkode UI library</p>
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
  }
}

console.log('Registering nav-header component');
customElements.define('nav-header', NavHeader);
