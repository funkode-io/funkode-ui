import { html, nothing } from "lit";
import type { Meta, Story } from "storybook/web-components";

import type { FunkDialogProps } from "@/lib/components/headless/dialog/dialog";

export default {
  title: "Headless/Dialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      source: {
        format: "dedent",
      },
    },
  },
  argTypes: {
    position: {
      control: { type: "radio" },
      options: ["right", "center"],
    },
  },
} satisfies Meta<FunkDialogProps>;

export const OpenRight: Story = {
  render: (args: FunkDialogProps) => html`
    <fk-dialog click-outside-close position=${args.position}>
      <button is="fk-button" data-trigger>Open Right</button>
      <dialog 
        data-content
        open=${args.open ? "open" : nothing}
      >
        <div>
          
          <article is="fk-card" class="!bg-accent">
            <header>
            <nav is="fk-nav" class="!bg-accent">
              <ul class="bg-accent"><li class="text-2xl">Dialog title</li> </ul>
              <ul>
                <li><i data-trigger aria-label="Close" class="text-2xl icon-[lucide--x] cursor-pointer"></i></li>
              </ul>
            </nav>             
            </header>
            <p class="text-md text-accent-content">This is the content of the dialog.</p>
          </article>
        </div>
      </dialog>
    </fk-dialog>
  `,
  args: {
    position: "right",
  },
};

export const OpenCenter: Story = {
  render: (args) => html`
    <fk-dialog click-outside-close position="center">
      <button is="fk-button" data-trigger>Open Center</button>
      <dialog 
        data-content
        open=${args.open ? "open" : nothing}
      >
        <div>
          <nav is="fk-nav">
            <ul><li class="text-xl">Dialog title</li> </ul>
            <ul>
              <li><i data-trigger aria-label="Close" class="text-xl icon-[lucide--x] cursor-pointer"></i></li>
            </ul>
          </nav>
          <p class="text-md text-accent-content">This is the content of the dialog.</p>
        </div>
      </dialog>
    </fk-dialog>
  `,
  args: {
    open: false,
  },
};
