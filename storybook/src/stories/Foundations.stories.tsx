import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PollyMorph Color System** — \`core.color\`

21 colors, each with a 22-step tint/shade ramp.
- Positive steps (98–10): mix the base with white
- Negative steps (−10 to −80): mix the base with black
- Step 0: pure base color

**Usage rules from \`rules.color\`:**
- Primary purple is the brand color: CTAs, active states, highlights.
- Primary orange is the secondary brand accent: data-driven UI (charts, callouts).
- Cyan, pink, and blue are accent-only — never for primary actions or navigation.
- Yellow / Red / Green / Blue = status colors only (warning, error, success, info).
        `,
      },
    },
  },
};

export default meta;

const PALETTE = [
  { name: "primary.purple", base: "#8E42EE", ramp: ["#F5EDFD","#EAD9FB","#DFC5F9","#D5B8F8","#C5A0F6","#B88AF4","#9E6CF0","#8E42EE","#7532D0","#5F29A6","#4D2287","#3B1A68"] },
  { name: "primary.orange", base: "#F78E12", ramp: ["#FEF4E6","#FDDBB4","#FCC37F","#FBA84A","#F78E12","#D47800","#AE6200","#8A4E00","#673B00","#452800",""] },
  { name: "primary.red",    base: "#FF004D", ramp: ["#FFE0EA","#FFC2D5","#FF99B8","#FF6699","#FF3370","#FF004D","#CC003D","#99002E","#66001F","",""] },
  { name: "primary.green",  base: "#24CF35", ramp: ["#DFFCE2","#B8F9BE","#88F491","#56EF63","#24CF35","#1BA829","#12801E","#0A5814","#04310B","",""] },
  { name: "primary.yellow", base: "#F7E217", ramp: ["#FEFBE0","#FDF5AD","#FBEC72","#FAE437","#F7E217","#D4C10C","#A89709","#7D6F06","#534904","",""] },
  { name: "primary.blue",   base: "#3C5DE2", ramp: ["#E4E8FA","#C6CCF6","#A4ACEF","#808BE7","#3C5DE2","#2E48C9","#2237A0","#182877","#0E1A4E","",""] },
  { name: "secondary.purple", base: "#936DC3", ramp: [] },
  { name: "secondary.cyan",   base: "#21A3B9", ramp: [] },
  { name: "secondary.pink",   base: "#D85C99", ramp: [] },
  { name: "secondary.blue",   base: "#6173BD", ramp: [] },
  { name: "neutral.purple",   base: "#968AA6", ramp: [] },
];

const SURFACES = [
  { name: "sidebar.bg", value: "#211D33" },
  { name: "sidebar.stroke", value: "#433B60" },
  { name: "card.bg", value: "#FFFFFF" },
];

const ColorSwatch = ({ name, hex }: { name: string; hex: string }) => (
  <div className="flex flex-col gap-1 w-24">
    <div
      className="h-12 w-full rounded-[var(--radius-md)] border border-black/10"
      style={{ backgroundColor: hex }}
    />
    <p className="text-[10px] font-mono text-[var(--color-neutral-grey)] leading-tight break-all">{name}</p>
    <p className="text-[10px] font-mono text-[var(--color-neutral-dark)] leading-tight">{hex}</p>
  </div>
);

export const ColorPalette: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h3 className="text-sm font-semibold font-inter text-[var(--color-neutral-dark)] mb-3">Primary colors</h3>
        <div className="flex flex-wrap gap-4">
          {PALETTE.filter(p => p.name.startsWith("primary")).map(c => (
            <ColorSwatch key={c.name} name={c.name} hex={c.base} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold font-inter text-[var(--color-neutral-dark)] mb-3">Secondary colors</h3>
        <div className="flex flex-wrap gap-4">
          {PALETTE.filter(p => p.name.startsWith("secondary")).map(c => (
            <ColorSwatch key={c.name} name={c.name} hex={c.base} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold font-inter text-[var(--color-neutral-dark)] mb-3">Neutral palette</h3>
        <div className="flex flex-wrap gap-4">
          {PALETTE.filter(p => p.name.startsWith("neutral")).map(c => (
            <ColorSwatch key={c.name} name={c.name} hex={c.base} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold font-inter text-[var(--color-neutral-dark)] mb-3">Surfaces</h3>
        <div className="flex flex-wrap gap-4">
          {SURFACES.map(s => (
            <ColorSwatch key={s.name} name={s.name} hex={s.value} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold font-inter text-[var(--color-neutral-dark)] mb-3">Purple ramp (sample)</h3>
        <div className="flex flex-wrap gap-2">
          {PALETTE[0].ramp.filter(Boolean).map((hex, i) => (
            <div key={i} className="flex flex-col gap-0.5 w-16">
              <div className="h-8 rounded border border-black/10" style={{ backgroundColor: hex }} />
              <p className="text-[9px] font-mono text-[var(--color-neutral-grey)]">{hex}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold font-inter text-[var(--color-neutral-dark)] mb-3">Chart sequence</h3>
        <div className="flex gap-2 items-center flex-wrap">
          {[
            { n: 1, c: "#936DC3" }, { n: 2, c: "#F78E12" }, { n: 3, c: "#21A3B9" },
            { n: 4, c: "#6173BD" }, { n: 5, c: "#D85C99" }, { n: 6, c: "#24CF35" },
            { n: 7, c: "#D98C30" }, { n: 8, c: "#3C5DE2" }, { n: 9, c: "#CC3361" },
          ].map(({ n, c }) => (
            <div key={n} className="flex flex-col gap-0.5 items-center">
              <div className="h-8 w-8 rounded-full border border-black/10" style={{ backgroundColor: c }} />
              <p className="text-[9px] font-mono text-[var(--color-neutral-grey)]">{n}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--color-neutral-grey)] font-inter mt-2">
          Apply in sequence. Do not skip or reorder colors.
        </p>
      </div>
    </div>
  ),
};

export const Typography: StoryObj = {
  name: "Typography",
  render: () => (
    <div className="flex flex-col gap-6 p-4 max-w-2xl">
      {[
        { label: "display.large — 3.375rem / Inter 700", text: "Platform for multi-omics", style: { fontSize: "3.375rem", fontWeight: 700, fontFamily: "'Inter', sans-serif" } },
        { label: "headline.large — 2rem / Inter 600", text: "Differential Expression Analysis", style: { fontSize: "2rem", fontWeight: 600, fontFamily: "'Inter', sans-serif" } },
        { label: "title.large — 1.375rem / Inter 600", text: "Dataset overview", style: { fontSize: "1.375rem", fontWeight: 600, fontFamily: "'Inter', sans-serif" } },
        { label: "body.medium — 0.875rem / Inter 400", text: "Genes with adjusted p-value < 0.05 and |log₂FC| > 1 are highlighted.", style: { fontSize: "0.875rem", fontWeight: 400, fontFamily: "'Inter', sans-serif" } },
        { label: "label.medium — 0.75rem / Inter 600", text: "SAMPLE ID", style: { fontSize: "0.75rem", fontWeight: 600, fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" } },
        { label: "slate.large — 2rem / Space Grotesk 600", text: "Powered by Polly", style: { fontSize: "2rem", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" } },
        { label: "mono — 0.875rem / JetBrains Mono 400", text: "SELECT * FROM cohort WHERE p_adj < 0.05", style: { fontSize: "0.875rem", fontWeight: 400, fontFamily: "'JetBrains Mono', monospace" } },
      ].map(({ label, text, style }) => (
        <div key={label} className="flex flex-col gap-1 border-b border-[var(--color-neutral-light)] pb-4">
          <p className="text-[10px] font-mono text-[var(--color-neutral-grey)]">{label}</p>
          <p style={style} className="text-[var(--color-neutral-dark)] leading-tight">{text}</p>
        </div>
      ))}
    </div>
  ),
};
