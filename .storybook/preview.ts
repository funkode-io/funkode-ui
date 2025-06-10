import type { Preview } from "@storybook/web-components-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "storybook/theming";
import "./main.css";

// import MSW
import { initialize, mswLoader } from "msw-storybook-addon";

// Configure MSW with correct service worker path
const getServiceWorkerUrl = () => {
  const baseUrl = process.env.NODE_ENV === 'production' ? '/funkode-ui' : '';
  return `${baseUrl}/mockServiceWorker.js`;
};

// import components
import { LinkWalletComponent } from "../lib/components/headless/link-wallet/link-wallet";
import { FunkButton } from "../lib/components/ui/button/button";
import { FunkNavigation } from "../lib/components/ui/nav/nav";
import { FunkCard } from "../lib/components/ui/card/card";
import { FunkDialog } from "../lib/components/headless/dialog/dialog";

import type { IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

console.log("Loading preview.ts...");

console.log("Make sure components are loaded", LinkWalletComponent, FunkButton, FunkNavigation, FunkCard, FunkDialog);

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  serviceWorker: {
    url: getServiceWorkerUrl(),
  },
});

const preview: Preview = {
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        {
          name: "dark",
          value: "#282a2b", // oklch(20.84% 0.008 17.911) converted to hex
        },
        {
          name: "light",
          value: "#ccc",
        },
      ],
    },
  },
};

export default preview;

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      corporate: "corporate",
      gourmet: "gourmet",
      shadcn: "shadcn",
      dark: "dark",
      black: "black",
      light: "light",
      slack: "slack",
      business: "business",
      forest: "forest",
      amber: "amber",
      winter: "winter",
    },
    defaultTheme: "amber",
    attributeName: "data-theme",
  }),
];
