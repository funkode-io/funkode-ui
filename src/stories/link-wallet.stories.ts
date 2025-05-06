import { html } from "lit";
import type { StoryObj } from "@storybook/web-components";


import "../../lib/components/headless/link-wallet/link-wallet";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Headless/LinkWallet",
  tags: ["autodocs"],
  render: (args) => html`
    <fk-link-wallet>
       ${args.element}
    </fk-link-wallet>`,
  argTypes: {
    element: {
      control: { type: "select" },
      options: ["button", "link"],
      mapping: {
        button: html`<button data-trigger  class="btn btn-primary">Link Wallet</button>`,
        link: html`<a href="#" onclick="return false" data-trigger class="link link-primary link-hover">Link Wallet</a>`,
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
