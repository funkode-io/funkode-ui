import { create } from "storybook/theming/create";

export default create({
  base: "dark",
  // Typography
  fontBase: '"Roboto", "Open Sans", sans-serif',
  fontCode: "monospace",

  brandTitle: "Funkode UI",
  brandUrl: "https://example.com",
  brandImage: "funkode-ui.svg",
  brandTarget: "_self",

  //
  colorPrimary: "red",
  colorSecondary: "#ffbf00",

  // UI
  appBg: "#18191a",
  appContentBg: "#121212",
  appPreviewBg: "#121212",
  appBorderColor: "#ffbf00",
  appBorderRadius: 4,

  // Fonts
  //fontBase: typography.fonts.base,
  //fontCode: typography.fonts.mono,

  // Text colors
  textColor: "#d5d5d4", // converted from oklch(83.768% 0.001 17.911)
  textInverseColor: "#DCDDD9", // converted from oklch(86.139% 0.007 171.364)
  //textMutedColor: '#798186',

  // Toolbar default and active colors
  barTextColor: "#d5d5d4",
  barSelectedColor: "#ffbf00",
  barHoverColor: "#585C6D",
  barBg: "#18191a",

  // Form colors
  //buttonBg: '#222425',
  //buttonBorder: 'rgba(255,255,255,.1)',
  //booleanBg: '#222425',
  //booleanSelectedBg: '#2E3438',
  inputBg: "#ffffff",
  inputBorder: "#10162F",
  inputTextColor: "#10162F",
  inputBorderRadius: 2,
});
