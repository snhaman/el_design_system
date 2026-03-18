import type { Config } from "tailwindcss";

/**
 * PollyMorph Tailwind Config
 *
 * Maps Tailwind utilities to PollyMorph CSS custom properties.
 * Always prefer var(--...) references over hardcoded values so
 * any token update in PollyMorph.json propagates automatically.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Primary ─────────────────────────────────────────────────────────
        "primary-purple": "var(--color-primary-purple)",
        "primary-orange": "var(--color-primary-orange)",

        // ── Secondary ────────────────────────────────────────────────────────
        "secondary-purple": "var(--color-secondary-purple)",
        "secondary-pink": "var(--color-secondary-pink)",
        "secondary-cyan": "var(--color-secondary-cyan)",
        "secondary-blue": "var(--color-secondary-blue)",
        "secondary-lime": "var(--color-secondary-lime)",
        "secondary-brown": "var(--color-secondary-brown)",
        "secondary-coral": "var(--color-secondary-coral)",
        "secondary-lavender": "var(--color-secondary-lavender)",

        // ── Status ───────────────────────────────────────────────────────────
        "status-yellow": "var(--color-status-yellow)",
        "status-red": "var(--color-status-red)",
        "status-green": "var(--color-status-green)",
        "status-blue": "var(--color-status-blue)",

        // ── Neutral ──────────────────────────────────────────────────────────
        "neutral-dark": "var(--color-neutral-dark)",
        "neutral-grey": "var(--color-neutral-grey)",
        "neutral-light": "var(--color-neutral-light)",
        white: "var(--color-white)",

        // ── Surfaces ─────────────────────────────────────────────────────────
        "sidebar-bg": "var(--color-sidebar-bg)",
        "sidebar-stroke": "var(--color-sidebar-stroke)",
        "card-bg": "var(--color-card-bg)",

        // ── Semantic shortcuts ────────────────────────────────────────────────
        brand: "var(--color-primary-purple)",
        muted: "var(--color-neutral-grey)",
        interactive: "var(--color-primary-purple)",
      },
      fontFamily: {
        inter: "var(--font-family-inter)",
        grotesk: "var(--font-family-space-grotesk)",
        mono: "var(--font-family-jetbrains-mono)",
      },
      fontSize: {
        "2xs": "var(--font-size-10)",
        xs: "var(--font-size-12)",
        sm: "var(--font-size-14)",
        base: "var(--font-size-16)",
        lg: "var(--font-size-18)",
        xl: "var(--font-size-20)",
        "2xl": "var(--font-size-24)",
        "3xl": "var(--font-size-28)",
        "4xl": "var(--font-size-32)",
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--elevation-sm)",
        md: "var(--elevation-md)",
        lg: "var(--elevation-lg)",
        xl: "var(--elevation-xl)",
      },
      spacing: {
        0: "var(--spacing-0)",
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        7: "var(--spacing-7)",
        8: "var(--spacing-8)",
        10: "var(--spacing-10)",
        12: "var(--spacing-12)",
        14: "var(--spacing-14)",
        16: "var(--spacing-16)",
      },
    },
  },
  plugins: [],
};

export default config;
