import { html } from "lit";
import type { StoryObj } from "@storybook/web-components-vite";
import { type FunkDropdownProps, validVariants } from "@/lib/components";

const meta = {
  title: "UI/Dropdown",
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
  },
};

export default meta;

type Story = StoryObj<FunkDropdownProps>;

export const Dropdown: Story = {
  render: () => html`
  <details is="fk-dropdown" class="mb-8 w-64" variant="primary" open>
    <summary>Dropdown</summary>
    <ul>
      <li><a href="#">Solid</a></li>
      <li><a href="#">Liquid</a></li>
      <li><a href="#">Gas</a></li>
      <li><a href="#">Plasma</a></li>
    </ul>
  </details>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${validVariants.map(
        (variant) => html`
          <details is="fk-dropdown" class="mb-8 w-40" variant=${variant}>
            <summary>Dropdown</summary>
            <ul>
              <li><a href="#">Solid</a></li>
              <li><a href="#">Liquid</a></li>
              <li><a href="#">Gas</a></li>
              <li><a href="#">Plasma</a></li>
            </ul>
          </details>`,
      )}
    </div>
  `,
};

export const DropdownInsideNav: Story = {
  render: (args: FunkDropdownProps) => html`
  
  <nav is="fk-nav" class="mb-2 w-full">
    <ul><li>Some brand</li></ul>
    <ul>
      <li><a href="#">Home</a></li>
      <li>
        <button is="fk-button" variant="default" style-type="default"> Login </button>
      </li>
      <li>
        <details is="fk-dropdown" variant=${args.variant}>
          <summary>User</summary>
          <ul>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </details>
      </li>
      </li>
    </ul>
  </nav>  
  `,
  args: {
    variant: "default",
  },
};
