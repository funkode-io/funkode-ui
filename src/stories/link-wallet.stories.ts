import { html } from "lit";
import type { StoryObj } from "@storybook/web-components";

import "flyonui/flyonui.js";
import "../../lib/components/headless/link-wallet/link-wallet";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Headless/LinkWallet",
  tags: ["autodocs"],
  render: (args) => html`
    <fk-link-wallet>
       ${args.element}
       <div class="accordion divide-neutral/20 divide-y">
    </fk-link-wallet>
    <div class="accordion-item active" id="payment-basic">
    <button class="accordion-toggle inline-flex items-center gap-x-4 text-start" aria-controls="payment-basic-collapse" aria-expanded="true" >
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
      When is payment taken for my order?
    </button>
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="payment-basic" role="region" >
      <div class="px-5 pb-4">
        <p class="text-base-content/80 font-normal">
          Payment is taken during the checkout process when you pay for your order. The order number that appears on the
          confirmation screen indicates payment has been successfully processed.
        </p>
      </div>
    </div>
  </div>
  <div class="accordion-item" id="delivery-basic">
    <button class="accordion-toggle inline-flex items-center gap-x-4 text-start" aria-controls="delivery-basic-collapse" aria-expanded="false" >
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
      How would you ship my order?
    </button>
    <div id="delivery-basic-collapse" class="accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="delivery-basic" role="region" >
      <div class="px-5 pb-4">
        <p class="text-base-content/80 font-normal">
          For large products, we deliver your product via a third party logistics company offering you the “room of
          choice” scheduled delivery service. For small products, we offer free parcel delivery.
        </p>
      </div>
    </div>
  </div>
  <div class="accordion-item" id="cancel-basic">
    <button class="accordion-toggle inline-flex items-center gap-x-4 text-start" aria-controls="cancel-basic-collapse" aria-expanded="false" >
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
      Can I cancel my order?
    </button>
    <div id="cancel-basic-collapse" class="accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="cancel-basic" role="region" >
      <div class="px-5 pb-4">
        <p class="text-base-content/80 font-normal">
          Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund.
        </p>
      </div>
    </div>
  </div>
</div>`,

  argTypes: {
    element: {
      control: { type: "select" },
      options: ["button", "link"],
      mapping: {
        button: html`<button data-trigger  class="btn btn-primary">Link Wallet</button>`,
        link: html`<a href="#" onclick="return false" data-trigger class="link link-primary link-hover">Link Wallet</a>`,
      },
    },
  },
  args: {},
  play: async ({ canvasElement }) => {
    console.log("FlyonUI on play before");
    window.HSStaticMethods.autoInit();
    console.log("FlyonUI autoInit called on play", window.HSStaticMethods);
  },
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
