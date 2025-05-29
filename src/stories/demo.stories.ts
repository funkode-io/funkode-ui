import { html } from "lit";
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
  render: () => html`
    <header 
      class="sticky -top-10 flex flex-col items-center z-50 h-20 bg-base-100"
      x-data="{ theme: 'amber' }"
      x-bind:data-theme="theme"
      @newtheme.window="theme = $event.detail.theme;"
    >
      <nav is="fk-nav" class="z-50 m-0 sticky -top-5 px-8 pt-5 w-full h-15" sticky="true">
        <ul>
          <li .innerHTML=${funkodeIoSvg}></li>
        </ul>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Test</a></li>
          <li><a href="#">Catalog</a></li>
          <li>
            <button is="fk-button" variant="default" style-type="default" class="btn">
              Login
            </button>
          </li>
          <li>
            <details is="fk-dropdown">
              <summary x-text="\`Theme: \${theme}\`">Theme</summary>
              <ul>
                <li><a href="#" @click="$dispatch('newtheme', { theme: 'amber' })" data-theme="amber">Amber</a></li>
                <li><a href="#" @click="$dispatch('newtheme', { theme: 'forest' })" data-theme="forest">Forest</a></li>
                <li><a href="#" @click="$dispatch('newtheme', { theme: 'dark' })" data-theme="dark">Dark</a></li>
                <li><a href="#" @click="$dispatch('newtheme', { theme: 'light' })" data-theme="light">Light</a></li>
                <li><a href="#" @click="$dispatch('newtheme', { theme: 'winter' })" data-theme="winter">Winter</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <!-- <div class="sticky top-20 w-full h-10 bg-base-100/50"></div> -->
  </header>
  <div class="sticky top-10 w-full h-10 z-40 bg-gradient-to-t from-base-200/10 to-base-200"></div>
  <main 
    class="flex flex-col gap-4 h-150 bg-base-200 w-full p-4 z-90"
    x-data="{ theme: 'amber' }"
    x-bind:data-theme="theme"
    @newtheme.window="console.log('new theme', event); theme = $event.detail.theme;"
  >
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
        <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
        <h5 class="card-title mb-2.5">Welcome to DFolio</h5>
        <div class="skeleton animate-pulse   h-16 w-16 shrink-0 rounded-full"></div>
        <div class="flex flex-col gap-4">
          <div class="skeleton animate-pulse h-4 w-20"></div>
          <div class="skeleton animate-pulse h-4 w-28"></div>
        </div>
        <div class="skeleton animate-pulse h-32 w-full"></div>
      </div>
    </div>
  </main>
  <div class="flex justify-center">
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-100 color-base-content">100</div>
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-200 color-base-content">200</div>
      <div class="h-15 w-40 flex items-center justify-center mr-1 rounded-box border border-primary bg-base-300 color-base-content">300</div>
    </div>
    <style>
      :root * {
        --fk-nav-element-spacing-vertical: 0.25rem !important;
        --fk-nav-link-spacing-vertical: 0.5rem !important;
      }
    </style>


    `,
};
