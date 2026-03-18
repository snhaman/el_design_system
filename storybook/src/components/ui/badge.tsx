import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Tag / Badge
 *
 * Maps to PollyMorph.json `rules.components.tag`.
 *
 * Variants:  filled | outlined
 * Colors:    purple (default) | orange | cyan | pink | blue | green | yellow | red | neutral
 * Sizes:     large | medium | small | micro
 * Closeable: adds an × button; onClose is fired when clicked.
 *
 * Truncation: tags truncate at the container boundary with ellipsis.
 */

const TAG_COLORS = {
  purple:  { filled: "bg-[var(--color-primary-purple-90)]  text-[var(--color-primary-purple)]  border-transparent", outlined: "border-[var(--color-primary-purple)] text-[var(--color-primary-purple)] bg-transparent" },
  orange:  { filled: "bg-orange-100                         text-orange-700                      border-transparent", outlined: "border-orange-500                      text-orange-700 bg-transparent" },
  cyan:    { filled: "bg-cyan-100                           text-cyan-700                        border-transparent", outlined: "border-cyan-500                        text-cyan-700 bg-transparent" },
  pink:    { filled: "bg-pink-100                           text-pink-700                        border-transparent", outlined: "border-pink-500                        text-pink-700 bg-transparent" },
  blue:    { filled: "bg-blue-100                           text-blue-700                        border-transparent", outlined: "border-blue-600                        text-blue-700 bg-transparent" },
  green:   { filled: "bg-green-100                          text-green-700                       border-transparent", outlined: "border-green-600                       text-green-700 bg-transparent" },
  yellow:  { filled: "bg-yellow-100                         text-yellow-700                      border-transparent", outlined: "border-yellow-500                      text-yellow-700 bg-transparent" },
  red:     { filled: "bg-red-100                            text-red-700                         border-transparent", outlined: "border-red-500                          text-red-700 bg-transparent" },
  neutral: { filled: "bg-[var(--color-neutral-light)]       text-[var(--color-neutral-grey)]    border-transparent", outlined: "border-[var(--color-neutral-grey)]   text-[var(--color-neutral-grey)] bg-transparent" },
} as const;

export type TagColor = keyof typeof TAG_COLORS;
export type TagVariant = "filled" | "outlined";

const tagBase = cva(
  [
    "inline-flex items-center gap-1",
    "font-inter font-medium leading-none",
    "border rounded-full",
    "max-w-full overflow-hidden",
    "select-none",
  ],
  {
    variants: {
      size: {
        large:  "h-6   px-2.5 text-sm",
        medium: "h-5   px-2   text-xs",
        small:  "h-4   px-1.5 text-[0.6875rem]",
        micro:  "h-3.5 px-1   text-[0.625rem]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof tagBase> {
  variant?: TagVariant;
  color?: TagColor;
  closeable?: boolean;
  onClose?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      size,
      variant = "filled",
      color = "purple",
      closeable,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const colorClasses = TAG_COLORS[color][variant];

    return (
      <span
        ref={ref}
        className={cn(tagBase({ size }), colorClasses, className)}
        {...props}
      >
        <span className="truncate">{children}</span>
        {closeable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="flex-shrink-0 ml-0.5 hover:opacity-70 transition-opacity"
            aria-label="Remove"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
