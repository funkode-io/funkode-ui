import { html, nothing } from "lit";
import type { StoryObj } from "@storybook/web-components-vite";

import funkodeIoSvg from "./assets/funkode-ui.svg?raw";
import type { FunkNavigationProps } from "@/ui/nav/nav";

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
  argTypes: {
    sticky: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<FunkNavigationProps>;

export const BrandWithLinks: Story = {
  render: (args: FunkNavigationProps) => html`
  <nav is="fk-nav" sticky=${args.sticky === true || nothing} class="opacity-100 z-50 m-0 px-4 py-2">
    <ul>
      <li><strong .innerHTML=${funkodeIoSvg}></strong></li>
    </ul>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
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

export const BrandLinksAndButtons: Story = {
  render: (args: FunkNavigationProps) => html`
  <nav is="fk-nav" sticky=${args.sticky === true || nothing} class="opacity-100 z-50 m-0 px-4 py-2">
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

export const Sticky: Story = {
  render: (args: FunkNavigationProps) => html`
  <div class="sticky -top-6 w-full h-15 bg-base-100 z-50 m-0">
    <nav is="fk-nav" sticky=${args.sticky === true || nothing} class="-top-3 opacity-100 z-50 m-0 px-4 pt-3 h-12">
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
        <li>
          <details is="fk-dropdown" x-data="{ theme: ''}" x-init="$nextTick(() => theme = document.querySelector('[data-theme]').getAttribute('data-theme')) | 'not defined'">
            <summary>Theme: <span x-text="theme"></span></summary>
            <ul>
              <li><a href="#" @click="theme = 'amber'; changeBodyTheme(theme);" data-theme="amber">Amber</a></li>
              <li><a href="#" @click="theme = 'forest'; changeBodyTheme(theme)" data-theme="forest">Forest</a></li>
              <li><a href="#" @click="theme = 'dark'; changeBodyTheme(theme)" data-theme="dark">Dark</a></li>
              <li><a href="#" @click="theme = 'light'; changeBodyTheme(theme)" data-theme="light">Light</a></li>
              <li><a href="#" @click="theme = 'winter'; changeBodyTheme(theme)" data-theme="winter">Winter</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  </div>
  <!-- transparent layout -->
  <div class="sticky top-9 h-5 z-40 bg-base-200/10 bg-gradient-to-t from-base-200/10 to-base-200 m-0"></div>
  <!-- main content -->
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
  <script>
    function changeBodyTheme(theme) {
      document.body.setAttribute('data-theme', theme);
    }
  </script>
`,
  args: {
    sticky: true,
  },
};
