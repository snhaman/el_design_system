import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Button
 *
 * Variants and sizes are derived from PollyMorph.json `rules.components.button`.
 *
 * Variants:   filled | outlined | ghost
 * Sizes:      large (40px) | medium (32px) | small (24px) | micro (20px)
 *
 * States handled via CSS: hover, active, focus, disabled.
 * Icon-only variant: pass iconOnly prop (renders square at given size).
 */

const buttonVariants = cva(
  [
    // Base — all buttons share these
    "inline-flex items-center justify-center gap-1.5",
    "font-inter font-semibold leading-none whitespace-nowrap",
    "border border-transparent",
    "transition-colors duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        filled: [
          "bg-[var(--color-primary-purple)] text-white",
          "hover:bg-[var(--color-primary-purple-n10)]",
          "active:bg-[var(--color-primary-purple-n20)]",
        ],
        outlined: [
          "bg-transparent text-[var(--color-primary-purple)]",
          "border-[var(--color-primary-purple)]",
          "hover:bg-[var(--color-hover-overlay)]",
          "active:bg-[var(--color-active-overlay)]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-primary-purple)]",
          "hover:bg-[var(--color-hover-overlay)]",
          "active:bg-[var(--color-active-overlay)]",
        ],
        destructive: [
          "bg-[var(--color-status-red)] text-white",
          "hover:opacity-90",
          "active:opacity-80",
        ],
      },
      size: {
        large:  "h-10 px-4 text-sm rounded-[var(--radius-md)]",
        medium: "h-8  px-3 text-sm rounded-[var(--radius-md)]",
        small:  "h-6  px-2 text-xs rounded-[var(--radius-sm)]",
        micro:  "h-5  px-1.5 text-xs rounded-[var(--radius-sm)]",
      },
      iconOnly: {
        true:  "px-0 aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "medium",
      iconOnly: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render a loading spinner instead of children */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, iconOnly, className }))}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
