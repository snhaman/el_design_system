import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Button** — \`rules.components.button\`

Three variants (filled, outlined, ghost), four sizes, loading state, and icon-only mode.
All states (hover, active, focus, disabled) are driven by CSS using PollyMorph tokens.

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| filled  | primary.purple.base | white | — |
| outlined | transparent | primary.purple.base | primary.purple.base |
| ghost   | transparent | primary.purple.base | — |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["large", "medium", "small", "micro"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    variant: "filled",
    size: "medium",
    children: "Save changes",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
    children: "Export",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "medium",
    children: "Cancel",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "medium",
    children: "Delete dataset",
  },
};

export const Loading: Story = {
  args: {
    variant: "filled",
    size: "medium",
    children: "Saving…",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: "filled",
    size: "medium",
    children: "Unavailable",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="large">Large (40px)</Button>
      <Button size="medium">Medium (32px)</Button>
      <Button size="small">Small (24px)</Button>
      <Button size="micro">Micro (20px)</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="filled">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Add dataset
      </Button>
      <Button variant="outlined">
        Export
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7v4.5h9V7M7 2v7M4.5 5l2.5-3 2.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  ),
};
