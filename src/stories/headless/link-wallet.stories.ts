import { html } from "lit";
import type { Meta, StoryObj } from "storybook/web-components";

import type { FunkButtonProps } from "@ui/button/button";

console.log("LinkWallet stories...");

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/** Showcase how to use link wallet component.
 * ## How to use
 * - Wrap your login button inside the `fk-link-wallet` component.
 * - Add the `data-trigger` attribute to the button.
 * - Handle the `wallet-linked`, `wallet-link-error`, and `wallet-not-installed` events in your JavaScript code.
 *
 */
const meta = {
  title: "Headless/LinkWallet",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: {
        format: "dedent",
      },
    },
  },
  argTypes: {
    variant: {
      options: ["default", "primary", "secondary", "accent", "info", "success", "warning", "error"],
      control: { type: "radio" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
    styleType: {
      options: ["default", "soft", "outline", "text"],
      control: { type: "radio" },
    },
    state: {
      options: ["active", "disabled"],
      control: { type: "radio" },
    },
    pill: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<FunkButtonProps>;

export default meta;
type Story = StoryObj<FunkButtonProps>;

/**
 * ## AlpineJS example
 * Example how to use this component with AlpineJS */
export const WithAlpineJS: Story = {
  args: {
    variant: "primary",
    size: "sm",
    styleType: "outline",
    state: "active",
    pill: true,
  },
  render: (args) => html`
    <fk-link-wallet 
      x-data="{ status: ''}" 
      x-on:wallet-linked="notyf.success(\`Wallet linked: \${shortenAddress(event.detail)}\`);" 
      x-on:wallet-link-error="notyf.error('Wallet link error');" 
      x-on:wallet-not-installed="notyf.error('Wallet not installed');"
    >
      <!-- funk button -->
      <button 
        is="fk-button"
        data-trigger
        variant=${args.variant} 
        size=${args.size} 
        style-type=${args.styleType} 
        state=${args.state}
        ?pill=${args.pill}
      >
        Link Wallet
      </button>
    </fk-link-wallet>
    <script>
      function shortenAddress(address, startChars = 4, endChars = 4) {
        if (!address) return '';
        return \`\${address.slice(0, startChars)}...\${address.slice(-endChars)}\`;
      }
    </script>
    `,
};

/**
 * ## Just a button
 * Example how to use this component with a button, as it only sends events you need to use dev tools */
export const Simple: Story = {
  args: {
    variant: "primary",
    size: "sm",
    styleType: "outline",
    state: "active",
    pill: true,
  },
  render: () => html`
    <fk-link-wallet>
      <button is="fk-button" data-trigger>Link Wallet</button>
    </fk-link-wallet>
    `,
};
