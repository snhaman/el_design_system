# PollyMorph × Figma PDS 2.0 — Conflicts & Gaps Report

Generated after a full audit of `https://www.figma.com/design/efOu8CmzqQ3zegLcfdQh9P/PDS-2.0-Library`.

Items marked **🔴 CONFLICT** have two different values for the same thing — one of them is wrong and needs a decision.
Items marked **🟡 GAP** exist in Figma but are missing from PollyMorph entirely — safe to add, but flagged for awareness.

---

## 🔴 CONFLICTS (need a decision before merging)

### 1. `core.color.platform.sidebar.stroke`

| Source | Value |
|--------|-------|
| PollyMorph (current) | `#373051` |
| Figma `Surfaces/Sidebar Stroke` | `#433B60` |

These don't match. `#433B60` is noticeably lighter/more purple than `#373051`. **Which is correct?**

---

### 2. `core.color.platform.surfaces`

| Source | Value |
|--------|-------|
| PollyMorph (current) | `#A78FF7` |
| Figma `Surfaces/Platform` | `#FFFFFF` |

`#A78FF7` is a light lavender/purple — it doesn't appear anywhere in the Figma surface definitions. Figma defines Platform as white (`#FFFFFF`). The `#A78FF7` value looks like it may have been a placeholder or a mistake when the JSON was first authored.

**Which is correct?**

---

### 3. `core.font.size.body.large` — letter spacing

| Source | Value |
|--------|-------|
| PollyMorph `font.letter.spacing` (named scale) | No step for `0.5px` — closest is `wider` at `0.35px` |
| Figma `Body/Large` | `+0.5px` letter spacing |

Body Large uses a letter spacing value that doesn't exist in the current token scale. Either the scale needs a new step, or Body Large's tracking needs to be corrected.

**Is `0.5px` intentional for Body Large, or should it be `0.35px`?**

---

### 4. `core.font.weight` — missing step 550

| Source | Value |
|--------|-------|
| PollyMorph weights | `400, 450, 500, 600, 700` |
| Figma `Subject/Small` | `weight: 550` |

Weight 550 sits between `semiBold (600)` and `medium (500)` and is used in the Subject/Small text style. It's not in the current weight scale.

**Is 550 intentional, or should Subject/Small use 500 or 600?**

---

## 🟡 GAPS (in Figma, missing from PollyMorph — safe to add)

### 5. Missing typography scale: `Slate` (Space Grotesk VW)

A headline-alternative scale using Space Grotesk with variable weight settings. Not in PollyMorph at all.

| Step | Size | Line Height | Weight | Letter Spacing |
|------|------|-------------|--------|----------------|
| Large | 32px / 2rem | 40px / 2.5rem | 450 | 0 |
| Medium | 28px / 1.75rem | 36px / 2.25rem | 500 | +0.5px |
| Small | 24px / 1.5rem | 32px / 2rem | 600 | +0.5px |

---

### 6. Missing typography scale: `Subject` (Space Grotesk VW)

A title-alternative scale using Space Grotesk. Not in PollyMorph at all.

| Step | Size | Line Height | Weight | Letter Spacing |
|------|------|-------------|--------|----------------|
| Large | 22px / 1.375rem | 28px / 1.75rem | 450 | +0.15px |
| Medium | 16px / 1rem | 24px / 1.5rem | 500 | +0.3px |
| Small | 14px / 0.875rem | 20px / 1.25rem | 550 | +0.5px |
| Micro | 12px / 0.75rem | 16px / 1rem | 500 | +0.5px |

---

### 7. Missing typography scale: `PDS Icon Font`

A dedicated icon font scale using the proprietary `PDS-Icon-Font-20` typeface.

| Step | Size | Line Height | Weight |
|------|------|-------------|--------|
| Large | 24px / 1.5rem | 23px / ~1.4375rem | 400 |
| Medium | 20px / 1.25rem | 20px / 1.25rem | 400 |
| Small | 16px / 1rem | 16px / 1rem | 400 |

---

### 8. Missing font family: `PDS-Icon-Font-20`

`core.font.family` does not include the icon font used in the Icon scale.

Suggested addition:
```json
"icon": "'PDS-Icon-Font-20', sans-serif"
```

---

### 9. Missing letter spacing steps

Figma uses spacing values not in the current `core.font.letter.spacing` scale:

| Value | Used in |
|-------|---------|
| `0.15px` | Subject/Large |
| `0.3px` | Subject/Medium, Slate/Medium |
| `0.5px` | Body/Large, Slate/Medium, Slate/Small, Subject/Small, Subject/Micro |

Suggested additions to the named scale:
- `subtleWide: "0.15px"`
- `semiWide: "0.3px"`
- `widest: "0.5px"`

---

### 10. Missing surface token: `platform.sidebar.secondarySurfaces`

Figma defines `Surfaces/Secondary Sidebar: #2C2840` — a mid-point between Sidebar (`#211D33`) and Sidebar Stroke. Not in PollyMorph.

---

### 11. Missing `Surfaces/Lazy Loader Gradient`

Figma defines a `Surfaces/Lazy Loader Gradient` swatch. The value is a gradient (not a flat color) and was not captured as a hex. This needs the actual gradient definition from the design team.

---

### 12. Full colour tint/shade scale not tokenised

Figma has a full scale for every primary and secondary colour using steps:
`98, 95, 92, 90, 85, 80, 75, 70, 60, 50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50, -60, -80`

Positive steps are the base colour mixed with white (e.g. `Purple/98` ≈ 2% purple + 98% white).
Negative steps are the base colour mixed with black (e.g. `Purple/-20` ≈ 80% purple + 20% black).

PollyMorph currently only stores the base (step 0) for each colour. The full computed ramp is not yet tokenised. This is a large addition — recommend a separate pass once conflicts above are resolved.

---

## Summary

| # | Type | Item | Action needed |
|---|------|------|---------------|
| 1 | 🔴 | Sidebar stroke hex | Pick `#373051` or `#433B60` |
| 2 | 🔴 | Platform surface hex | Pick `#A78FF7` or `#FFFFFF` |
| 3 | 🔴 | Body Large letter spacing | Confirm `0.5px` or adjust |
| 4 | 🔴 | Font weight 550 | Confirm or map to 500/600 |
| 5 | 🟡 | Slate type scale | Ready to add |
| 6 | 🟡 | Subject type scale | Ready to add (pending conflict #4) |
| 7 | 🟡 | Icon font type scale | Ready to add |
| 8 | 🟡 | Icon font family token | Ready to add |
| 9 | 🟡 | Letter spacing 0.15/0.3/0.5px | Ready to add |
| 10 | 🟡 | Secondary Sidebar surface | Ready to add |
| 11 | 🟡 | Lazy Loader Gradient | Needs gradient value from design |
| 12 | 🟡 | Full colour tint/shade scale | Separate pass recommended |
