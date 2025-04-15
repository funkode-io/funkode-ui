export const navHeaderTemplate = document.createElement('template');
navHeaderTemplate.innerHTML = `
  <style>
    :root {
      --nav-header-background-color: var(--pico-background-color);
      --nav-header-color: var(--pico-primary);
      --nav-header-brand-color: var(--pico-muted-color);

      display: block;
      width: 100%;
    }

    :host {
      --nav-header-color-host: var(--nav-header-color, var(--pico-primary));
    }

    nav {
      background-color: var(--nav-header-background-color);
      color: var(--nav-header-color);
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

    ul {
      margin-top: 0;
      margin-bottom: var(--pico-typography-spacing-vertical);
      color: var(--nav-header-color);
      font-style: normal;
      font-weight: var(--pico-font-weight);
    }     
      
    a {
      -ms-touch-action: manipulation;
      --pico-text-decoration: underline;
    }

    :where(a:not([role=button])),
    [role=link] {
      --pico-background-color: transparent;
      --pico-underline: var(--pico-primary-underline);
      outline: none;
      background-color: var(--pico-background-color);
      color: var(--nav-header-color-host);
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

    hgroup > *:not(:first-child):last-child ::slotted(*) {
      --pico-color: var(--nav-header-brand-color);
      --pico-font-weight: unset;
      font-size: 1rem;
    }
  </style>
  <nav>
    <ul>
      <li>
        <hgroup>
          <h1>
            <slot name="logo">
            <svg height="50" viewBox="0 0 400 96" style="background-color: transparent;">
                <style>
                  path {
                    stroke: var(--nav-header-brand-color);
                  }
                  text {
                    font-family: 'Roboto', sans-serif;
                    fill: var(--nav-header-brand-color);
                  }
                </style>
                <path d="M48,16 16,48 48,80 72,16 104,48 72,80" stroke-width="5" stroke-linejoin="round" fill="transparent"></path>
                <text x="120" y="72" font-size="64" fill="white">Funkode</text>
              </svg>
            </slot>
          </h1>
          <p style="text-align: center" part="brand"><slot name="brand-text">Funkode UI library</slot></p>
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
