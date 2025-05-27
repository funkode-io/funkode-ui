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

Import the components you need and use them in your HTML:

```html
<!-- Button example -->
<button is="funk-button" variant="primary" size="md">Click Me</button>

<!-- Dropdown example -->
<details is="fk-dropdown" variant="secondary">
  <summary>Open Dropdown</summary>
  <div>Dropdown content here</div>
</details>

<!-- Navigation example -->
<funk-navigation sticky>
  <!-- Navigation content -->
</funk-navigation>

<!-- Link Wallet example -->
<link-wallet>Connect Wallet</link-wallet>
```

## Ethereum Integration

The library includes built-in support for Ethereum wallet integration through the LinkWallet component, which:
- Automatically detects browser wallet providers
- Handles wallet connection requests
- Provides events for different wallet states

## Development

This library is built with TypeScript and can be used in any modern web project.
