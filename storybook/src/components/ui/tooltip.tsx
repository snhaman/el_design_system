import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Tooltip
 *
 * Maps to PollyMorph.json `rules.components.tooltip`.
 *
 * Themes:    dark (default) | light
 * Placement: top | bottom | left | right
 * Delay:     300ms show, 100ms hide (CSS transition used here)
 * Arrow:     rendered via a rotated square
 *
 * Usage: wrap trigger child — tooltip appears on hover/focus.
 * Restriction: read-only info only (no interactive elements inside).
 */

export interface TooltipProps {
  content: React.ReactNode;
  theme?: "dark" | "light";
  placement?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const PLACEMENT_CONTAINER: Record<string, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full  left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full  top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_PLACEMENT: Record<string, string> = {
  top:    "top-full  left-1/2 -translate-x-1/2 -mt-1",
  bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1 rotate-180",
  left:   "left-full  top-1/2 -translate-y-1/2 -ml-1 -rotate-90",
  right:  "right-full top-1/2 -translate-y-1/2 -mr-1 rotate-90",
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  theme = "dark",
  placement = "top",
  children,
  className,
}) => {
  const [visible, setVisible] = React.useState(false);
  const showTimer = React.useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = React.useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), 300);
  };
  const hide = () => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 100);
  };

  React.useEffect(() => () => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  const isDark = theme === "dark";

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {children}

      {/* Tooltip bubble */}
      <span
        role="tooltip"
        className={cn(
          "absolute z-50 pointer-events-none w-max max-w-[240px]",
          "px-2.5 py-1.5 rounded-[var(--radius-md)]",
          "text-xs font-inter leading-snug",
          "transition-opacity duration-150",
          isDark
            ? "bg-[var(--color-sidebar-bg)] text-white"
            : "bg-white text-[var(--color-neutral-dark)] shadow-[var(--elevation-md)] border border-[var(--color-neutral-light)]",
          PLACEMENT_CONTAINER[placement],
          visible ? "opacity-100" : "opacity-0",
          className
        )}
      >
        {content}
        {/* Arrow */}
        <span
          className={cn(
            "absolute w-2 h-2 rotate-45",
            isDark ? "bg-[var(--color-sidebar-bg)]" : "bg-white border-[var(--color-neutral-light)]",
            ARROW_PLACEMENT[placement]
          )}
          aria-hidden="true"
        />
      </span>
    </span>
  );
};

Tooltip.displayName = "Tooltip";

export { Tooltip };
