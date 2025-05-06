import type { StorybookConfig } from "@storybook/web-components-vite";


const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  features: {
    backgroundsStoryGlobals: false,
  },
};
export default config;

export const previewAnnotations: StorybookConfig['previewAnnotations'] = (entry = []) => [
  ...entry,
  require.resolve('flyonui/flyonui'),
];
