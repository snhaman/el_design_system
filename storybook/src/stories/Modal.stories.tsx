import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "Components/Modal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Modal** — \`rules.components.modal\`

Two sizes:
- **Popup** (max-width 480px) — confirmations, simple forms
- **Modal** (max-width 720px) — complex content, data entry

Anatomy: backdrop → container → header (title + close) → scrollable body → footer.
Footer pattern: ghost/tertiary action on the left, filled primary on the right.
Dismiss: ESC key or clicking the backdrop.
        `,
      },
    },
  },
};

export default meta;

export const Popup: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open popup</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="popup"
          title="Delete dataset?"
          description="This action cannot be undone. All analyses referencing this dataset will be affected."
          footer={
            <ModalFooter
              cancelLabel="Cancel"
              confirmLabel="Delete"
              confirmVariant="destructive"
              onCancel={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
            />
          }
        />
      </div>
    );
  },
};

export const ModalSize: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open modal (720px)</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="modal"
          title="Dataset metadata"
          description="Review and update the metadata for this dataset before publishing."
          footer={
            <ModalFooter
              cancelLabel="Discard"
              confirmLabel="Save metadata"
              onCancel={() => setOpen(false)}
              onConfirm={() => setOpen(false)}
            />
          }
        >
          <div className="flex flex-col gap-4 text-sm text-[var(--color-neutral-grey)] font-inter">
            <p>
              This is the scrollable body area. Add form fields, data tables, or
              any other content here. The header and footer remain sticky.
            </p>
            <p>
              Long content will trigger vertical scrolling within the modal body,
              keeping the header and footer always visible.
            </p>
            <div className="h-32 rounded-[var(--radius-md)] bg-[var(--color-neutral-light)] flex items-center justify-center text-[var(--color-neutral-grey)]">
              Form fields go here
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

export const NoFooter: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="outlined" onClick={() => setOpen(true)}>Open info popup</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="popup"
          title="About this analysis"
          description="Differential expression was computed using DESeq2 on the filtered count matrix."
        >
          <p className="text-sm text-[var(--color-neutral-grey)] font-inter leading-relaxed">
            Genes with adjusted p-value &lt; 0.05 and |log₂FC| &gt; 1 are considered significant.
            Visualisations are generated from the normalised counts table.
          </p>
        </Modal>
      </div>
    );
  },
};
