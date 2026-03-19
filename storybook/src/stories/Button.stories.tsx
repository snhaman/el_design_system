import type { Meta, StoryObj } from "@storybook/react";
import { Button, SplitButton } from "@/components/ui/button";

/* ── Icon helpers ──────────────────────────────────────────────────────────── */

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 10v3h11v-3M8 2v8M5 5l3-3 3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 4h12M6 4V2h4v2M5 4v9h6V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Meta ──────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Button** — \`rules.components.button\`

Five hierarchies × three sizes × all icon/split variants.
Typography: Inter 14px / 20px / 500 (Label/Large). Not uppercase.

| Hierarchy   | Background             | Text             | Border                    |
|-------------|------------------------|------------------|---------------------------|
| primary     | primary.purple         | white            | —                         |
| secondary   | transparent            | primary.purple   | primary.purple            |
| ghost       | transparent            | primary.purple   | —                         |
| tonal       | secondary.purple/15→wh | secondary.purple | —                         |
| destructive | primary.red/-40        | white            | —                         |

**Hover** = base −20 &nbsp;**Pressed** = base −40 &nbsp;**Disabled** = neutral/90 bg + neutral/40 text
        `,
      },
    },
  },
  argTypes: {
    hierarchy: {
      control: "select",
      options: ["primary", "secondary", "ghost", "tonal", "destructive"],
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
    },
    loading:  { control: "boolean" },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ── Interactive (argTypes-driven) ─────────────────────────────────────────── */

export const Playground: Story = {
  args: {
    hierarchy: "primary",
    size:      "medium",
    children:  "Save changes",
  },
};

/* ── Hierarchy grid ─────────────────────────────────────────────────────────── */

export const AllHierarchies: Story = {
  name: "All Hierarchies",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button hierarchy="primary">Primary</Button>
      <Button hierarchy="secondary">Secondary</Button>
      <Button hierarchy="ghost">Ghost</Button>
      <Button hierarchy="tonal">Tonal</Button>
      <Button hierarchy="destructive">Destructive</Button>
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────────────────────── */

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["primary", "secondary", "ghost", "tonal", "destructive"] as const).map((h) => (
        <div key={h} className="flex flex-wrap items-center gap-3">
          <span
            style={{
              width: 96,
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--color-neutral-grey)",
              flexShrink: 0,
            }}
          >
            {h}
          </span>
          <Button hierarchy={h} size="large">Large (48px)</Button>
          <Button hierarchy={h} size="medium">Medium (40px)</Button>
          <Button hierarchy={h} size="small">Small (32px)</Button>
        </div>
      ))}
    </div>
  ),
};

/* ── Icon variants ──────────────────────────────────────────────────────────── */

export const IconVariants: Story = {
  name: "Icon Variants",
  render: () => (
    <div className="flex flex-col gap-4">
      <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-neutral-grey)" }}>
        icon-left + text
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button hierarchy="primary"  size="large"  leftIcon={<PlusIcon />}>Add dataset</Button>
        <Button hierarchy="primary"  size="medium" leftIcon={<PlusIcon />}>Add dataset</Button>
        <Button hierarchy="primary"  size="small"  leftIcon={<PlusIcon />}>Add dataset</Button>
      </div>

      <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-neutral-grey)", marginTop: 8 }}>
        text + icon-right
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button hierarchy="secondary" size="large"  rightIcon={<ChevronRightIcon />}>Export</Button>
        <Button hierarchy="secondary" size="medium" rightIcon={<ChevronRightIcon />}>Export</Button>
        <Button hierarchy="secondary" size="small"  rightIcon={<ChevronRightIcon />}>Export</Button>
      </div>

      <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-neutral-grey)", marginTop: 8 }}>
        icon-only (square)
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button hierarchy="primary"  size="large"  iconOnly><PlusIcon /></Button>
        <Button hierarchy="primary"  size="medium" iconOnly><PlusIcon /></Button>
        <Button hierarchy="primary"  size="small"  iconOnly><PlusIcon /></Button>
        <Button hierarchy="secondary" size="large"  iconOnly><UploadIcon /></Button>
        <Button hierarchy="secondary" size="medium" iconOnly><UploadIcon /></Button>
        <Button hierarchy="secondary" size="small"  iconOnly><UploadIcon /></Button>
        <Button hierarchy="ghost" size="large"  iconOnly><TrashIcon /></Button>
        <Button hierarchy="ghost" size="medium" iconOnly><TrashIcon /></Button>
        <Button hierarchy="ghost" size="small"  iconOnly><TrashIcon /></Button>
        <Button hierarchy="tonal" size="medium" iconOnly><PlusIcon /></Button>
        <Button hierarchy="destructive" size="medium" iconOnly><TrashIcon /></Button>
      </div>
    </div>
  ),
};

/* ── Split variants ─────────────────────────────────────────────────────────── */

export const SplitVariants: Story = {
  name: "Split / Dropdown",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["primary", "secondary", "ghost", "tonal", "destructive"] as const).map((h) => (
        <div key={h} className="flex flex-wrap items-center gap-4">
          <span
            style={{
              width: 96,
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--color-neutral-grey)",
              flexShrink: 0,
            }}
          >
            {h}
          </span>
          {/* text + split */}
          <SplitButton hierarchy={h} size="large">Run analysis</SplitButton>
          <SplitButton hierarchy={h} size="medium">Run analysis</SplitButton>
          <SplitButton hierarchy={h} size="small">Run analysis</SplitButton>
          {/* icon + text + split */}
          <SplitButton hierarchy={h} size="medium" leftIcon={<UploadIcon />}>Export</SplitButton>
          {/* icon + split (iconOnly main) */}
          <SplitButton hierarchy={h} size="medium" leftIcon={<PlusIcon />} />
        </div>
      ))}
    </div>
  ),
};

/* ── Disabled state ──────────────────────────────────────────────────────────── */

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-4">
      <p
        style={{
          fontSize: "0.75rem",
          fontFamily: "Inter, sans-serif",
          color: "var(--color-neutral-grey)",
          marginBottom: 4,
        }}
      >
        Disabled state is identical for all hierarchies — neutral/90 bg + neutral/40 text.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {(["primary", "secondary", "ghost", "tonal", "destructive"] as const).map((h) => (
          <Button key={h} hierarchy={h} size="medium" disabled>
            {h}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {(["primary", "secondary", "ghost", "tonal", "destructive"] as const).map((h) => (
          <Button key={h} hierarchy={h} size="medium" disabled leftIcon={<PlusIcon />}>
            {h}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {(["primary", "secondary", "ghost"] as const).map((h) => (
          <Button key={h} hierarchy={h} size="medium" disabled iconOnly>
            <PlusIcon />
          </Button>
        ))}
        {(["primary", "secondary"] as const).map((h) => (
          <SplitButton key={h} hierarchy={h} size="medium" disabled>
            Disabled split
          </SplitButton>
        ))}
      </div>
    </div>
  ),
};

/* ── Loading state ───────────────────────────────────────────────────────────── */

export const LoadingState: Story = {
  name: "Loading",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button hierarchy="primary"  size="large"  loading>Saving…</Button>
      <Button hierarchy="primary"  size="medium" loading>Saving…</Button>
      <Button hierarchy="primary"  size="small"  loading>Saving…</Button>
      <Button hierarchy="secondary" size="medium" loading>Loading</Button>
      <Button hierarchy="destructive" size="medium" loading>Deleting</Button>
    </div>
  ),
};
