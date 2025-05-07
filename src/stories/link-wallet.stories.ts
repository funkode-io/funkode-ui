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
      element.className = `btn btn-${args.variant}`;
    } else if (element instanceof HTMLAnchorElement) {
      element.className = `link link-${args.variant} link-hover`;
    }

    element.setAttribute("data-trigger", "");
    element.textContent = "Link Wallet";

    const component = document.createElement('fk-link-wallet');
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
