"use client";

import { useState } from "react";
import { STATUS_CYCLE, STATUS_LABEL, STATUS_TONE_CLASSES, type Status } from "./statuses";

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

  function cycleStatus(id: string) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextStatus = STATUS_CYCLE[item.status];
        setLiveMessage(`${item.name} marcado como ${STATUS_LABEL[nextStatus]}.`);
        return { ...item, status: nextStatus };
      }),
    );
  }

  function reset() {
    setItems(SEED);
    setLiveMessage("Demo reiniciada.");
  }

  const shoppingList = items.filter((item) => item.status !== "tem");

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
            {items.map((item) => {
              const nextStatus = STATUS_CYCLE[item.status];
              return (
                <li key={item.id}>
                  {/* The whole row is the button: it clears the 44px tap
                      target via row height/padding without growing the
                      visual chip past its 32px (h-8) spec size. */}
                  <button
                    type="button"
                    onClick={() => cycleStatus(item.id)}
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
              {shoppingList.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-1.5"
                >
                  <span className="text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                  <span
                    className={`inline-flex h-8 items-center rounded-[6px] px-3 text-[0.75rem] font-bold ${STATUS_TONE_CLASSES[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </li>
              ))}
            </ul>
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
