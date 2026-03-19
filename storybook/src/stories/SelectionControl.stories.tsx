import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Radio } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

/* ── Meta ──────────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: "Components/SelectionControl",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph SelectionControl** — \`rules.components.selectionControl\`

Covers: Checkbox (unchecked / checked / indeterminate), Radio, and Switch/Toggle.

| Size   | Indicator |
|--------|-----------|
| large  | 20 px     |
| medium | 16 px     |
| small  | 14 px     |

Checked / on color: \`primary.purple\` (#8E42EE).
Disabled: neutral/90 bg + neutral/40 indicator.
        `,
      },
    },
  },
};

export default meta;

/* ── Checkbox ────────────────────────────────────────────────────────────────── */

export const CheckboxDefault: StoryObj = {
  name: "Checkbox — States",
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + Checked" disabled defaultChecked />
    </div>
  ),
};

export const CheckboxSizes: StoryObj = {
  name: "Checkbox — Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["large", "medium", "small"] as const).map((sz) => (
        <div key={sz} className="flex flex-col gap-3">
          <p
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--color-neutral-grey)",
              marginBottom: 4,
            }}
          >
            {sz}
          </p>
          <Checkbox size={sz} label="Unchecked" />
          <Checkbox size={sz} label="Checked" defaultChecked />
          <Checkbox size={sz} label="Indeterminate" indeterminate />
          <Checkbox size={sz} label="Disabled" disabled />
        </div>
      ))}
    </div>
  ),
};

export const CheckboxGroup: StoryObj = {
  name: "Checkbox — Group",
  render: () => (
    <fieldset className="flex flex-col gap-2">
      <legend
        style={{
          fontSize: "0.75rem",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          color: "var(--color-neutral-dark)",
          marginBottom: 8,
        }}
      >
        Include in report
      </legend>
      <Checkbox label="Differential expression" defaultChecked />
      <Checkbox label="Pathway enrichment" defaultChecked />
      <Checkbox label="Volcano plot" />
      <Checkbox label="Heatmap" />
    </fieldset>
  ),
};

/* ── Radio ───────────────────────────────────────────────────────────────────── */

export const RadioGroup: StoryObj = {
  name: "Radio — States",
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="dataset-type" label="Public dataset" defaultChecked />
      <Radio name="dataset-type" label="Private dataset" />
      <Radio name="dataset-type" label="Restricted (requires approval)" disabled />
    </div>
  ),
};

export const RadioSizes: StoryObj = {
  name: "Radio — Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["large", "medium", "small"] as const).map((sz) => (
        <div key={sz} className="flex flex-col gap-3">
          <p
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--color-neutral-grey)",
              marginBottom: 4,
            }}
          >
            {sz}
          </p>
          <Radio name={`radio-${sz}`} size={sz} label="Option A" defaultChecked />
          <Radio name={`radio-${sz}`} size={sz} label="Option B" />
          <Radio name={`radio-${sz}`} size={sz} label="Disabled" disabled />
        </div>
      ))}
    </div>
  ),
};

/* ── Switch ──────────────────────────────────────────────────────────────────── */

export const SwitchDefault: StoryObj = {
  name: "Switch — States",
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Off (default)" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on"  disabled defaultChecked />
    </div>
  ),
};

export const SwitchSizes: StoryObj = {
  name: "Switch — Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["large", "medium", "small"] as const).map((sz) => (
        <div key={sz} className="flex flex-col gap-3">
          <p
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--color-neutral-grey)",
              marginBottom: 4,
            }}
          >
            {sz}
          </p>
          <Switch size={sz} label="Off" />
          <Switch size={sz} label="On" defaultChecked />
          <Switch size={sz} label="Disabled" disabled />
        </div>
      ))}
    </div>
  ),
};

export const SwitchNoLabel: StoryObj = {
  name: "Switch — No label",
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="large" />
      <Switch size="large" defaultChecked />
      <Switch size="medium" />
      <Switch size="medium" defaultChecked />
      <Switch size="small" />
      <Switch size="small" defaultChecked />
    </div>
  ),
};

/* ── Combined overview ───────────────────────────────────────────────────────── */

export const AllControls: StoryObj = {
  name: "All Controls — Overview",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
        alignItems: "start",
      }}
    >
      <div className="flex flex-col gap-3">
        <p
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "var(--color-neutral-grey)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          Checkbox
        </p>
        <Checkbox size="large"  label="Large" defaultChecked />
        <Checkbox size="medium" label="Medium" defaultChecked />
        <Checkbox size="small"  label="Small" defaultChecked />
        <Checkbox size="medium" label="Indeterminate" indeterminate />
        <Checkbox size="medium" label="Disabled" disabled />
      </div>

      <div className="flex flex-col gap-3">
        <p
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "var(--color-neutral-grey)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          Radio
        </p>
        <Radio name="ov-radio" size="large"  label="Large" defaultChecked />
        <Radio name="ov-radio" size="medium" label="Medium" />
        <Radio name="ov-radio" size="small"  label="Small" />
        <Radio name="ov-radio" size="medium" label="Disabled" disabled />
      </div>

      <div className="flex flex-col gap-3">
        <p
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 700,
            color: "var(--color-neutral-grey)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          Switch
        </p>
        <Switch size="large"  label="Large on"  defaultChecked />
        <Switch size="medium" label="Medium on"  defaultChecked />
        <Switch size="small"  label="Small on"   defaultChecked />
        <Switch size="medium" label="Off" />
        <Switch size="medium" label="Disabled" disabled />
      </div>
    </div>
  ),
};
