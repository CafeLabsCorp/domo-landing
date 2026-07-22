[Leia em Português](README.pt-br.md)

# domo-landing

Download landing page for [Domo](https://github.com/CafeLabsCorp/domo), Café
Labs' shared household management app (pantry shared by status, a derived
shopping list, house/member management). Static site (Next.js), hosted
separately from the real app, under the product's own visual identity —
**"Armário Aberto"** ("Open Cupboard", Azul Louça `#2C4A7C`, Bitter + Manrope
typography) — not the Café Labs institutional portfolio's identity nor any
other in-house product's (e.g. Dindin, which is green/Fraunces).

For anyone seeing this repo for the first time: it's a single-route-per-locale
(`/pt`, `/en`) marketing page with no backend of its own, whose most
interesting piece is a client-side interactive demo that faithfully
reproduces the real app's ternary status model (Have it / Missing / In cart).
See [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) for how that works
internally.

## Stack

| Layer           | Technology                                     |
| --------------- | ---------------------------------------------- |
| Framework       | Next.js 16 (App Router)                        |
| UI              | React 19                                       |
| Styling         | Tailwind CSS v4 (tokens via CSS custom properties + `@theme inline`) |
| Typography      | Bitter (headings) + Manrope (body), via `next/font/google` (self-hosted at build time, no runtime fetch) |
| i18n            | `next-intl`, locale-prefixed routing (`/pt`, `/en`), Portuguese as default |
| Language        | TypeScript                                      |
| Lint            | ESLint (`eslint-config-next`)                   |
| Hosting         | Vercel                                          |

Same stack pattern as the institutional site (`cafelabs-portifolio`) and
[`dindin-landing`](https://github.com/CafeLabsCorp/dindin-landing) — only the
visual identity and content differ per product.

## Running locally

Prerequisite: Node.js (a version compatible with Next.js 16 / React 19 —
`TODO: confirm` the exact minimum, not pinned in `package.json` or
`.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

No environment variables and no backend of its own — the project runs the
same on any machine with just `npm install`.

## Folder structure

```
src/
  app/
    [locale]/
      page.tsx        # the single page: header, hero, download section,
                       # "how it works" (3 shelves), interactive demo, footer
      layout.tsx       # fonts (Bitter/Manrope), metadata, NextIntlClientProvider
      globals.css       # design tokens (light/dark colors) + @theme inline
      ArmarioDemo.tsx   # client-side demo (pantry + shopping list)
      statuses.ts       # shared ternary status model (single source of truth)
      Tag.tsx           # the squared chip/tag component (visual signature)
    favicon.ico          # deliberately outside [locale] (favicon doesn't vary by language)
  i18n/
    routing.ts        # locales (pt, en), default locale (pt)
    navigation.ts      # locale-aware Link/useRouter/usePathname
    request.ts          # resolves the active locale's messages file
messages/
  pt.json, en.json    # the page's full copy, including the demo's item names
public/
  domo-logo.svg
docs/
  ARQUITETURA.md    # how the site and the demo work internally
  DESIGN.md         # "Armário Aberto" visual identity spec
  DEPLOY.md         # how the Vercel deploy works
```

## Internationalization

Locale-prefixed routing (`/pt`, `/en`) via `next-intl`, **Portuguese as the
default locale** — the product's real UI stays Portuguese-first (same
priority as the Domo app), English is opt-in via the URL. All page copy comes
from `messages/pt.json`/`messages/en.json`, including the interactive demo's
text (item names, status labels, `aria-live`/`aria-label` accessibility
messages).

## Visual identity

**"Armário Aberto"** identity's palette and typography, already applied
across the site — see [`docs/DESIGN.md`](docs/DESIGN.md) for the full spec
(light/dark color tokens, typography, the reasoning behind each choice, and
the deliberate divergence from the Dindin landing).

## Deploy

Vercel, domain `domo.cafelabs.net`. See [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Status

- [x] Hero, "Get Domo" section, "How it works" (3 alternating shelves), and
      the "Rearrange the shelf" interactive demo implemented under the
      "Armário Aberto" identity (2026-07-18).
- [x] "Web" button active, linking to the app (`app.domo.cafelabs.net`).
- [x] Live at [domo.cafelabs.net](https://domo.cafelabs.net).
- [x] PT/EN internationalization with `next-intl` (2026-07-22).
- [ ] Windows download — "coming soon" placeholder. The Domo app doesn't have
      a Windows target configured in Flutter yet (only Android + Web today);
      the landing already reserves the space anticipating support.
- [ ] Android download — "coming soon" placeholder, pending a decision on
      where to host the release `.apk`.
