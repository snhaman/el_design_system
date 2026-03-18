import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputField } from "@/components/ui/input";

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const meta: Meta<typeof InputField> = {
  title: "Components/TextInput",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph TextInput** — \`rules.components.textInput\`

Covers: text, password, search, email, number, select, textarea.
State is reflected via border colour: default grey → purple hover → purple focus → red error → yellow warning → green success.

Use \`InputField\` for the full label + hint/error message composition.
Use \`Input\` directly when embedding in a custom layout.
        `,
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "focused", "error", "warning", "success"],
    },
    size: { control: "select", options: ["large", "medium", "small"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Dataset name",
    placeholder: "Enter a name…",
    size: "medium",
  },
};

export const WithHint: Story = {
  args: {
    label: "Project name",
    placeholder: "e.g. TCGA-LUAD-2024",
    hint: "Use only letters, numbers, and hyphens.",
    size: "medium",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "you@elucidata.io",
    errorMessage: "Please enter a valid email address.",
    defaultValue: "not-an-email",
    size: "medium",
  },
};

export const WarningState: Story = {
  args: {
    label: "Memory limit (GB)",
    placeholder: "16",
    state: "warning",
    hint: "Values above 64 GB require approval.",
    size: "medium",
  },
};

export const SuccessState: Story = {
  args: {
    label: "Slug",
    defaultValue: "tcga-luad",
    state: "success",
    hint: "This slug is available.",
    size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    label: "Organisation ID",
    defaultValue: "org_elucidata",
    disabled: true,
    size: "medium",
  },
};

export const Search: Story = {
  render: () => (
    <div className="w-72">
      <Input
        type="search"
        placeholder="Search datasets…"
        size="medium"
        leadingIcon={<SearchIcon />}
      />
    </div>
  ),
};

export const Password: Story = {
  render: () => (
    <div className="w-72">
      <InputField
        label="Password"
        type="password"
        placeholder="••••••••"
        size="medium"
        trailingIcon={<EyeIcon />}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input size="large" placeholder="Large (40px)" />
      <Input size="medium" placeholder="Medium (32px)" />
      <Input size="small" placeholder="Small (24px)" />
    </div>
  ),
};
