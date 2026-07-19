import type { ReactNode } from "react";
import { STATUS_TONE_CLASSES, type Status } from "./statuses";

type TagVariant = "kicker" | "chip";
type TagTone = "primary" | "neutral" | Status;

const TONE_CLASSES: Record<TagTone, string> = {
  primary: "bg-primary-container text-primary-container-foreground",
  neutral: "bg-surface text-subtle border border-border",
  ...STATUS_TONE_CLASSES,
};

/**
 * The squared 6px label/tag — the page's single most repeated shape
 * signature (never a pill). `variant="kicker"` is the small-caps section
 * label; `variant="chip"` is the ternary status label used everywhere else.
 */
export function Tag({
  variant = "chip",
  tone = "primary",
  className = "",
  children,
}: {
  variant?: TagVariant;
  tone?: TagTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-[6px] font-bold",
        variant === "kicker"
          ? "px-3 py-1 text-[0.72rem] uppercase tracking-[0.09em]"
          : "h-8 px-3 text-[0.75rem]",
        TONE_CLASSES[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
