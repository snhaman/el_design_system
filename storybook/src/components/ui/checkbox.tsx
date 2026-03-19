import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PollyMorph SelectionControl — Checkbox + Radio
 *
 * size: large (20px) | medium (16px) | small (14px)
 *
 * Checked fill: primary.purple (#8E42EE)
 * Disabled:     neutral/90 bg + neutral/40 indicator
 */

/* ── Shared size map ─────────────────────────────────────────────────────── */

const SIZE = {
  large:  { box: "h-5 w-5",    dot: "h-3 w-3",    svg: 20, sw: 2   },
  medium: { box: "h-4 w-4",    dot: "h-2 w-2",    svg: 16, sw: 2   },
  small:  { box: "h-[14px] w-[14px]", dot: "h-[7px] w-[7px]", svg: 14, sw: 1.5 },
} as const;

type SizeKey = keyof typeof SIZE;

/* ── Checkbox ────────────────────────────────────────────────────────────── */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  indeterminate?: boolean;
  size?: SizeKey;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      indeterminate,
      id,
      disabled,
      size = "medium",
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const fieldId = id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`;
    const s = SIZE[size];

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        <span className="relative flex-shrink-0">
          <input
            ref={inputRef}
            id={fieldId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              "peer appearance-none flex-shrink-0 rounded-[var(--radius-sm)]",
              s.box,
              "border-2 border-[var(--color-neutral-purple)]",
              "bg-white transition-colors duration-150",
              "checked:bg-[var(--color-primary-purple)] checked:border-[var(--color-primary-purple)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1",
              "disabled:bg-[var(--color-btn-disabled-bg)] disabled:border-[var(--color-btn-disabled-text)] disabled:checked:bg-[var(--color-btn-disabled-text)] disabled:cursor-not-allowed"
            )}
            {...props}
          />
          {/* Checkmark / indeterminate mark */}
          <svg
            className={cn(
              "absolute inset-0 text-white opacity-0 peer-checked:opacity-100 pointer-events-none",
              s.box
            )}
            viewBox={`0 0 ${s.svg} ${s.svg}`}
            fill="none"
            aria-hidden="true"
          >
            {indeterminate ? (
              <path
                d={`M${s.svg * 0.2} ${s.svg / 2}h${s.svg * 0.6}`}
                stroke="currentColor"
                strokeWidth={s.sw}
                strokeLinecap="round"
              />
            ) : (
              <path
                d={`M${s.svg * 0.19} ${s.svg / 2}l${s.svg * 0.22} ${s.svg * 0.22}L${s.svg * 0.81} ${s.svg * 0.31}`}
                stroke="currentColor"
                strokeWidth={s.sw}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </span>
        {label && (
          <span
            className={cn(
              "font-inter text-[var(--color-neutral-dark)]",
              disabled && "text-[var(--color-btn-disabled-text)]",
              size === "large"  && "text-body-md",
              size === "medium" && "text-body-sm",
              size === "small"  && "text-body-xs"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

/* ── Radio ───────────────────────────────────────────────────────────────── */

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: SizeKey;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, size = "medium", ...props }, ref) => {
    const fieldId = id ?? `radio-${Math.random().toString(36).slice(2, 7)}`;
    const s = SIZE[size];

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        <span className="relative flex-shrink-0">
          <input
            ref={ref}
            id={fieldId}
            type="radio"
            disabled={disabled}
            className={cn(
              "peer appearance-none flex-shrink-0 rounded-full",
              s.box,
              "border-2 border-[var(--color-neutral-purple)]",
              "bg-white transition-colors duration-150",
              "checked:border-[var(--color-primary-purple)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-1",
              "disabled:bg-[var(--color-btn-disabled-bg)] disabled:border-[var(--color-btn-disabled-text)] disabled:cursor-not-allowed"
            )}
            {...props}
          />
          {/* Inner dot */}
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "opacity-0 peer-checked:opacity-100 pointer-events-none"
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "rounded-full bg-[var(--color-primary-purple)]",
                s.dot,
                disabled && "bg-[var(--color-btn-disabled-text)]"
              )}
            />
          </span>
        </span>
        {label && (
          <span
            className={cn(
              "font-inter text-[var(--color-neutral-dark)]",
              disabled && "text-[var(--color-btn-disabled-text)]",
              size === "large"  && "text-body-md",
              size === "medium" && "text-body-sm",
              size === "small"  && "text-body-xs"
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Checkbox, Radio };
