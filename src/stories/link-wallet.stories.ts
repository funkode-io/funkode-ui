import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

import "../../lib/components/headless/link-wallet/link-wallet";
import type { FunkButtonProps } from "@ui/button/button";
import "../../lib/components/ui/button/button";

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
        format: 'dedent'
      }
    }
  },
  render: (args) => {
    const element = document.createElement("button");

    if (element instanceof HTMLAnchorElement) {
      element.className = `link link-${args.variant} link-hover m-2`;
    }

    element.setAttribute("data-trigger", "");
    element.textContent = "Link Wallet";

    const alertElement = document.createElement("div");
    alertElement.className =
      "alert alert-soft alert-info overlay modal-middle-start removing:translate-x-5 removing:opacity-0 flex items-center gap-4 transition duration-300 ease-in-out m-4";
    alertElement.setAttribute("role", "alert");
    alertElement.setAttribute("x-show", "status !== ''");

    const statusElement = document.createElement("span");
    statusElement.setAttribute("x-text", "status");
    alertElement.appendChild(statusElement);

    const dismissButton = document.createElement("button");
    dismissButton.className = "ms-auto cursor-pointer leading-none";
    dismissButton.setAttribute("x-on:click", "status = ''");
    dismissButton.setAttribute("aria-label", "Close");

    const dismissIcon = document.createElement("span");
    dismissIcon.className = "icon-[lucide--x] size-5";
    dismissButton.appendChild(dismissIcon);

    alertElement.appendChild(dismissButton);

    const component = document.createElement("fk-link-wallet");
    component.setAttribute("x-data", "{ status: ''}");
    component.setAttribute(
      "x-on:wallet-linked",
      "console.log('wallet linked alpinejs'); status = `Wallet linked: ${event.detail}`",
    );
    component.setAttribute(
      "x-on:wallet-link-error",
      "status = `Wallet link error: ${event.detail}`",
    );
    component.setAttribute(
      "x-on:wallet-not-installed",
      "status = `Wallet not installed`",
    );

    component.appendChild(alertElement);

    const fkButton = document.createElement("fk-button");
    fkButton.appendChild(element);
    args.variant && fkButton.setAttribute("variant", args.variant);
    args.size && fkButton.setAttribute("size", args.size);
    args.styleType && fkButton.setAttribute("style-type", args.styleType);
    args.state && fkButton.setAttribute("state", args.state);
    if (args.pill) {
      fkButton.setAttribute("pill", "");
    }

    component.appendChild(fkButton);

    return component;
  },
  argTypes: {
    variant: {
      options: ["default", "primary", "secondary", "accent", "info", "success", "warning", "error",],
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
  play: async () => {
    console.log("play");
    window.HSStaticMethods.autoInit();
  },
} satisfies Meta<FunkButtonProps>;

export default meta;
type Story = StoryObj<FunkButtonProps>;

/**
 * Shortens a wallet address for display purposes.
 * @param address The wallet address to shorten
 * @param startChars Number of characters to show at the start (default: 4)
 * @param endChars Number of characters to show at the end (default: 4)
 * @returns The shortened wallet address
 */
function shortenAddress(address: string, startChars = 4, endChars = 4): string {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}


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
      <fk-button 
        variant=${args.variant} 
        size=${args.size} 
        style-type=${args.styleType} 
        state=${args.state}
        ?pill=${args.pill}
      >
        <button data-trigger="">Link Wallet</button>
      </fk-button>
    </fk-link-wallet>
    <script>
      function shortenAddress(address, startChars = 4, endChars = 4) {
        if (!address) return '';
        return \`\${address.slice(0, startChars)}...\${address.slice(-endChars)}\`;
      }
    </script>
    `
};
