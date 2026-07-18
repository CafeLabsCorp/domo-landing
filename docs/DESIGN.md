# Domo landing — redesign spec ("Armário Aberto")

Status: approved direction, ready for implementation by `frontend-web`.
Scope owner: UX/UI design. Implementation owner: frontend-web — everything
under `src/app/` is theirs to touch. I did not edit any file under `src/`.

This replaces the current landing (`src/app/page.tsx` + `globals.css`), which
was built by copying the old "Sage Home" green palette and Inter 1:1 onto a
generic hero → feature-grid → download-cards → footer skeleton. It reads as
"a landing template with the old logo swapped in," not as Domo. This spec
reworks composition, rhythm, and message under the **"Armário Aberto"**
identity already approved for the app (`/home/felip/projetos/domo/docs/DESIGN.md`,
hereafter "the app spec") — same color/type tokens, translated to a page that
has its own reason to be shaped the way it is, not a re-skin of the old
structure and not a copy of Dindin's landing structure either (see §1).

I read, and reused verified values from, the app spec rather than
re-deriving contrast ratios: every hex below is quoted from there, not
recomputed, except where noted.

---

## 0. Concept: the page *is* a shelf, not a hero-then-grid stack

**Metaphor recap (from the app spec):** Domo is the one cupboard/pantry the
whole household can see into and restock together — glazed ceramic, a
chalk/paper tag tied to a jar's neck, a wicker basket by the door. Cobalt
blue (`#2C4A7C`), mustard accent, a slab-serif "stamped label" heading font,
and **squared label-tag chips** (not pills) as the single most repeated,
highest-payoff shape signature.

**How that becomes a landing composition, not just a color swap:** the page
is structured as a sequence of *shelves*, each introduced by a small squared
tag (a numbered or named label, exactly the "tag clipped to a jar" shape from
the app), with **alternating left/right layout** between shelves rather than
every section being a centered stack of equal-weight cards. A thin hairline
(`border` token) runs between shelves like the physical edge of a shelf board
— the one continuous visual thread tying the page together, instead of plain
vertical whitespace between unrelated blocks.

Concretely, three deliberate departures from "generic SaaS landing" and from
Dindin's landing pattern, in order of how much they cost to build:

1. **Asymmetric hero, not a centered stack with floating decoration.** Text
   column + a *literal, legible* preview of the real UI language (three
   pantry rows with real squared status chips: Tem/Em falta/No carrinho) —
   not an abstract shape scattered behind centered text. The decoration *is*
   the product, not wallpaper behind it.
2. **Alternating "how it works" shelves instead of a symmetric N-up feature
   grid.** Three rows, each pairing a squared numbered tag + short copy with
   a small concrete visual (a status-chip cycle, a forming shopping list, an
   invite-code tag), flipping sides each row. This follows the product's own
   real sequence (mark status → list forms itself → invite the house) rather
   than an interchangeable 2×2/3×3 grid of features that could belong to any
   app.
3. **A direct-manipulation demo rooted in the ternary status model**, not a
   transactional form. See §6 — this is the piece most likely to be compared
   to Dindin's `CaixinhasDemo`, so its divergence is spelled out in detail.

**What this explicitly does not do:** no new illustration style requiring a
designer/illustrator hand-off (all visuals are made of the same components —
chips, tags, rows, cards — used elsewhere on the page, so `frontend-web`
builds them the same way as everything else); no scroll-triggered animation
library; no client-side routing beyond the existing single-page app. This
stays inside "solo-maintainer, safe/proven" territory (default ambition,
unspecified otherwise by the orchestrator) — bold in *composition*, boring in
*implementation technique*.

---

## 1. Divergence from Dindin's landing — explicit, checked point by point

The Dindin landing (`/home/felip/projetos/dindin-landing/src/app/page.tsx` +
`CaixinhasDemo.tsx`) was read **only as an anti-reference**. Point-by-point:

| Dimension | Dindin landing | Domo landing (this spec) |
|---|---|---|
| Hero layout | Full-viewport-height, fully centered text stack, abstract decorative shapes ("envelope tabs," 6 rotated rounded rectangles) scattered behind, aria-hidden, purely cosmetic | Two-column asymmetric split (not full-height-centered); the right column is a **concrete, meaningful** preview of the real dispensa UI, not abstract decoration |
| Section rhythm | Hero → download cards → interactive demo → symmetric 3-up feature grid → footer | Hero → 3 alternating narrative "shelf" rows (own layout, not a grid) → interactive demo → download cards → footer. Different order *and* different internal shape for the explainer section |
| Feature explainer | Symmetric grid of equal-weight cards, no inherent order | Alternating left/right rows, numbered 01/02/03, ordered to match the actual product flow |
| Repeated shape signature | Full pill/stadium on everything, including badges ("Disponível agora") | Squared 6px tag/chip (see §3) on every repeated label — the single biggest tactile differentiator, same reasoning as the app spec |
| Demo interaction model | Mode-switcher (3 tab buttons: Adicionar/Alocar/Transferir) → numeric-input forms → submit → animated currency deltas/pulses | No forms, no mode switcher: direct-manipulation tap-to-cycle on real status chips, live-updating derived list (§6) |
| Background undertone | Warm ivory (`#faf4ea` light / `#16130f` dark) | Cool "ceramic stone" gray-blue (`#EEF1F1` light / `#12171C` dark) — opposite undertone, per app spec §1 |
| Headline font | Fraunces (soft old-style/calligraphic serif) | Bitter (slab serif, "stamped label") — a different *class* of serif, not a different cut, per app spec §2 |
| Body font | Work Sans | Manrope — more geometric/crisp, per app spec §2 |

The only things intentionally **kept** the same as Dindin's landing (because
they're Café Labs house convention, not "Dindin's design," and diverging
would cost recognition for no payoff): the "por Café Labs" header link, the
honest "prévia local, não é salva" demo disclaimer copy pattern, and the
footer's brand-line + GitHub + email structure. These are utility/brand-house
conventions, not part of what made the two apps *feel* the same.

---

## 2. Color tokens → Tailwind v4 CSS vars

Domo-landing already declares tokens the same way Dindin-landing does
(`:root { --background: ... }` + `@theme inline { --color-background: var(...) }`
+ a `@media (prefers-color-scheme: dark)` override block) — reuse that exact
mechanism, just replace the values and add the new roles below. All hex
values are quoted from the app spec §1.1/§1.2 (light/dark) — do not
re-derive; the ratios cited are already computed there against `surface`/
`background`.

### `globals.css` — light (`:root`)

```css
--background: #EEF1F1;       /* "ceramic stone" canvas, app spec §1.1 */
--surface: #FFFFFF;
--foreground: #1B2024;       /* inkPrimary, on background: 14.46:1 */
--muted: #4F5A61;            /* inkSecondary, on background: 6.23:1, on surface: 7.08:1 */
--subtle: #5A6469;           /* inkSubtle, on background: 5.34:1, on surface: 6.07:1 */
--border: rgba(27, 32, 36, 0.12);   /* inkPrimary @ 12% — decorative hairline only */
--outline: #5C6B78;          /* real component outlines, on background: 4.83:1 */

--primary: #2C4A7C;          /* Azul Louça */
--primary-foreground: #FFFFFF;      /* onPrimary: 8.83:1 */
--primary-container: #D7E1F0;
--primary-container-foreground: #16233D;  /* onPrimaryContainer: 11.86:1 */

--secondary: #63584A;        /* Grafite Quente */

--tertiary: #8A5F12;         /* Mostarda — sparing use, standout/collective moments only */
--tertiary-foreground: #FFFFFF;     /* onTertiary: 5.64:1 */
--tertiary-container: #F4E7C8;
--tertiary-container-foreground: #3E2E10;  /* onTertiaryContainer: 10.67:1 */

--status-tem: #286B5C;
--status-tem-container: #D9EDE7;
--status-tem-container-foreground: #124338;   /* 9.13:1 */

--status-falta: #B83A2A;
--status-falta-container: #F9DCD6;
--status-falta-container-foreground: #5A2318; /* 9.62:1 */

--status-carrinho: #8A5F12;   /* = tertiary, deliberately (app spec §1.1) */
--status-carrinho-container: #F4E7C8;
--status-carrinho-container-foreground: #3E2E10; /* 10.67:1 */

/* Member colors — only #1/#2/#3 are needed on the landing (hero avatar
   stack, §5.2); the full 6-hue set lives in the app spec §1.3 if a future
   section needs more. */
--member-1: #2C4A7C;  /* Azul Louça, white text: 8.83:1 */
--member-2: #8A5F12;  /* Mostarda, white text: 5.64:1 */
--member-3: #286B5C;  /* Verde Jade, white text: 6.27:1 */
```

### `globals.css` — dark (inside the existing `@media (prefers-color-scheme: dark)` block)

```css
--background: #12171C;
--surface: #1B2128;
--foreground: #EDEFF1;       /* on background: 15.64:1 */
--muted: #B9C1C7;             /* on background: 9.88:1 */
--subtle: #8F9AA1;             /* on background: 6.27:1, on surface: 5.64:1 */
--border: rgba(237, 239, 241, 0.12);
--outline: #8D9AA6;

--primary: #9BB8DE;
--primary-foreground: #16233D;      /* onPrimary: 7.68:1 */
--primary-container: #223A61;
--primary-container-foreground: #C9D9F0;  /* 7.95:1 */

--secondary: #C9BBA8;

--tertiary: #E0B84A;
--tertiary-foreground: #3E2E10;     /* 6.94:1 */
--tertiary-container: #4A3A14;
--tertiary-container-foreground: #F4E0A8;  /* 8.43:1 */

--status-tem: #6FC2AC;
--status-tem-container: #163F35;
--status-tem-container-foreground: #BEE8DD;   /* 8.78:1 */

--status-falta: #E8897A;
--status-falta-container: #4A1B14;
--status-falta-container-foreground: #F7CFC5; /* 10.07:1 */

--status-carrinho: #E0B84A;
--status-carrinho-container: #4A3A14;
--status-carrinho-container-foreground: #F4E0A8; /* 8.43:1 */

--member-1: #9BB8DE;  /* on dark ink text per app spec §1.3 if used as a label bg */
--member-2: #E0B84A;
--member-3: #6FC2AC;
```

Map every one of these into the `@theme inline` block the same way the
existing two tokens are (`--color-status-tem: var(--status-tem);` etc.) so
Tailwind utility classes (`bg-status-tem-container`, `text-primary`, …)
resolve directly — same pattern already in the file, just more entries.

**No new color pairs were invented for the landing** — every combination
above is a pair already contrast-checked in the app spec. The one placement
that's new to the landing (chips/tags directly on `--background`, not just on
`--surface`/white as in the app's mobile screens) is still safe: the
container-fill/on-container-text pairs are checked against white already
(9–11:1), and `--background` (`#EEF1F1`) is lighter than white by less than a
point of luminance in the wrong direction to flip that — no realistic path to
failing 4.5:1 there. If `frontend-web` wants this double-checked with a
script before shipping, treat it as a cheap confirmation pass, not a
re-design.

---

## 3. Typography

**Bitter** (headings) + **Manrope** (body/UI) — same pairing and rationale as
the app spec §2 (slab-serif "stamped label" vs. Dindin's calligraphic
Fraunces; geometric-humanist body vs. Dindin's rounder Work Sans).

**Delivery:** use `next/font/google` exactly like the current
`layout.tsx` does for Inter (`Bitter({ variable: "--font-bitter", subsets: ["latin"] })`,
`Manrope({ variable: "--font-manrope", subsets: ["latin"] })`) — this
self-hosts at build time (no runtime fetch, no first-load network request),
so there's no offline/latency trade-off to weigh here the way there was for
the Flutter app's dynamic `google_fonts` package call. Add both variables to
the `<html className>` string alongside the existing one, and map
`--font-serif: var(--font-bitter)`, `--font-sans: var(--font-manrope)` in
`@theme inline` (drop the old `--font-sans: var(--font-inter)` mapping,
remove the `Inter` import).

### Landing-specific type scale (independent from the app's mobile `TextTheme` —
this is a marketing page, allowed to run larger than the app's own scale):

| Use | Font | Weight | Size (responsive) |
|---|---|---|---|
| H1 (hero) | Bitter | 700 | `clamp(2.1rem, 4vw, 3.1rem)` / 1.12 line-height |
| H2 (section) | Bitter | 700 | `2rem` / 1.2 |
| H3 (shelf-row heading, demo card heading) | Bitter | 700 | `1.5rem` (row) / `1.05rem` (demo card) |
| Kicker tag | Manrope | 700 | `0.72rem`, uppercase, `letter-spacing: 0.09em` |
| Lead paragraph | Manrope | 400 | `1.1rem` / 1.5, max `46ch` |
| Body | Manrope | 400 | `1rem` / 1.5 |
| Chip/tag label | Manrope | 700 | `0.72–0.78rem` |
| Footer/caption | Manrope | 400 | `0.85rem` |

Invite-code display (§5.3, §5.4): Bitter 700, `letter-spacing: 0.35em`,
`font-variant-numeric: tabular-nums` — same reasoning as the app spec (mixed
letters/digits need tabular figures so fixed letter-spacing reads evenly).

---

## 4. Shape & motif — the squared tag is the signature

Directly reusing the app spec §3 decisions, applied to the web:

- **Cards: `border-radius: 10px`.** Any bordered content block (hero visual
  panel, shelf-row visual, demo cards, download cards).
- **Squared tag/chip: `border-radius: 6px` — never a full pill.** Applies to
  every status chip, every kicker label ("01," "Como funciona," "Experimente"),
  every platform-availability badge on the download section. This is the
  cheapest, highest-payoff, most-repeated shape decision on the page — it's
  what makes the page's silhouette read as "Domo" even in a blurred/zoomed-out
  screenshot, and it's the opposite of Dindin's "everything is a stadium"
  rule.
- **Primary CTA button: keep the pill/stadium shape** (`border-radius: 999px`),
  same as Dindin's CTA. Deliberately *not* squared off — this mirrors the app
  spec's own reasoning (buttons are large, low-frequency, already
  differentiated by color; square the high-frequency small chip instead of
  everywhere) and keeps one convention shared across the Café Labs family
  (their primary CTA button looks like a button) while the small repeated tag
  shape is what actually diverges.
- **Hairline shelf-dividers** (`border` token, 1px) between every major
  section — the one connective visual thread down the page, standing in for
  the "shelf edge" without needing a hand-drawn illustration.
- **Elevation:** cards use a hairline border **and** a soft shadow together
  (`0 1px 2px rgba(ink,.05), 0 4px 14px rgba(ink,.06)`), same "resting on a
  shelf" reasoning as the app spec §3 (border-only reads flat/generic, pure
  shadow reads "floaty," both together reads like an object sitting on
  something).

---

## 5. Site structure — sections, purpose, states

### 5.1 Header

- Logo (`domo-logo.svg`, already updated — reuse as-is) + "Domo" wordmark,
  left. "por Café Labs" text link, right — kept from the current
  implementation (house convention, not a Dindin-specific look).
- **States:** none beyond default/hover/focus-visible on the link. No
  auth, no menu — this is a single static page.

### 5.2 Hero

- **Purpose:** state what Domo is, in the product's own words, and show —
  not just tell — the ternary status system in the first five seconds.
- **Layout:** two columns at ≥900px (`1.05fr 0.95fr` split); stacks
  text-first, visual-second on narrower viewports (text stays first in DOM
  order regardless of viewport, so reading order never depends on CSS
  `order`/grid placement — screen readers get the same sequence at every
  width).
- **Left column:** squared kicker tag ("Gestão doméstica compartilhada") →
  H1 ("A casa inteira sabe o que tem no armário.") → lead paragraph (states
  the three statuses by name, and the "no group chat/spreadsheet" pain point)
  → primary CTA ("Abrir Domo na web," pill, `primary` fill) + quiet anchor
  link to the "como funciona" section ("veja como funciona ↓").
- **Right column ("shelf panel"):** a card, `aria-hidden="true"` (its content
  is a decorative-but-accurate preview; the same information — the three
  status names — is already stated in the adjacent lead paragraph, so hiding
  it from assistive tech avoids redundant announcement rather than losing
  information). Three pantry rows (Leite/Tem, Café/Em falta,
  Detergente/No carrinho) using the real squared status chips, plus a small
  overlapping avatar row (3 circles, member colors #1–#3, white initials,
  ≥5:1 contrast per §2) captioned "Compartilhado com a casa" — the
  collectivity signal the product brief keeps asking for, shown instead of
  asserted.
- **States:** static content, no loading/error (no data fetching on this
  section). Responsive: hero visual panel width caps at its column; on
  mobile it sits below the CTA at full column width, unchanged internally.

### 5.3 "Como funciona" — three alternating shelf rows

- **Purpose:** explain the actual product flow in its real order, replacing
  the old symmetric 4-card feature grid (which listed "sempre sincronizado"
  as a 4th equal-weight item — cut here: sync is an implementation property,
  not something a first-time visitor needs pitched to them as a headline
  feature).
- **Row 01 — Dispensa por status.** Numbered tag → heading → copy. Visual:
  a small `Tem → Em falta → No carrinho` chip sequence with arrows, in a
  bordered card — the ternary model shown as itself, no invented iconography.
- **Row 02 — Lista de compras automática** (flipped: text right, visual
  left). Visual: 3 rows of a mini "lista de compras" (name + status chip),
  the exact same row component the demo and the app itself use.
- **Row 03 — Casa em grupo.** Visual: the 6-character invite code shown as a
  single large tabular-figure tag (`K3F9QZ`) in the `primary-container` tone
  — the one "hero numeric" moment on the page, matching the app spec's own
  treatment of the invite code (§4.6/§2 tabular-figures note).
- **States:** static; each row's visual is illustrative only (not
  interactive) — interactivity lives in §6's demo, so this section stays
  cheap to build (no state management) while still being concrete instead of
  abstract.
- **Responsive:** rows collapse to a single column below 900px, in natural
  DOM order (numbered tag → heading → copy → visual), `flip` rows lose their
  visual left/right swap (CSS `order` reset) since there's no "side" left to
  alternate on a single column.

### 5.4 Interactive demo — "Mexa na prateleira"

See §6 for the full interaction/accessibility spec. Purpose: let a visitor
*do* the one thing that defines Domo (flip an item's status, watch the
shopping list write itself) instead of reading about it.

### 5.5 "Baixe o Domo"

- Same three platforms as today (Web available now / Windows, Android "em
  breve"), restyled: squared availability tag instead of Dindin's full-pill
  "Disponível agora" badge, and a small vertical "tab-string" mark (a 2×14px
  bar) above each card's label, echoing a tag tied to a jar's neck — a cheap,
  purely decorative (`aria-hidden`) 2px div, not a new illustration asset.
- **States:** the two "em breve" cards are non-interactive (no `href`,
  `disabled`-equivalent visual treatment: reduced opacity + neutral gray tag
  instead of the colored "available" tag) — same honest pattern as today,
  just restyled. Not a broken/dead link; genuinely inert markup.

### 5.6 Footer

- Kept structurally identical to today (brand line left, GitHub + email
  right) — this is Café Labs house footer convention, shared on purpose, not
  a Dindin-specific look. Recolor/refont only.

---

## 6. Interactive demo spec — "Mexa na prateleira"

**Recommendation: build it.** It costs less than Dindin's `CaixinhasDemo`
(no forms, no numeric parsing/validation, no multi-mode switcher — see the
component below), and it demonstrates the exact mechanic that makes Domo
worth using (the shopping list *not* being a second thing to maintain) more
convincingly than a paragraph of copy could. If the orchestrator wants to cut
scope, this is the single most defensible thing to keep and the feature grid
copy the thing to cut instead — the demo *is* the pitch.

### What it shows

A **pantry list** (5 seeded items: Leite/Tem, Café/Em falta,
Detergente/No carrinho, Papel toalha/Em falta, Arroz/Tem — seeded
**non-empty and already mixed**, unlike Dindin's demo which starts at a zero
balance and requires an action before anything interesting is visible) next
to a **"Lista de compras" panel** that is *only* a computed view of the
pantry list (every item whose status isn't "Tem"). Clicking an item's status
chip cycles it `Tem → Em falta → No carrinho → Tem`; the shopping-list panel
re-renders immediately from the same data, with no separate "add to list"
action — because there isn't one in the real product either.

### Why this interaction model, not Dindin's

- **Direct manipulation, not a form.** Dindin's demo needs mode-switching
  tabs + number inputs + a submit button because a financial transaction has
  a direction, an amount, and (for transfers) two endpoints. A pantry item's
  status is a single three-way toggle — modeling it as anything more than
  "tap to cycle" would be inventing complexity the real interaction doesn't
  have. Tapping a chip **is** the real app's core gesture (the actual app
  currently reaches this via an edit sheet, not a single tap — flag this
  explicitly to `frontend-web` and in the demo's own hint copy, "toque pra
  simular," so the simplification reads as an intentional demo shortcut, not
  a claim about the real app's exact tap target).
- **No error states needed, by construction — not because they were skipped.**
  Cycling through 3 fixed states can't produce an invalid input, so there's
  no validation copy to write, unlike Dindin's `"Informe um valor maior que
  zero"` /over-balance messages. This is error *prevention* via the
  interaction model itself (a heuristic win, not corner-cutting).
- **Squared chips as buttons**, not Dindin's pill mode-switcher — same shape
  signature as the rest of the page (§4).
- **Seeded non-empty**, so the payoff (an auto-populated shopping list) is
  visible on load, before any interaction — recognition over recall; a first
  -time visitor shouldn't have to figure out they need to "add balance" first
  to see the point, the way Dindin's zero-seeded demo requires.

### Accessibility

- Every chip is a real `<button>` with an accessible name that states the
  current status and the action (`"Leite: Tem. Toque para alternar."`), not
  a bare colored `<span>`.
- An `aria-live="polite"` region (visually hidden, same pattern as Dindin's
  `liveMessage`) announces each change ("Leite marcado como Em falta.") so a
  screen-reader user gets the same feedback a sighted user gets from the
  list panel updating.
- Minimum tap target: chips are ≥32px tall with generous horizontal padding;
  bump to a `min-height: 44px` hit area via padding if `frontend-web`'s
  spacing tokens make that free (the mockup's 32px visual height is fine
  visually, but the *tap target*, not just the visible chip, should clear
  44px — pad the button's hit area with invisible padding/negative margin if
  needed rather than shrinking surrounding rows to fit a taller visual chip).
- Explicit "prévia local, os valores não são salvos" disclaimer — same
  honest convention as Dindin's, kept because it's a good practice, not a
  look.
- `prefers-reduced-motion`: any transition on chip color/label change is a
  simple opacity/color fade (~150ms), gated the same way Dindin's
  `value-pulse`/`delta-pill` animations are — skip the transition entirely
  under reduced motion, don't just shorten it.
- **Reset button** restores the seeded state — same convention as Dindin's
  "Reiniciar demo."

### Explicitly out of scope for this demo

- No invite-code interaction (typing/validating a 6-character code isn't an
  inherently interesting interaction — §5.3's row 03 already shows the code
  concept as a static visual; adding a second interactive widget here would
  be complexity without payoff).
- No member-avatar interaction (the hero's avatar row already carries that
  signal; no need to duplicate it as an interactive element).

---

## 7. Responsive breakpoints & states summary

- **Breakpoint:** single collapse point at `900px` (matches the mockup) —
  below it, hero/how-it-works/demo/download grids all go to a single column.
  No intermediate tablet-specific layout was designed; if `frontend-web`'s
  existing Tailwind config uses `sm/md/lg` breakpoints instead, `900px` sits
  between Tailwind's default `md` (768px) and `lg` (1024px) — pick whichever
  is closer to the project's existing convention rather than introducing a
  bespoke breakpoint value, this isn't a load-bearing exact number.
- **Loading:** none — this is a static marketing page with no data fetching;
  the only "state" is the demo's client-side toggle state, which starts
  seeded (§6), not empty/loading.
- **Error:** none applicable — no forms, no network calls from this page.
- **Empty:** the demo's shopping-list panel *does* have a real empty state
  (`"Nada em falta — a lista está vazia."`) reachable by cycling every item
  to "Tem" — spec this copy explicitly so `frontend-web` doesn't leave a
  blank panel when a visitor gets there.
- **Permission-gated:** none — no auth on this page.
- **Dark mode:** driven by `prefers-color-scheme`, same mechanism already in
  place; verified via rendered screenshot (see §8) that hero, chips, and tags
  hold correct contrast in both modes using the token tables in §2.
- **Reduced motion:** respected everywhere a transition exists (§6); this
  page otherwise has no motion to gate (no scroll-triggered animation, no
  autoplaying carousel).

---

## 8. What I actually did

- Wrote this spec at `/home/felip/projetos/domo-landing/docs/DESIGN.md`.
- **Did not touch** anything under `src/` — spec only, per the task's file
  ownership boundary.
- Built a static HTML/CSS/JS mockup (not the Next.js implementation, a
  standalone reference) implementing the full page — hero, alternating
  "como funciona" rows, the working interactive demo (real click-to-cycle +
  live-updating derived list + `aria-live` announcement), and the download/
  footer sections — and rendered it via headless Chrome (desktop 1400px,
  mobile 390px) and Playwright (dark-mode `colorScheme` emulation, plus a
  scripted click on the demo to confirm the live region and derived list
  actually update) before finalizing this spec, rather than reasoning about
  the CSS from markup alone. All renders came back clean: no clipping, no
  contrast surprises, alternating rows correctly lose their side-flip on
  mobile, dark mode holds the token contrast from §2.
  - Mockup file: `/tmp/claude-1000/-home-felip-projetos-mind/2f872951-32f1-43be-b9f4-37a904c0570d/scratchpad/domo-mockup/index.html`
  - Published as an artifact: https://claude.ai/code/artifact/76ac7da6-cced-48b8-877e-3d0e9743906a
  - **Typography caveat on the mockup specifically:** this sandbox has no
    Bitter/Manrope installed locally, so the mockup substitutes DejaVu
    Serif/DejaVu Sans (both locally available) purely to verify composition,
    rhythm, and contrast by rendering. It is **not** a typographic fidelity
    reference — `frontend-web` should load the real Bitter/Manrope via
    `next/font/google` per §3, not match the mockup's fallback fonts.

## Open questions / flags for the orchestrator

1. **Demo build cost vs. value** (§6): recommending it be built — genuinely
   cheaper than Dindin's demo (no forms/validation) and a stronger pitch than
   static copy — but flagging that if scope needs to shrink, this is what to
   keep and the "como funciona" section's *visuals* (not its copy/structure)
   are what to simplify first (e.g. drop the mini chip-sequence/list-preview
   graphics, keep the numbered text rows).
2. **Tap target on demo chips** (§6, accessibility): the chip's *visual*
   height (32px) is below the 44px minimum tap-target guidance; the spec
   requires padding the hit area to 44px without growing the visual chip —
   flagging so this isn't silently shipped at 32px either way.
3. **900px breakpoint** (§7): not a value from the project's existing
   Tailwind config (which I didn't need to open — no `tailwind.config`
   customization exists beyond `@theme inline` in `globals.css`, confirmed
   by reading the current `globals.css`); `frontend-web` should reconcile it
   with whatever breakpoint convention they'd otherwise default to rather
   than treat `900px` as a hard requirement.
4. **Content cut from the old landing:** dropped "Sempre sincronizado" as a
   4th headline feature (§5.3) — real-time sync is an implementation
   property, not something a first-time visitor evaluates the product on;
   if there's a reason to keep it visible (e.g. a support/FAQ concern about
   offline behavior), it can be folded into body copy rather than restored
   as a headline item.
