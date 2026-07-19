// Shared ternary status model — mirrors the real Domo pantry-item status,
// reused by the static "como funciona" visuals and the interactive demo so
// both stay in sync with a single source of truth.

export type Status = "tem" | "falta" | "carrinho";

export const STATUS_LABEL: Record<Status, string> = {
  tem: "Tem",
  falta: "Em falta",
  carrinho: "No carrinho",
};

// Container-fill / on-container-text pairs, already contrast-checked in the
// app spec (9–11:1) — see docs/DESIGN.md §2.
export const STATUS_TONE_CLASSES: Record<Status, string> = {
  tem: "bg-status-tem-container text-status-tem-container-foreground",
  falta: "bg-status-falta-container text-status-falta-container-foreground",
  carrinho: "bg-status-carrinho-container text-status-carrinho-container-foreground",
};

// Tem -> Em falta -> No carrinho -> Tem
export const STATUS_CYCLE: Record<Status, Status> = {
  tem: "falta",
  falta: "carrinho",
  carrinho: "tem",
};
