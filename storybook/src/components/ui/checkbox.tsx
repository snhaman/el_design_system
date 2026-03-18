import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * PollyMorph SelectionControl — Checkbox
 *
 * Maps to PollyMorph.json `rules.components.selectionControl`.
 *
 * States: unchecked | checked | indeterminate | disabled
 */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate, id, disabled, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const fieldId = id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`;

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
          disabled && "cursor-not-allowed opacity-40",
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
              "peer appearance-none h-4 w-4 rounded-[var(--radius-sm)]",
              "border-2 border-[var(--color-neutral-purple)]",
              "bg-white transition-colors duration-150",
              "checked:bg-[var(--color-primary-purple)] checked:border-[var(--color-primary-purple)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
            {...props}
          />
          {/* checkmark */}
          <svg
            className="absolute inset-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
            viewBox="0 0 16 16" fill="none"
          >
            {indeterminate ? (
              <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </span>
        {label && (
          <span className="text-sm font-inter text-[var(--color-neutral-dark)]">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

/* ── Radio ─────────────────────────────────────────────────────────────────── */

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const fieldId = id ?? `radio-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-40",
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
              "peer appearance-none h-4 w-4 rounded-full",
              "border-2 border-[var(--color-neutral-purple)]",
              "bg-white transition-colors duration-150",
              "checked:border-[var(--color-primary-purple)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
            {...props}
          />
          {/* inner dot */}
          <span className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-[var(--color-primary-purple)]" />
          </span>
        </span>
        {label && (
          <span className="text-sm font-inter text-[var(--color-neutral-dark)]">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Checkbox, Radio };
