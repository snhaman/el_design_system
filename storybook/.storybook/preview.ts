import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import pollymorphTheme from "./pollymorph-theme";

const preview: Preview = {
  parameters: {
    docs: {
      theme: pollymorphTheme,
    },
    backgrounds: {
      default: "platform",
      values: [
        { name: "platform", value: "#F6F4F9" },
        { name: "white", value: "#FFFFFF" },
        { name: "sidebar", value: "#211D33" },
        { name: "card", value: "#FFFFFF" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "812px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography", "Spacing", "Elevation", "Icons"],
          "Components",
          [
            "Button",
            "Tag",
            "TextInput",
            "SelectionControl",
            "Table",
            "Tabs",
            "SidebarNav",
            "Breadcrumb",
            "Modal",
            "Snackbar",
            "Tooltip",
            "HoverCard",
            "CommentThread",
            "ChartColors",
            "CLIColors",
          ],
        ],
      },
    },
  },
};

export default preview;
