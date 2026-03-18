import { create } from "@storybook/theming/create";

/**
 * PollyMorph Storybook UI Theme
 * Applies Elucidata brand colours to the Storybook chrome itself.
 */
export default create({
  base: "light",

  // Brand
  brandTitle: "PollyMorph Design System",
  brandUrl: "https://github.com/snhaman/PollyMorph",
  brandTarget: "_blank",

  // UI colours
  colorPrimary: "#8E42EE",   // primary.purple.base
  colorSecondary: "#8E42EE",

  // App UI
  appBg: "#F6F4F9",
  appContentBg: "#FFFFFF",
  appBorderColor: "#E2D9F3",
  appBorderRadius: 8,

  // Text
  textColor: "#1A1423",
  textInverseColor: "#FFFFFF",
  textMutedColor: "#6B6B7B",

  // Toolbar
  barTextColor: "#1A1423",
  barSelectedColor: "#8E42EE",
  barHoverColor: "#8E42EE",
  barBg: "#FFFFFF",

  // Form elements
  inputBg: "#FFFFFF",
  inputBorder: "#C4B5E8",
  inputTextColor: "#1A1423",
  inputBorderRadius: 6,

  // Fonts
  fontBase: '"Inter", sans-serif',
  fontCode: '"JetBrains Mono", monospace',
});
