// Shared ternary status model — mirrors the real Domo pantry-item status,
// reused by the static "como funciona" visuals and the interactive demo so
// both stay in sync with a single source of truth.

export type Status = "tem" | "falta" | "carrinho";

// Status display labels come from next-intl's "Status" namespace (keys match
// these ids exactly: tem/falta/carrinho) via useTranslations/getTranslations
// — not a plain constant here, since the label needs to be locale-aware.

// Container-fill / on-container-text pairs, already contrast-checked in the
// app spec (9–11:1) — see docs/DESIGN.md §2.
export const STATUS_TONE_CLASSES: Record<Status, string> = {
  tem: "bg-status-tem-container text-status-tem-container-foreground",
  falta: "bg-status-falta-container text-status-falta-container-foreground",
  carrinho: "bg-status-carrinho-container text-status-carrinho-container-foreground",
};

// Real app has two independent toggles, not one shared cycle: the pantry
// screen only flips tem<->falta, the shopping list only flips falta<->carrinho,
// and carrinho->tem happens in a batch ("atualizar despensa"), not a tap.
export const PANTRY_TOGGLE: Record<"tem" | "falta", Status> = {
  tem: "falta",
  falta: "tem",
};

export const CART_TOGGLE: Record<"falta" | "carrinho", Status> = {
  falta: "carrinho",
  carrinho: "falta",
};
