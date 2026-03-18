import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Radio } from "@/components/ui/checkbox";

const meta: Meta = {
  title: "Components/SelectionControl",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph SelectionControl** — \`rules.components.selectionControl\`

Covers: Checkbox (unchecked / checked / indeterminate) and Radio.
Both use \`primary.purple.base\` for the checked/selected fill.
Disabled state reduces opacity to 40%.
        `,
      },
    },
  },
};

export default meta;

export const CheckboxDefault: StoryObj = {
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

export const RadioGroup: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="dataset-type" label="Public dataset" defaultChecked />
      <Radio name="dataset-type" label="Private dataset" />
      <Radio name="dataset-type" label="Restricted (requires approval)" disabled />
    </div>
  ),
};

export const CheckboxGroup: StoryObj = {
  render: () => (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-xs font-semibold text-[var(--color-neutral-dark)] font-inter mb-2">
        Include in report
      </legend>
      <Checkbox label="Differential expression" defaultChecked />
      <Checkbox label="Pathway enrichment" defaultChecked />
      <Checkbox label="Volcano plot" />
      <Checkbox label="Heatmap" />
    </fieldset>
  ),
};
