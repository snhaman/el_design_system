import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "@/components/ui/tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Tabs** — \`rules.components.tabs\`

Active tab uses a 2px bottom border in \`primary.purple.base\`.
Inactive tabs are muted grey, turning dark on hover.
Optional badge count on any tab.
Tabs overflow scroll horizontally when container is too narrow.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    items: [
      { id: "overview", label: "Overview", content: <div className="text-sm text-[var(--color-neutral-grey)] font-inter">Overview content goes here.</div> },
      { id: "data", label: "Data", content: <div className="text-sm text-[var(--color-neutral-grey)] font-inter">Data table content goes here.</div> },
      { id: "analysis", label: "Analysis", content: <div className="text-sm text-[var(--color-neutral-grey)] font-inter">Analysis results go here.</div> },
    ],
    defaultActiveId: "overview",
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: "all", label: "All datasets", badge: 142 },
      { id: "mine", label: "My datasets", badge: 8 },
      { id: "shared", label: "Shared with me", badge: 23 },
      { id: "archived", label: "Archived", badge: 0 },
    ],
    defaultActiveId: "all",
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { id: "summary", label: "Summary" },
      { id: "plots", label: "Plots" },
      { id: "raw", label: "Raw data", disabled: true },
      { id: "exports", label: "Exports", disabled: true },
    ],
    defaultActiveId: "summary",
  },
};

export const Overflow: Story = {
  render: () => (
    <div className="w-80">
      <Tabs
        defaultActiveId="t1"
        items={[
          { id: "t1", label: "Overview" },
          { id: "t2", label: "Differential Expression" },
          { id: "t3", label: "Pathway Enrichment" },
          { id: "t4", label: "Volcano Plot" },
          { id: "t5", label: "Heatmap" },
          { id: "t6", label: "Raw Counts" },
        ]}
      />
    </div>
  ),
};
