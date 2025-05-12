import type { Meta, StoryObj } from "@storybook/web-components";

import "../../lib/components/headless/link-wallet/link-wallet";
import type { FunkButtonProps } from "@ui/button/button";
import "../../lib/components/ui/button/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Headless/LinkWallet",
  tags: ["autodocs"],
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
  args: {},
  argTypes: {
    variant: {
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
      ],
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: {
        type: "radio",
      },
    },
    styleType: {
      options: ["default", "soft", "outline", "text"],
      control: {
        type: "radio",
      },
    },
    state: {
      options: ["active", "disabled"],
      control: {
        type: "radio",
      },
    },
    pill: {
      control: {
        type: "boolean",
      },
    },
  },
  play: async () => {
    console.log("play");
    window.HSStaticMethods.autoInit();
  },
} satisfies Meta<FunkButtonProps>;

export default meta;
type Story = StoryObj<FunkButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithButton: Story = {
  args: {
    variant: "primary",
    size: "sm",
    styleType: "outline",
    state: "active",
    pill: true,
  },
};
