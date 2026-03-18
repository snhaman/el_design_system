import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Tooltip** — \`rules.components.tooltip\`

Two themes: **dark** (sidebar bg, default) and **light** (white with border + shadow).
Four placements: top · bottom · left · right.
Show delay: 300ms. Hide delay: 100ms.
Read-only — never place interactive elements (links, buttons) inside a tooltip.
        `,
      },
    },
  },
  argTypes: {
    theme: { control: "select", options: ["dark", "light"] },
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Dark: Story = {
  args: {
    content: "Hover to see tooltip",
    theme: "dark",
    placement: "top",
    children: <Button variant="outlined">Hover me</Button>,
  },
};

export const Light: Story = {
  args: {
    content: "Last updated 2 hours ago",
    theme: "light",
    placement: "top",
    children: <Button variant="outlined">Hover me</Button>,
  },
};

export const Placements: StoryObj = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outlined" size="small">Top</Button>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip content="Left tooltip" placement="left">
          <Button variant="outlined" size="small">Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" placement="right">
          <Button variant="outlined" size="small">Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outlined" size="small">Bottom</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: "Adjusted p-value computed using the Benjamini–Hochberg method across 18,392 genes.",
    theme: "dark",
    placement: "top",
    children: <Button variant="ghost" size="small">adj.p-val ℹ</Button>,
  },
};
