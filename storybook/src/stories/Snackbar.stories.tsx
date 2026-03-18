import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Snackbar } from "@/components/ui/snackbar";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Snackbar** — \`rules.components.snackbar\`

4 variants: default · success · error · warning.
Auto-dismiss: default and success dismiss after 4 seconds. Error and warning require manual dismiss.

Compact mode: message only.
Expanded mode: message + description.

Not to be confused with toasts — Polly uses snackbars, not toasts.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning"],
    },
    expanded: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    variant: "default",
    message: "Exporting dataset to CSV…",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    message: "Dataset published successfully.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    message: "Failed to run pipeline.",
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    message: "Memory usage is above 80%.",
    onClose: () => {},
  },
};

export const Expanded: Story = {
  args: {
    variant: "error",
    message: "Pipeline execution failed.",
    description: "Step 3 (DESeq2 normalisation) returned exit code 1. Check the logs for details.",
    expanded: true,
    onClose: () => {},
  },
};

export const WithAction: Story = {
  args: {
    variant: "default",
    message: "Analysis deleted.",
    actionLabel: "Undo",
    onAction: () => alert("Undo clicked"),
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[480px]">
      <Snackbar variant="default"  message="Export queued — you'll be notified when it's ready." />
      <Snackbar variant="success"  message="Pipeline completed in 4m 12s." />
      <Snackbar variant="error"    message="Authentication failed. Please sign in again." onClose={() => {}} />
      <Snackbar variant="warning"  message="Your session expires in 5 minutes." onClose={() => {}} />
    </div>
  ),
};

export const AutoDismiss: StoryObj = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => {
          setVisible(true);
          setTimeout(() => setVisible(false), 4000);
        }}>
          Trigger snackbar (auto-dismisses in 4s)
        </Button>
        {visible && (
          <Snackbar
            variant="success"
            message="Changes saved."
            onClose={() => setVisible(false)}
          />
        )}
      </div>
    );
  },
};
