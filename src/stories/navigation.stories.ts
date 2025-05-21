import { html } from "lit";
import type { StoryObj } from "@storybook/web-components-vite";

import funkodeIoSvg from "./assets/funkode-ui.svg?raw";

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
  <nav is="fk-nav">
    <ul>
      <li><strong .innerHTML=${funkodeIoSvg}></strong></li>
    </ul>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
  <div class="overflow-y-auto top-20 absolute h-full w-full pe-2 pt-4">
    <div class="flex w-full flex-col gap-4">
      <div class="mb-4 flex items-center gap-4">
        <div class="skeleton h-16 w-16 rounded-full"></div>
        <div class="flex flex-col gap-4">
          <div class="skeleton h-4 w-52"></div>
          <div class="skeleton h-4 w-52"></div>
        </div>
      </div>
      <div class="skeleton mb-4 h-16 w-full"></div>
      <div class="skeleton mb-4 h-32 w-full"></div>
    </div>
  </div>
`,
};

export const BrandLinksAndButtons: Story = {
  render: () => html`
  <nav is="fk-nav">
    <ul>
      <li><strong .innerHTML=${funkodeIoSvg}></strong></li>
    </ul>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li>
        <button is="fk-button" variant="default" style-type="default">
          Login
        </button>
      </li>
    </ul>
  </nav>
`,
};

export const Sticky: Story = {
  render: () => html`
  <nav is="fk-nav" sticky>
      <ul>
        <li><strong .innerHTML=${funkodeIoSvg}></strong></li>
      </ul>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li>
          <button is="fk-button" variant="default" style-type="default">
            Login
          </button>
        </li>
      </ul>
  </nav>
  
  <div class="flex flex-col gap-4 h-150 bg-base-100 w-full">
  <div class="flex items-center gap-4">
    <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    <div class="flex flex-col gap-4">
      <div class="skeleton h-4 w-20"></div>
      <div class="skeleton h-4 w-28"></div>
    </div>
  </div>
  <div class="skeleton h-32 w-full"></div>
</div>
`,
};
