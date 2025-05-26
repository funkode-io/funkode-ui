import type { Preview } from "@storybook/web-components";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";
import "./main.css";
// import components
import { LinkWalletComponent } from "../lib/components/headless/link-wallet/link-wallet";
import { FunkButton } from "../lib/components/ui/button/button";
import { FunkNavigation } from "../lib/components/ui/nav/nav";



import type { IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

console.log("Loading preview.ts...");

console.log("Make sure LinkWallet component is loaded", LinkWalletComponent);
console.log("Make sure FunkButton component is loaded", FunkButton);
console.log("Make sure FunkNavigation component is loaded", FunkNavigation);

const preview: Preview = {
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
    },
    defaultTheme: "corporate",
    attributeName: "data-theme",
  }),
];
