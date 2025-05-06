import type { Preview } from "@storybook/web-components";
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import './main.css'; // replace with the name of your tailwind css file

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    }
  },
};

export default preview;

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      corporate: 'corporate',
      gourmet: 'gourmet',
      shadcn: 'shadcn',
      dark: 'dark',
      black: 'black',
      light: 'light',
      slack: 'slack',
    },
    defaultTheme: 'corporate',
    attributeName: 'data-theme',
  }),
];
