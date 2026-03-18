import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PollyMorph TextInput
 *
 * Maps to PollyMorph.json `rules.components.textInput`.
 *
 * Types:   text | password | search | email | number | url
 * States:  default | focused | error | warning | success | disabled | read-only
 * Sizes:   large (40px) | medium (32px) | small (24px)
 *
 * Slots:   leadingIcon, trailingIcon — pass any React node.
 * Label, hint and error message are rendered outside the input element
 * and composed in the InputField wrapper below.
 */

const inputVariants = cva(
  [
    "w-full bg-white font-inter text-sm text-[var(--color-neutral-dark)]",
    "border rounded-[var(--radius-md)] transition-colors duration-150",
    "placeholder:text-[var(--color-neutral-grey)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-0",
    "disabled:bg-[var(--color-neutral-light)] disabled:text-[var(--color-neutral-grey)] disabled:cursor-not-allowed",
    "read-only:bg-[var(--color-neutral-light)] read-only:focus:ring-0",
  ],
  {
    variants: {
      size: {
        large:  "h-10 px-3 py-2",
        medium: "h-8  px-3 py-1.5",
        small:  "h-6  px-2 py-1 text-xs",
      },
      state: {
        default: "border-[var(--color-neutral-purple)] hover:border-[var(--color-primary-purple)]",
        focused: "border-[var(--color-primary-purple)]",
        error:   "border-[var(--color-status-red)]",
        warning: "border-[var(--color-status-yellow)]",
        success: "border-[var(--color-status-green)]",
      },
    },
    defaultVariants: {
      size: "medium",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, leadingIcon, trailingIcon, ...props }, ref) => {
    const hasIcons = leadingIcon || trailingIcon;

    if (!hasIcons) {
      return (
        <input
          ref={ref}
          className={cn(inputVariants({ size, state, className }))}
          {...props}
        />
      );
    }

    return (
      <div className="relative flex items-center">
        {leadingIcon && (
          <div className="absolute left-2.5 text-[var(--color-neutral-grey)] pointer-events-none flex items-center">
            {leadingIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ size, state }),
            leadingIcon && "pl-8",
            trailingIcon && "pr-8",
            className
          )}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute right-2.5 text-[var(--color-neutral-grey)] flex items-center">
            {trailingIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ── InputField — label + input + hint/error ──────────────────────────────── */

export interface InputFieldProps extends InputProps {
  label?: string;
  hint?: string;
  errorMessage?: string;
  required?: boolean;
  id?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, hint, errorMessage, required, id, state, ...props }, ref) => {
    const fieldId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;
    const resolvedState = errorMessage ? "error" : state;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={fieldId}
            className="text-xs font-semibold text-[var(--color-neutral-dark)] font-inter"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-[var(--color-status-red)]">*</span>
            )}
          </label>
        )}
        <Input ref={ref} id={fieldId} state={resolvedState} {...props} />
        {(errorMessage || hint) && (
          <p
            className={cn(
              "text-xs font-inter",
              errorMessage
                ? "text-[var(--color-status-red)]"
                : "text-[var(--color-neutral-grey)]"
            )}
          >
            {errorMessage ?? hint}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { Input, InputField, inputVariants };
