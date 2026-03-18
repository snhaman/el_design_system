import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/components/ui/badge";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Tag** — \`rules.components.tag\`

Filled or outlined. 9 color options. 4 sizes. Optional close button.
Tags truncate at the container boundary with ellipsis — always use a fixed-width parent for long labels.

Primary purple is the default color. Non-brand accent colors (cyan, pink, blue) are for accent-only use, not primary UI.
        `,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined"] },
    color: {
      control: "select",
      options: ["purple", "orange", "cyan", "pink", "blue", "green", "yellow", "red", "neutral"],
    },
    size: { control: "select", options: ["large", "medium", "small", "micro"] },
    closeable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "RNA-seq",
    variant: "filled",
    color: "purple",
    size: "medium",
  },
};

export const Closeable: Story = {
  args: {
    children: "Dataset: TCGA",
    variant: "filled",
    color: "purple",
    closeable: true,
    onClose: () => alert("Tag closed"),
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["purple", "orange", "cyan", "pink", "blue", "green", "yellow", "red", "neutral"] as const).map(
        (color) => (
          <Tag key={color} color={color} variant="filled">
            {color}
          </Tag>
        )
      )}
    </div>
  ),
};

export const AllColorsOutlined: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["purple", "orange", "cyan", "pink", "blue", "green", "yellow", "red", "neutral"] as const).map(
        (color) => (
          <Tag key={color} color={color} variant="outlined">
            {color}
          </Tag>
        )
      )}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="large">Large</Tag>
      <Tag size="medium">Medium</Tag>
      <Tag size="small">Small</Tag>
      <Tag size="micro">Micro</Tag>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="w-32">
      <Tag>A very long tag label that will truncate</Tag>
    </div>
  ),
};
