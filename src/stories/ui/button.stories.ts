import { html } from "lit";
import type { Meta, StoryObj } from "storybook/web-components";

import type { FunkButtonProps } from "@/ui/button/button";

/** Add is="fk-button" to the button element and use the attributes to set the button's properties:
 * - variant: default, primary, secondary, accent, info, success, warning, error
 * - size: xs, sm, md, lg, xl
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
    disabled: {
      control: { type: "boolean" },
      description: "Sets the button to a disabled state",
    },
    pill: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<FunkButtonProps>;

export default meta;
type Story = StoryObj<FunkButtonProps>;

export const AllVariants: Story = {
  render: (args: FunkButtonProps) => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${["default", "primary", "secondary", "accent", "info", "success", "warning", "error"].map(
        (variant) => html`
          <button 
            is="fk-button" 
            variant=${variant}
            size=${args.size}
            style-type=${args.styleType}
            ?disabled=${args.disabled}
            pill=${args.pill}
          >
            ${variant}
          </button>
        `,
      )}
    </div>
  `,
  args: {
    size: "md",
    styleType: "default",
    pill: false,
  },
};

export const AllStyleTypes: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${["default", "soft", "outline", "text"].map(
        (styleType) => html`
          <button
            is="fk-button"
            variant=${args.variant}
            size=${args.size}
            style-type=${styleType}
            ?disabled=${args.disabled}
            pill=${args.pill}
          >
            ${styleType}
          </button>
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
          <button is="fk-button"
            variant=${args.variant}
            size=${size}
            style-type=${args.styleType}
            ?disabled=${args.disabled}
            pill=${args.pill}
          >
            ${size}
          </button>
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
