import { html } from "lit";
import type { StoryObj } from "@storybook/web-components";


import "../../lib/components/headless/link-wallet/link-wallet";


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
        button: html`<button data-trigger  class="bg-amber-500 hover:bg-amber-700 dark:bg-amber-500 text-white font-bold py-2 px-4 rounded">Link Wallet</button>`,
        link: html`<a href="#" onclick="return false" data-trigger class="font-medium text-amber-500 dark:text-amber-500 hover:underline hover:text-amber-700">Link Wallet</a>`,
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
