import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Button — v2
 *
 * hierarchy: primary | secondary | ghost | tonal | destructive
 * size:      large (h-12/48px) | medium (h-10/40px) | small (h-8/32px)
 *
 * Props:
 *   leftIcon   — node rendered before children (gap-2 = 8px)
 *   rightIcon  — node rendered after children
 *   iconOnly   — square, no horizontal padding
 *   loading    — spinner replaces content
 *
 * See SplitButton for split/dropdown variant.
 *
 * Color steps:
 *   hover  = base -20 (2 steps)   active = base -40 (4 steps)
 *   disabled = neutral/90 bg + neutral/40 text (same for all hierarchies)
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "text-label-lg",          // Inter 14px/20px 500 — defined in globals.css
    "border transition-colors duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      hierarchy: {
        primary: [
          "bg-[var(--color-primary-purple)] text-white border-transparent",
          "hover:bg-[var(--color-primary-purple-n20)]",
          "active:bg-[var(--color-primary-purple-n40)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)] disabled:border-transparent",
        ],
        secondary: [
          "bg-transparent text-[var(--color-primary-purple)] border-[var(--color-primary-purple)]",
          "hover:bg-[var(--color-hover-overlay)]",
          "active:bg-[var(--color-active-overlay)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)] disabled:border-transparent",
        ],
        ghost: [
          "bg-transparent text-[var(--color-primary-purple)] border-transparent",
          "hover:bg-[var(--color-hover-overlay)]",
          "active:bg-[var(--color-active-overlay)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]",
        ],
        tonal: [
          "bg-[var(--color-btn-tonal-bg)] text-[var(--color-secondary-purple)] border-transparent",
          "hover:bg-[var(--color-btn-tonal-hover)]",
          "active:bg-[var(--color-btn-tonal-press)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]",
        ],
        destructive: [
          "bg-[var(--color-btn-destructive)] text-white border-transparent",
          "hover:bg-[var(--color-btn-destructive-hover)]",
          "active:bg-[var(--color-btn-destructive-press)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]",
        ],
      },
      size: {
        large:  "h-12 gap-2 rounded-[var(--radius-md)]",
        medium: "h-10 gap-2 rounded-[var(--radius-md)]",
        small:  "h-8  gap-2 rounded-[var(--radius-sm)]",
      },
      iconOnly: {
        true:  "aspect-square px-0",
        false: "",
      },
    },
    compoundVariants: [
      { size: "large",  iconOnly: false, class: "px-5" },
      { size: "medium", iconOnly: false, class: "px-4" },
      { size: "small",  iconOnly: false, class: "px-[10px]" },
    ],
    defaultVariants: {
      hierarchy: "primary",
      size: "medium",
      iconOnly: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      hierarchy,
      size,
      iconOnly,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ hierarchy, size, iconOnly, className }))}
        {...props}
      >
        {loading ? (
          <ButtonSpinner />
        ) : (
          <>
            {leftIcon && (
              <span className="flex-shrink-0 flex items-center">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="flex-shrink-0 flex items-center">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/* ── SplitButton ─────────────────────────────────────────────────────────────
 * Split = main action button (left, rounded-r-none) +
 *         dropdown trigger button (right, rounded-l-none).
 * Rendered as a <span role="group"> so both are proper <button> elements.
 */

const splitTriggerVariants = cva(
  [
    "inline-flex items-center justify-center flex-shrink-0",
    "border transition-colors duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      hierarchy: {
        primary: [
          "bg-[var(--color-primary-purple)] text-white",
          "border-t-transparent border-r-transparent border-b-transparent border-l-white/30",
          "hover:bg-[var(--color-primary-purple-n20)]",
          "active:bg-[var(--color-primary-purple-n40)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)] disabled:border-transparent",
        ],
        secondary: [
          "bg-transparent text-[var(--color-primary-purple)]",
          "border-[var(--color-primary-purple)]",
          "hover:bg-[var(--color-hover-overlay)]",
          "active:bg-[var(--color-active-overlay)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)] disabled:border-transparent",
        ],
        ghost: [
          "bg-transparent text-[var(--color-primary-purple)]",
          "border-transparent border-l-[var(--color-hover-overlay)]",
          "hover:bg-[var(--color-hover-overlay)]",
          "active:bg-[var(--color-active-overlay)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]",
        ],
        tonal: [
          "bg-[var(--color-btn-tonal-bg)] text-[var(--color-secondary-purple)]",
          "border-transparent border-l-[var(--color-secondary-purple)]/20",
          "hover:bg-[var(--color-btn-tonal-hover)]",
          "active:bg-[var(--color-btn-tonal-press)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]",
        ],
        destructive: [
          "bg-[var(--color-btn-destructive)] text-white",
          "border-transparent border-l-white/30",
          "hover:bg-[var(--color-btn-destructive-hover)]",
          "active:bg-[var(--color-btn-destructive-press)]",
          "disabled:bg-[var(--color-btn-disabled-bg)] disabled:text-[var(--color-btn-disabled-text)]",
        ],
      },
      size: {
        large:  "w-10 rounded-r-[var(--radius-md)]",
        medium: "w-9  rounded-r-[var(--radius-md)]",
        small:  "w-8  rounded-r-[var(--radius-sm)]",
      },
    },
    defaultVariants: {
      hierarchy: "primary",
      size:      "medium",
    },
  }
);

export interface SplitButtonProps {
  hierarchy?: VariantProps<typeof buttonVariants>["hierarchy"];
  size?:      VariantProps<typeof buttonVariants>["size"];
  disabled?:  boolean;
  loading?:   boolean;
  leftIcon?:  React.ReactNode;
  onSplitClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?:  React.ReactNode;
}

const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    {
      hierarchy = "primary",
      size = "medium",
      disabled,
      loading,
      leftIcon,
      onSplitClick,
      className,
      children,
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <span className="inline-flex items-stretch" role="group">
        {/* Main action */}
        <button
          ref={ref}
          disabled={isDisabled}
          className={cn(
            buttonVariants({ hierarchy, size, iconOnly: false }),
            "rounded-r-none border-r-0",
            className
          )}
        >
          {loading ? (
            <ButtonSpinner />
          ) : (
            <>
              {leftIcon && (
                <span className="flex-shrink-0 flex items-center">{leftIcon}</span>
              )}
              {children}
            </>
          )}
        </button>
        {/* Dropdown trigger */}
        <button
          disabled={isDisabled}
          onClick={onSplitClick}
          aria-label="Open options"
          className={cn(splitTriggerVariants({ hierarchy, size }))}
        >
          <ChevronDownSVG />
        </button>
      </span>
    );
  }
);

SplitButton.displayName = "SplitButton";

/* ── Internal helpers ────────────────────────────────────────────────────── */

const ButtonSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const ChevronDownSVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { Button, SplitButton, buttonVariants };
