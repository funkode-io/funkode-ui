import type { StoryObj } from "@storybook/web-components";

import "flyonui/flyonui.js";
import "../../lib/components/headless/link-wallet/link-wallet";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Headless/LinkWallet",
  tags: ["autodocs"],
  render: (args) => {

    const element = args.element;

    if (element instanceof HTMLButtonElement) {
      element.className = `btn btn-${args.variant} m-2`;
    } else if (element instanceof HTMLAnchorElement) {
      element.className = `link link-${args.variant} link-hover m-2`;
    }

    element.setAttribute("data-trigger", "");
    element.textContent = "Link Wallet";

    const alertElement = document.createElement('div');
    alertElement.className = "alert alert-soft alert-info overlay modal-middle-start removing:translate-x-5 removing:opacity-0 flex items-center gap-4 transition duration-300 ease-in-out";
    alertElement.setAttribute("role", "alert");
    alertElement.setAttribute("x-show", "status !== ''");

    const statusElement = document.createElement('span');
    statusElement.setAttribute("x-text", "status");
    alertElement.appendChild(statusElement);


    const dismissButton = document.createElement('button');
    dismissButton.className = "ms-auto cursor-pointer leading-none";
    dismissButton.setAttribute("x-on:click", "status = ''");
    dismissButton.setAttribute("aria-label", "Close");

    const dismissIcon = document.createElement('span');
    dismissIcon.className = "icon-[lucide--x] size-5";
    dismissButton.appendChild(dismissIcon);

    alertElement.appendChild(dismissButton);


    const component = document.createElement('fk-link-wallet');
    component.setAttribute("x-data", "{ status: ''}");
    component.setAttribute("x-on:wallet-linked", "console.log('wallet linked alpinejs'); status = `Wallet linked: ${event.detail}`");
    component.setAttribute("x-on:wallet-link-error", "status = `Wallet link error: ${event.detail}`");
    component.setAttribute("x-on:wallet-not-installed", "status = `Wallet not installed`");

    component.appendChild(alertElement);
    component.appendChild(element);


    return component;
  },
  argTypes: {
    element: {
      control: { type: "select" },
      options: ["button", "link"],
      mapping: {
        button: document.createElement('button'),
        link: document.createElement('a'),
      },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent"],
    }
  },
  args: {
    variant: "primary",
  },
  play: async () => {
    console.log("play");
    window.HSStaticMethods.autoInit();
  },
};

interface LinkWalletProps {
  element: "button" | "link";
  variant: "primary" | "secondary" | "accent";
}

export default meta;
type Story = StoryObj<LinkWalletProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithButton: Story = {
  args: {
    element: "button",
    variant: "accent"
  },
};

export const WithLink: Story = {
  args: {
    element: "link",
  },
};
