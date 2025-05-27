import { html, nothing } from "lit";
import type { StoryObj } from "@storybook/web-components-vite";
import funkodeIoSvg from "./assets/funkode-ui.svg?raw";

console.log("Demo stories...");


const meta = {
  title: "Demo/Web3",
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

/**
 * ## AlpineJS example
 * Example how to use this component with AlpineJS */
export const Demo: Story = {
  args: {
    sticky: true
  },
  render: (args) => html`
    <div class="flex justify-center">
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-100 color-base-content">100</div>
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-200 color-base-content">200</div>
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-300 color-base-content">300</div>
    </div>
    <nav is="fk-nav" sticky=${args.sticky === true || nothing} class="opacity-100 z-50 m-0">
      <ul>
        <li><strong .innerHTML=${funkodeIoSvg}></strong></li>
      </ul>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li>
          <fk-link-wallet>
          <button is="fk-button" variant="default" style-type="default" data-trigger>
            Login
          </button>
          </fk-link-wallet>
        </li>
        <li>
          <details is="fk-dropdown">
            <summary>User 1</summary>
            <ul>
              <li><a href="#">Profile</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </details>
        </li>
      </ul>
  </nav>
  <div class="sticky top-20 h-10 bg-gradient-to-t from-base-200/10 to-base-200 z-49 m-0"></div>
  
  <div class="flex flex-col gap-4 h-150 bg-base-200 w-full p-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2.5">Welcome to Our Service</h5>
        <div class="skeleton animate-pulse   h-16 w-16 shrink-0 rounded-full"></div>
        <div class="flex flex-col gap-4">
          <div class="skeleton animate-pulse h-4 w-20"></div>
          <div class="skeleton animate-pulse h-4 w-28"></div>
        </div>
        <div class="skeleton animate-pulse h-32 w-full"></div>
      </div>
    </div>
  </div>
    `,
};
