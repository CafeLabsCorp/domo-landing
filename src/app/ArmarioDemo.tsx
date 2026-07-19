"use client";

import { useState } from "react";
import { PANTRY_TOGGLE, CART_TOGGLE, STATUS_LABEL, STATUS_TONE_CLASSES, type Status } from "./statuses";

type PantryItem = {
  id: string;
  name: string;
  status: Status;
};

// Seeded non-empty and already mixed, so the payoff (a live shopping list)
// is visible before any interaction — unlike a zero-state demo.
const SEED: PantryItem[] = [
  { id: "leite", name: "Leite", status: "tem" },
  { id: "cafe", name: "Café", status: "falta" },
  { id: "detergente", name: "Detergente", status: "carrinho" },
  { id: "papel-toalha", name: "Papel toalha", status: "falta" },
  { id: "arroz", name: "Arroz", status: "tem" },
];

const CARD_CLASSES =
  "rounded-[10px] border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.06)]";

export default function ArmarioDemo() {
  const [items, setItems] = useState<PantryItem[]>(SEED);
  const [liveMessage, setLiveMessage] = useState("");

  // Pantry tap only flips tem<->falta — mirrors dispensa_page.dart, which
  // never lets you set noCarrinho from that screen.
  function togglePantryStatus(id: string) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id || item.status === "carrinho") return item;
        const nextStatus = PANTRY_TOGGLE[item.status];
        setLiveMessage(`${item.name} marcado como ${STATUS_LABEL[nextStatus]}.`);
        return { ...item, status: nextStatus };
      }),
    );
  }

  // Shopping-list tap only flips falta<->carrinho — mirrors mercado_page.dart.
  function toggleCartStatus(id: string) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id || item.status === "tem") return item;
        const nextStatus = CART_TOGGLE[item.status];
        setLiveMessage(`${item.name} marcado como ${STATUS_LABEL[nextStatus]}.`);
        return { ...item, status: nextStatus };
      }),
    );
  }

  // Mirrors the real app's "Atualizar dispensa" button: closes the trip by
  // batch-moving every carrinho item back to tem in one action, not a tap.
  function atualizarDespensa() {
    setItems((current) =>
      current.map((item) =>
        item.status === "carrinho" ? { ...item, status: "tem" } : item,
      ),
    );
    setLiveMessage("Dispensa atualizada.");
  }

  function reset() {
    setItems(SEED);
    setLiveMessage("Demo reiniciada.");
  }

  // Carrinho items disappear from the pantry, same as dispensa_page.dart's
  // `where((i) => i.status != ItemStatus.noCarrinho)` filter.
  const pantryItems = items.filter((item) => item.status !== "carrinho");
  const shoppingList = items.filter((item) => item.status !== "tem");
  const hasCartItems = items.some((item) => item.status === "carrinho");

  return (
    <div className="mt-10">
      {/* Announces status/list changes to screen-reader users — visually
          hidden, mirrors the sighted feedback of the list panel updating. */}
      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className={CARD_CLASSES}>
          <h3 className="font-serif text-[1.05rem] font-bold text-foreground">
            Despensa
          </h3>
          <ul className="mt-4 divide-y divide-border">
            {pantryItems.map((item) => {
              const nextStatus = PANTRY_TOGGLE[item.status as "tem" | "falta"];
              return (
                <li key={item.id}>
                  {/* The whole row is the button: it clears the 44px tap
                      target via row height/padding without growing the
                      visual chip past its 32px (h-8) spec size. */}
                  <button
                    type="button"
                    onClick={() => togglePantryStatus(item.id)}
                    aria-label={`${item.name}: ${STATUS_LABEL[item.status]}. Toque para alternar para ${STATUS_LABEL[nextStatus]}.`}
                    className="flex min-h-11 w-full items-center justify-between gap-3 rounded-[6px] py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-8 items-center rounded-[6px] px-3 text-[0.75rem] font-bold transition-colors duration-150 motion-reduce:transition-none ${STATUS_TONE_CLASSES[item.status]}`}
                    >
                      {STATUS_LABEL[item.status]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={CARD_CLASSES}>
          <h3 className="font-serif text-[1.05rem] font-bold text-foreground">
            Lista de compras
          </h3>
          {shoppingList.length === 0 ? (
            <p className="mt-4 text-sm text-subtle">
              Nada em falta — a lista está vazia.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {shoppingList.map((item) => {
                const nextStatus = CART_TOGGLE[item.status as "falta" | "carrinho"];
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggleCartStatus(item.id)}
                      aria-label={`${item.name}: ${STATUS_LABEL[item.status]}. Toque para alternar para ${STATUS_LABEL[nextStatus]}.`}
                      className="flex min-h-11 w-full items-center justify-between gap-3 rounded-[6px] py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span
                        className={`text-sm font-medium text-foreground ${item.status === "carrinho" ? "text-subtle line-through" : ""}`}
                      >
                        {item.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-8 items-center rounded-[6px] px-3 text-[0.75rem] font-bold transition-colors duration-150 motion-reduce:transition-none ${STATUS_TONE_CLASSES[item.status]}`}
                      >
                        {STATUS_LABEL[item.status]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {hasCartItems && (
            <button
              type="button"
              onClick={atualizarDespensa}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Atualizar despensa
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-subtle">
          Toque pra simular — prévia local, os valores não são salvos.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center justify-center rounded-full border border-outline px-5 text-sm font-medium text-foreground transition-colors hover:bg-primary-container hover:text-primary-container-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Reiniciar demo
        </button>
      </div>
    </div>
  );
}
