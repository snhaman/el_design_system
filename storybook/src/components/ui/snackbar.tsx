import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Snackbar
 *
 * Maps to PollyMorph.json `rules.components.snackbar`.
 *
 * Variants:   default | success | error | warning
 * Modes:      compact | expanded (shows description)
 * Dismiss:    auto (default/success: 4s) | manual (error/warning)
 * Position:   bottom-center of the viewport (when used in a portal/provider)
 *
 * Usage note: render inside a SnackbarProvider or a fixed container.
 * This component renders the visual element only.
 */

const snackbarVariants = cva(
  [
    "flex items-start gap-3 w-full max-w-[480px]",
    "rounded-[var(--radius-lg)] shadow-[var(--elevation-lg)]",
    "px-4 py-3 font-inter",
    "border",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-sidebar-bg)] text-white",
          "border-[var(--color-sidebar-stroke)]",
        ],
        success: [
          "bg-[#0D2E12] text-white",
          "border-[#1A5226]",
        ],
        error: [
          "bg-[#2E0D18] text-white",
          "border-[#5C1A2D]",
        ],
        warning: [
          "bg-[#2B2400] text-white",
          "border-[#544800]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const VARIANT_ICONS: Record<string, React.ReactNode> = {
  default: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke="#8E42EE" strokeWidth="1.5"/>
      <path d="M8 5v3.5M8 10.5v.5" stroke="#8E42EE" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke="#24CF35" strokeWidth="1.5"/>
      <path d="M5 8l2.5 2.5L11 5.5" stroke="#24CF35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" stroke="#FF004D" strokeWidth="1.5"/>
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#FF004D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M8 2L14.5 13H1.5L8 2z" stroke="#F7E217" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6v3M8 10.5v.5" stroke="#F7E217" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export interface SnackbarProps extends VariantProps<typeof snackbarVariants> {
  message: string;
  description?: string;
  /** If true, renders message + description stacked */
  expanded?: boolean;
  onClose?: () => void;
  /** Action label rendered as a link-style button */
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      variant = "default",
      message,
      description,
      expanded,
      onClose,
      actionLabel,
      onAction,
      className,
    },
    ref
  ) => {
    const icon = VARIANT_ICONS[variant ?? "default"];

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(snackbarVariants({ variant }), className)}
      >
        {icon}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">{message}</p>
          {expanded && description && (
            <p className="text-xs text-white/70 mt-0.5 leading-snug">{description}</p>
          )}
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="mt-1 text-xs font-semibold text-[var(--color-primary-purple-80)] hover:underline transition-colors"
            >
              {actionLabel}
            </button>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 p-0.5 rounded opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Snackbar.displayName = "Snackbar";

export { Snackbar };
