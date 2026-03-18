import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * PollyMorph Modal
 *
 * Maps to PollyMorph.json `rules.components.modal`.
 *
 * Sizes:
 *   popup — max-width 480px  (confirmations, simple forms)
 *   modal  — max-width 720px  (complex content)
 *
 * Anatomy: Backdrop → Container → Header | Body | Footer
 * Footer pattern: ghost/tertiary action (left) + filled primary action (right)
 *
 * Scroll: body scrolls, header and footer stay fixed.
 * Close: ESC key or clicking the backdrop.
 */

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: "popup" | "modal";
  title?: string;
  description?: string;
  /** Footer actions slot — use Button components */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = "popup",
  title,
  description,
  footer,
  children,
  className,
}) => {
  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Container */}
      <div
        className={cn(
          "relative z-10 flex flex-col w-full bg-white",
          "rounded-[var(--radius-xl)] shadow-[var(--elevation-xl)]",
          "max-h-[90vh]",
          size === "popup" ? "max-w-[480px]" : "max-w-[720px]",
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-[var(--color-neutral-light)] flex-shrink-0">
            <div className="flex flex-col gap-1">
              {title && (
                <h2
                  id="modal-title"
                  className="text-base font-semibold font-inter text-[var(--color-neutral-dark)] leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm font-inter text-[var(--color-neutral-grey)] leading-snug">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded-[var(--radius-sm)] text-[var(--color-neutral-grey)] hover:text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] transition-colors"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-between gap-2 px-6 pb-6 pt-4 border-t border-[var(--color-neutral-light)] flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

/** Convenience footer layout: left ghost action + right filled action */
export const ModalFooter: React.FC<{
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmVariant?: "filled" | "destructive";
  loading?: boolean;
}> = ({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  confirmVariant = "filled",
  loading,
}) => (
  <>
    <Button variant="ghost" size="medium" onClick={onCancel}>
      {cancelLabel}
    </Button>
    <Button variant={confirmVariant} size="medium" onClick={onConfirm} loading={loading}>
      {confirmLabel}
    </Button>
  </>
);

export { Modal };
