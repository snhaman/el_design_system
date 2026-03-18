# PollyMorph Storybook

React component library for the Elucidata / Polly design system, built on top of shadcn/ui primitives styled with `@snhaman/pollymorph` tokens.

## Stack

| Layer | Tool |
|-------|------|
| Bundler | Vite 6 |
| Framework | React 18 |
| Storybook | v8 |
| Component primitives | shadcn/ui (CVA + Tailwind) |
| Tokens | `@snhaman/pollymorph` CSS custom properties |
| Styling | Tailwind CSS v3 (mapped to PollyMorph tokens) |

## Getting started

```bash
cd storybook
npm install
npm run storybook     # dev server at localhost:6006
npm run build-storybook  # static build
```

## Component coverage

All 15 component specs from `PollyMorph.json > rules.components`:

| Component | Story file |
|-----------|-----------|
| Button | `Button.stories.tsx` |
| Tag | `Tag.stories.tsx` |
| TextInput | `TextInput.stories.tsx` |
| SelectionControl | `SelectionControl.stories.tsx` |
| Tabs | `Tabs.stories.tsx` |
| Modal | `Modal.stories.tsx` |
| Snackbar | `Snackbar.stories.tsx` |
| Tooltip | `Tooltip.stories.tsx` |
| Table | planned |
| SidebarNav | planned |
| Breadcrumb | planned |
| HoverCard | planned |
| CommentThread | planned |
| ChartColors | Foundations/Colors story |
| CLIColors | planned |

## Token approach

All token values come from `@snhaman/pollymorph/css` injected in `globals.css`.
Tailwind `tailwind.config.ts` maps every utility class to the corresponding CSS custom property,
so changing a token in `PollyMorph.json` and rebuilding the package propagates everywhere automatically.

```ts
import "@snhaman/pollymorph/css";

// Then use:
// background: var(--color-primary-purple)
// font-family: var(--font-family-inter)
// border-radius: var(--radius-md)
```

## Architecture

```
storybook/
  .storybook/
    main.ts              ← addons, stories glob
    preview.ts           ← global decorators, backgrounds, sort order
    pollymorph-theme.ts  ← Storybook UI themed with PollyMorph colours
  src/
    components/ui/       ← PollyMorph-themed shadcn/ui components
      button.tsx
      badge.tsx          ← Tag component
      input.tsx
      checkbox.tsx       ← Checkbox + Radio
      modal.tsx
      snackbar.tsx
      tooltip.tsx
      tabs.tsx
    lib/utils.ts         ← cn() Tailwind class merge utility
    styles/globals.css   ← Token injection + Tailwind base
    stories/             ← Storybook stories
```
