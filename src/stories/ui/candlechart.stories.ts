import { html } from "lit";
import type { Meta, StoryObj } from "storybook/web-components";

import type { CandleChartProps } from "@/ui/charts/candlechart";

/** Add is="fk-button" to the button element and use the attributes to set the button's properties:
 * - variant: default, primary, secondary, accent, info, success, warning, error
 * - size: xs, sm, md, lg, xl
 *
 */
const meta = {
  title: "UI/ChartCandleSticks",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: {
        format: "dedent",
      },
    },
  },
  argTypes: {
    symbol: {
      control: { type: "text" },
      description: "The symbol to display in the chart, e.g., 'BTC/USDT'",
    },
    interval: {
      description: "The time interval for the candles, e.g., '1h', '1d'",
      control: { type: "radio" },
      options: ["15m", "4h", "1d"],
    },
    limit: {
      description: "Number of candles to display",
      control: { type: "number" },
      defaultValue: 40,
    },
  },
} satisfies Meta<CandleChartProps>;

export default meta;
type Story = StoryObj<CandleChartProps>;

export const Default: Story = {
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
