# Funkode UI Component Library

A modern, customizable UI component library with Ethereum wallet integration capabilities.

## Components

### UI Components

#### Button (`FunkButton`)
A versatile button component with various styling options:
- **Variants**: primary, secondary, accent, info, success, warning, error
- **Sizes**: xs, sm, md, lg, xl
- **Style Types**: soft, outline, text
- **States**: active, disabled
- **Additional Options**: pill-style rounded corners

#### Dropdown (`FKDropdown`)
A customizable dropdown component:
- **Variants**: primary, secondary, accent, info, success, warning, error

#### Navigation (`FunkNavigation`)
A navigation component with options:
- **Sticky**: Enable/disable sticky positioning

### Headless Components

#### Link Wallet
A component for connecting to Ethereum wallets:
- Automatically detects wallet providers (like MetaMask)
- Handles wallet connection requests
- Provides events for wallet connection states

## Usage

You can see all components life in our [storybook](https://funkode-io.github.io/funkode-ui)

Import the components you need and use them in your HTML:

```html
<!-- Button example -->
<button is="fk-button" variant="primary" size="md" style-type="default">Click Me</button>

<!-- Dropdown example -->
<details is="fk-dropdown" variant="primary">
  <summary>Dropdown</summary>
  <ul>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</details>

<!-- Navigation example -->
<nav is="fk-nav" sticky>
  <ul>
    <li><strong>Brand</strong></li>
  </ul>
  <ul>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li>
      <button is="fk-button" variant="default" style-type="default">
        Login
      </button>
    </li>
  </ul>
</nav>

<!-- Link Wallet example -->
<fk-link-wallet>
  <button is="fk-button" data-trigger variant="primary">Link Wallet</button>
</fk-link-wallet>
```

### Wallet Integration with Events

```html
<fk-link-wallet 
  x-data="{ status: ''}" 
  x-on:wallet-linked="notyf.success(`Wallet linked: ${shortenAddress(event.detail)}`);" 
  x-on:wallet-link-error="notyf.error('Wallet link error');" 
  x-on:wallet-not-installed="notyf.error('Wallet not installed');"
>
  <button is="fk-button" data-trigger variant="primary">Link Wallet</button>
</fk-link-wallet>
<script>
  function shortenAddress(address, startChars = 4, endChars = 4) {
    if (!address) return '';
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  }
</script>
```

## Ethereum Integration

The library includes built-in support for Ethereum wallet integration through the LinkWallet component, which:
- Automatically detects browser wallet providers
- Handles wallet connection requests
- Provides events for different wallet states

## Development

This library is built with TypeScript and can be used in any modern web project.
