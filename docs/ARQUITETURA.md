**[Leia em Português](ARQUITETURA.pt-br.md)**

# Architecture — domo-landing

Static single-page landing, with no backend of its own. This document
explains how the site is put together and, in more detail, how the
interactive demo's state model works — the one part of the project with
real logic.

## Overview

- **Next.js (App Router), a single route per locale (`/pt`, `/en`)** —
  `src/app/[locale]/page.tsx` assembles the entire page (header, hero,
  download, "how it works", demo, footer) in a single async Server
  Component (it awaits `getTranslations` for each message namespace before
  rendering); nothing is fetched at runtime beyond that (no external
  `fetch`/API routes) and there's no client-side routing beyond anchors
  (`#`) and the locale switch itself.
- **A single client component (`ArmarioDemo.tsx`)** — the only piece of the
  page with `"use client"` and `useState`; `LanguageSwitcher.tsx` is also a
  client component (it needs `useRouter`/`usePathname` to swap locale), but
  it carries no state of its own. Everything else is static HTML generated
  at build/server time.
- **No backend, no database, no authentication** — the demo is a local
  simulation; nothing typed or clicked in it is persisted or sent anywhere
  (the "local preview, values aren't saved" copy in the UI itself is
  literal).
- **Standard Next.js static/SSR deploy on Vercel** — see
  [`DEPLOY.md`](DEPLOY.md).

## Internationalization (`next-intl`)

Locale-prefixed routing (`/pt`, `/en`, Portuguese default) is implemented
with `next-intl`, wired through four files:

- **`src/proxy.ts`** — the request-time entry point that resolves and
  redirects to the right locale prefix, built on `next-intl/middleware`. In
  Next.js 16, the file that used to be `middleware.ts` in earlier versions
  is now named `proxy.ts` (functionality is the same, only the file
  convention was renamed — see
  `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` if
  this looks unfamiliar). Its `matcher` excludes `/api`, `/_next`,
  `/_vercel`, and any path with a file extension, so static assets aren't
  routed through the locale logic.
- **`src/i18n/routing.ts`** — declares the two supported locales
  (`pt`, `en`) and the default (`pt`) via `defineRouting`; this is the
  single source of truth both `proxy.ts` and `navigation.ts` read from.
- **`src/i18n/navigation.ts`** — re-exports locale-aware `Link`,
  `useRouter`, `usePathname` wrappers (from `next-intl/navigation`) so
  every internal navigation automatically preserves/switches the locale
  prefix instead of components reasoning about it manually.
- **`src/i18n/request.ts`** — resolves which locale is active per request
  and loads the matching `messages/<locale>.json` file for
  `NextIntlClientProvider`/`getTranslations`.

`src/app/[locale]/LanguageSwitcher.tsx` is the only piece of UI aware of
this mechanism: a client component that reads the current locale via
`useLocale()`, computes the other one, and calls
`router.replace(pathname, { locale: nextLocale })` from the wrapped
`navigation.ts` router — swapping locale without a full page reload and
without losing the current path.

All page copy — including the interactive demo's item names, status
labels, and `aria-live`/`aria-label` accessibility strings — comes from
`messages/pt.json`/`messages/en.json`, not hardcoded in components.

## Design tokens: CSS custom properties + Tailwind v4

`src/app/[locale]/globals.css` declares every color as a CSS custom property under
`:root` (light theme) and overrides them inside
`@media (prefers-color-scheme: dark)` (dark theme) — there's no manual
theme-toggle mechanism; the site follows the OS/browser preference.

Tailwind v4's `@theme inline` block maps each variable to a utility class
(`--color-primary: var(--primary)` → `bg-primary`, `text-primary`, etc.), so
any component uses ordinary Tailwind classes and gets light/dark theming
automatically, with no conditional logic in JSX. The same mechanism maps
the fonts (`--font-serif: var(--font-bitter)`, `--font-sans: var(--font-manrope)`).

See [`DESIGN.md`](DESIGN.md) for the full token list and the reasoning
behind each color value.

## Typography

`layout.tsx` loads Bitter and Manrope via `next/font/google`, which
self-hosts the fonts at build time (no runtime network request) and exposes
each one as a CSS variable (`--font-bitter`, `--font-manrope`) applied on
the `<html>` tag. `globals.css` maps those variables to the `--font-serif`/
`--font-sans` tokens consumed by the Tailwind classes (`font-serif`,
`font-sans`).

## The `Tag` component

`src/app/[locale]/Tag.tsx` is the page's only chip/label component — used both for
the section kickers ("01", "How it works") and for the status chips
(Have it/Missing/In cart) in the hero, in the "how it works" shelves, and in
the demo. A fixed `border-radius: 6px` (never a pill) is the central visual
signature of the **"Armário Aberto"** ("Open Cupboard") identity — see
`DESIGN.md` §4. Centralizing the chip in a single component is what
guarantees that consistency without repeating the class everywhere a status
is used.

## Demo state model (`ArmarioDemo.tsx` + `statuses.ts`)

This is the part of the project with real logic, so it's worth detailing
how and why it's modeled this way.

### Single source of truth: `statuses.ts`

`src/app/[locale]/statuses.ts` doesn't belong only to the demo — it's also imported
by `page.tsx` (in the hero's and "how it works" shelves' static visuals)
and by `Tag.tsx`, guaranteeing that each status's label and color
("Tem" / "Em falta" / "No carrinho" — "Have it" / "Missing" / "In cart") are
always the same everywhere on the page, static or interactive.

It defines:

- `type Status = "tem" | "falta" | "carrinho"` — the real app's ternary
  pantry-item model.
- `STATUS_LABEL` / `STATUS_TONE_CLASSES` — the Portuguese-language label and
  the Tailwind classes (fill/text pair, already checked for contrast in
  `DESIGN.md` §2) for each status.
- **Two independent transition maps, not a single cycle** —
  `PANTRY_TOGGLE` (`tem <-> falta`) and `CART_TOGGLE` (`falta <-> carrinho`).

That last point is why commit `80e1f0d` exists ("Corrige demo interativa:
item no carrinho não sumia da despensa" — "Fix interactive demo: item in
cart wasn't disappearing from the pantry"): the previous version used a
single shared cycle (`tem -> falta -> carrinho -> tem`) across both
screens, which made an item marked "in cart" keep showing up (duplicated)
in the pantry panel. The real Flutter app **doesn't have a single toggle**
— each screen only knows the transition that makes sense there:

- The pantry screen (`dispensa_page.dart` in the real app) only toggles
  `tem <-> falta`. An item never moves to "in cart" from there.
- The shopping-list screen (`mercado_page.dart` in the real app) only
  toggles `falta <-> carrinho`.
- Going back from `carrinho` to `tem` isn't an item-by-item tap — it's a
  batch action ("Atualizar dispensa" / "Update pantry") that closes out the
  shopping trip by moving every `carrinho` item to `tem` at once.

`ArmarioDemo.tsx` mirrors that split exactly:

| Function | Allowed transition | Mirrors (real app) |
| --- | --- | --- |
| `togglePantryStatus` | `tem <-> falta` (ignores the tap if already `carrinho`) | `dispensa_page.dart` |
| `toggleCartStatus` | `falta <-> carrinho` (ignores the tap if already `tem`) | `mercado_page.dart` |
| `atualizarDespensa` | every `carrinho` item → `tem`, in batch | the "Atualizar dispensa" action |

### Deriving the two visible lists

The demo's two panels (Pantry / Shopping list) aren't two separate pieces of
state — they're two *views* derived from the same `items` array on every
render, just like the real app:

```ts
const pantryItems = items.filter((item) => item.status !== "carrinho");
const shoppingList = items.filter((item) => item.status !== "tem");
```

- **Pantry** shows everything that isn't `carrinho` (an item in the cart
  has already physically left the pantry).
- **Shopping list** shows everything that isn't `tem` (it's the "view" of
  everything still missing, including whatever is already in the cart
  waiting for the trip to be finalized).

There's no separate "add to list" action — the list exists as a
consequence of status, the same way it does in the real app (see
`DESIGN.md` §6, "Why this interaction model").

### Seeded state, not empty

The initial array (`SEED`, 5 items) already comes mixed (2 `tem`, 2
`falta`, 1 `carrinho`) so the payoff (an already-populated shopping list)
is visible before any interaction — recognition instead of requiring the
visitor to figure out they need to "add" something first.

### State accessibility

- Each row is a `<button>` with an `aria-label` describing the current
  status and the action (`"Leite: Tem. Toque para alternar para Em
  falta."` — "Milk: Have it. Tap to switch to Missing."), never an
  unstyled colored `<span>`.
- An `aria-live="polite"` region (visually hidden via `sr-only`) announces
  every status change and the batch update, for parity between
  screen-reader users and sighted users (who see the panel change).
- Color transitions respect `motion-reduce:transition-none`.
- Minimum 44px tap target (`min-h-11`) on the whole row, even though the
  visual chip itself stays at 32px (`h-8`) — see `DESIGN.md` §6 for the
  reasoning.

## No `docs/BACKEND.md`

This project has no backend, database, or API of its own — all existing
"state" is local to the browser (the demo's `useState`) and disappears on
reload. That's why there's no `docs/BACKEND.md`; the real app's equivalent
section lives in the Domo app's repo (`domo/docs/BACKEND.md`).
