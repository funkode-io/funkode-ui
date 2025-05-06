import { html } from "lit";
import type { StoryObj } from "@storybook/web-components";


import "../../lib/components/link-wallet/link-wallet";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Web3/LinkWallet",
  tags: ["autodocs"],
  render: (args) => html`
    <fk-link-wallet>${args.element}</fk-link-wallet>`,
  argTypes: {
    element: {
      control: { type: "select" },
      options: ["button", "link"],
      mapping: {
        button: html`<button data-trigger>Link Wallet</button>`,
        link: html`<a href="#" data-trigger>Link Wallet</a>`,
      },
    }
  },
  args: {},
};

interface LinkWalletProps {
  element: "button" | "link";
}

export default meta;
type Story = StoryObj<LinkWalletProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithButton: Story = {
  args: {
    element: "button",
  },
};

export const WithLink: Story = {
  args: {
    element: "link",
  },
};
