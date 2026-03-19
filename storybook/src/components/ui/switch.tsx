import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Switch / Toggle
 *
 * size: large | medium | small
 *
 * Track dimensions:
 *   large  — 48 × 24px, thumb 20px
 *   medium — 36 × 20px, thumb 16px
 *   small  — 28 × 16px, thumb 12px
 *
 * On:       primary.purple track, white thumb
 * Off:      neutral/90 track, white thumb
 * Disabled: neutral/90 track, neutral/40 thumb, no pointer events
 */

type SwitchSize = "large" | "medium" | "small";

const TRACK_SIZE: Record<SwitchSize, { w: number; h: number; thumb: number }> = {
  large:  { w: 48, h: 24, thumb: 20 },
  medium: { w: 36, h: 20, thumb: 16 },
  small:  { w: 28, h: 16, thumb: 12 },
};

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: SwitchSize;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, disabled, size = "medium", checked, defaultChecked, onChange, ...props }, ref) => {
    const fieldId = id ?? `switch-${Math.random().toString(36).slice(2, 7)}`;
    const { w, h, thumb } = TRACK_SIZE[size];

    // Controlled or uncontrolled internal state for thumb position
    const [isOn, setIsOn] = React.useState<boolean>(
      checked !== undefined ? checked : (defaultChecked ?? false)
    );

    // Sync when controlled
    React.useEffect(() => {
      if (checked !== undefined) setIsOn(checked);
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setIsOn(e.target.checked);
      onChange?.(e);
    };

    // Thumb travel distance = track width - thumb size - 2 * padding (2px each side)
    const thumbTravel = w - thumb - 4;
    const gap = 2; // px gap between thumb edge and track edge

    const textSize =
      size === "large" ? "text-body-md" : size === "medium" ? "text-body-sm" : "text-body-xs";

    return (
      <label
        htmlFor={fieldId}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        {/* Hidden checkbox drives state */}
        <input
          ref={ref}
          id={fieldId}
          type="checkbox"
          role="switch"
          aria-checked={isOn}
          checked={isOn}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only peer"
          {...props}
        />

        {/* Visual track + thumb */}
        <span
          aria-hidden="true"
          style={{ width: w, height: h, borderRadius: h }}
          className={cn(
            "relative flex-shrink-0 transition-colors duration-200",
            isOn
              ? disabled
                ? "bg-[var(--color-btn-disabled-text)]"
                : "bg-[var(--color-primary-purple)]"
              : "bg-[var(--color-btn-disabled-bg)]"
          )}
        >
          {/* Thumb */}
          <span
            style={{
              width:  thumb,
              height: thumb,
              top:    gap,
              left:   gap,
              transform: isOn ? `translateX(${thumbTravel}px)` : "translateX(0)",
              transition: "transform 200ms ease",
              borderRadius: "50%",
            }}
            className={cn(
              "absolute block",
              disabled
                ? "bg-[var(--color-btn-disabled-text)]"
                : "bg-white shadow-sm"
            )}
          />
        </span>

        {/* Focus ring via peer */}
        <style>{`
          #${CSS.escape(fieldId)}:focus-visible + span {
            outline: 2px solid var(--color-focus-ring);
            outline-offset: 2px;
          }
        `}</style>

        {label && (
          <span
            className={cn(
              "font-inter text-[var(--color-neutral-dark)]",
              disabled && "text-[var(--color-btn-disabled-text)]",
              textSize
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
