import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * PollyMorph Tabs
 *
 * Maps to PollyMorph.json `rules.components.tabs`.
 *
 * Indicator: bottom border on active tab (primary.purple.base, 2px)
 * States: default | hover | active | disabled
 * Badge: optional count badge on a tab
 *
 * Overflow: tabs scroll horizontally when they exceed container width.
 */

export interface TabItem {
  id: string;
  label: string;
  badge?: number;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onTabChange?: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  activeId: controlledActiveId,
  onTabChange,
  className,
}) => {
  const [internalActiveId, setInternalActiveId] = React.useState(
    defaultActiveId ?? items[0]?.id
  );

  const activeId = controlledActiveId ?? internalActiveId;

  const handleTabClick = (id: string) => {
    setInternalActiveId(id);
    onTabChange?.(id);
  };

  const activeContent = items.find((t) => t.id === activeId)?.content;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab bar */}
      <div
        className="flex items-end border-b border-[var(--color-neutral-light)] overflow-x-auto"
        role="tablist"
      >
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-4 py-2.5",
                "text-sm font-inter whitespace-nowrap flex-shrink-0",
                "border-b-2 -mb-px transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
                isActive
                  ? "border-[var(--color-primary-purple)] text-[var(--color-primary-purple)] font-semibold"
                  : "border-transparent text-[var(--color-neutral-grey)] font-medium hover:text-[var(--color-neutral-dark)]",
                tab.disabled && "opacity-40 cursor-not-allowed hover:text-[var(--color-neutral-grey)]"
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center",
                    "min-w-[18px] h-[18px] px-1 rounded-full",
                    "text-[10px] font-semibold leading-none",
                    isActive
                      ? "bg-[var(--color-primary-purple)] text-white"
                      : "bg-[var(--color-neutral-light)] text-[var(--color-neutral-grey)]"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeContent && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeId}`}
          className="pt-4"
        >
          {activeContent}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";

export { Tabs };
