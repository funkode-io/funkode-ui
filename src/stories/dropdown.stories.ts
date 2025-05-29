import { html, nothing } from "lit";
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
    open: {
      control: { type: "boolean" },
      description: "Controls whether the dropdown is open by default.",
      table: {
        category: "Behavior",
      },
    },
  },
};

export default meta;

type Story = StoryObj<FunkDropdownProps>;

export const Dropdown: Story = {
  render: (args) => html`
  <details is="fk-dropdown" class="mb-8 w-64" variant="${args.variant}" open="${args.open ? "" : nothing}">
    <summary>Dropdown</summary>
    <ul>
      <li><a href="#">Solid</a></li>
      <li><a href="#">Liquid</a></li>
      <li><a href="#">Gas</a></li>
      <li><a href="#">Plasma</a></li>
    </ul>
  </details>
  `,
  args: {
    variant: "default",
    open: false,
  },
};

export const AllVariants: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${validVariants.map(
    (variant) => html`
          <details is="fk-dropdown" class="mb-8 w-40" variant=${variant} open="${args.open ? "" : nothing}">
            <summary>${variant}</summary>
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
        <button is="fk-button" variant=${args.variant} style-type="default"> Login </button>
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
