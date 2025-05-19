import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta = {
  title: "UI/Navigation",
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
export const BrandWithLinks: Story = {
  render: () => html`
  <fk-nav>
    <nav>
    <ul>
      <li><strong>Acme Corp</strong></li>
    </ul>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
</fk-nav>
`,
};

export const BrandLinksAndButtons: Story = {
  render: () => html`
  <fk-nav>
    <nav>
    <ul>
      <li><strong>Acme Corp</strong></li>
    </ul>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><fk-button variant="default" style-type="outline"><button>Products</button></fk-button></li>
    </ul>
  </nav>
</fk-nav>
`,
};
