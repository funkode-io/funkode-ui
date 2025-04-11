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
        :host {
          display: block;
          width: 100%;
        }
        nav {
          background-color: var(--primary);
          padding: 1rem;
          color: var(--primary-inverse);
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          font-size: 1.5rem;
          font-weight: bold;
        }
        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          margin-left: 1rem;
        }
        a {
          color: var(--primary-inverse);
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <nav>
        <div class="container">
          <div class="brand">${this.getAttribute('brand-name') || 'My Site'}</div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-header', NavHeader);
