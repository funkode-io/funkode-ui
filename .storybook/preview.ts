import type { Preview } from "@storybook/web-components";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from '@storybook/theming';
import "./main.css"; // replace with the name of your tailwind css file


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
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#282a2b", // oklch(20.84% 0.008 17.911) converted to hex
        },
        {
          name: "light",
          value: "#ccc",
        }
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
