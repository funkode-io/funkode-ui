import { html, render } from "lit";
import type { StoryObj } from "@storybook/web-components-vite";

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
};

export default meta;

type Story = StoryObj;

export const Dropdown: Story = {
  render: () => html`
  <fk-dropdown>
    <details class="dropdown">
      <summary>Dropdown</summary>
      <ul>
        <li><a href="#">Solid</a></li>
        <li><a href="#">Liquid</a></li>
        <li><a href="#">Gas</a></li>
        <li><a href="#">Plasma</a></li>
      </ul>
    </details>
  </fk-dropdown>`,
};
