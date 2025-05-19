import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

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
  title: "UI/Button",
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

export const AllVariants: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${["default", "primary", "secondary", "accent", "info", "success", "warning", "error"].map(
        (variant) => html`
          <fk-button
            variant=${variant}
            size=${args.size}
            style-type=${args.styleType}
            state=${args.state}
            pill=${args.pill}
          >
            <button>${variant}</button>
          </fk-button>
        `,
      )}
    </div>
  `,
  args: {
    size: "md",
    styleType: "default",
    state: "active",
    pill: false,
  },
};

export const AllStyleTypes: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${["default", "soft", "outline", "text"].map(
        (styleType) => html`
          <fk-button
            variant=${args.variant}
            size=${args.size}
            style-type=${styleType}
            state=${args.state}
            pill=${args.pill}
          >
            <button>${styleType}</button>
          </fk-button>
        `,
      )}
    </div>
  `,
  args: {
    variant: "primary",
    size: "md",
    state: "active",
    pill: false,
  },
};

export const AllSizes: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${["xs", "sm", "md", "lg", "xl"].map(
        (size) => html`
          <fk-button
            variant=${args.variant}
            size=${size}
            style-type=${args.styleType}
            state=${args.state}
            pill=${args.pill}
          >
            <button>${size}</button>
          </fk-button>
        `,
      )}
    </div>
  `,
  args: {
    variant: "primary",
    styleType: "default",
    state: "active",
    pill: false,
  },
};
