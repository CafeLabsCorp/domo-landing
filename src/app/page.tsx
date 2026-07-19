import Image from "next/image";
import ArmarioDemo from "./ArmarioDemo";
import { Tag } from "./Tag";

const WEB_APP_URL = "https://app.domo.cafelabs.net";

const CARD_CLASSES =
  "rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.06)]";

export default function Home() {
  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image src="/domo-logo.svg" alt="Domo" width={32} height={16} />
            <span className="font-serif text-lg font-bold text-foreground">
              Domo
            </span>
          </div>
          <a
            href="https://cafelabs.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-subtle transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            por Café Labs
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — asymmetric two-column split. Text stays first in DOM
            order at every width; only the visual panel's placement responds
            to viewport, so reading order never depends on layout. */}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <Tag variant="kicker">Gestão doméstica compartilhada</Tag>
            <h1 className="mt-5 text-[clamp(2.1rem,4vw,3.1rem)] font-bold leading-[1.12] font-serif text-foreground">
              A casa inteira sabe o que tem no armário.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-relaxed text-muted">
              Cada item marcado como <strong>Tem</strong>,{" "}
              <strong>Em falta</strong> ou <strong>No carrinho</strong> — sem
              duplicar tudo num grupo de mensagens ou numa planilha à parte.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Abrir Domo na web
              </a>
              <a
                href="#como-funciona"
                className="text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                veja como funciona ↓
              </a>
            </div>
          </div>

          {/* Decorative-but-accurate preview: the three status names are
              already stated in the lead paragraph above, so this panel is
              hidden from assistive tech to avoid redundant announcement. */}
          <div aria-hidden="true" className={`${CARD_CLASSES} p-6`}>
            <ul className="divide-y divide-border">
              <li className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-medium text-foreground">
                  Leite
                </span>
                <Tag tone="tem">Tem</Tag>
              </li>
              <li className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-medium text-foreground">
                  Café
                </span>
                <Tag tone="falta">Em falta</Tag>
              </li>
              <li className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-medium text-foreground">
                  Detergente
                </span>
                <Tag tone="carrinho">No carrinho</Tag>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="flex -space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-member-1 text-xs font-bold text-white ring-2 ring-surface">
                  A
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-member-2 text-xs font-bold text-white ring-2 ring-surface">
                  B
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-member-3 text-xs font-bold text-white ring-2 ring-surface">
                  C
                </span>
              </div>
              <span className="text-sm text-subtle">
                Compartilhado com a casa
              </span>
            </div>
          </div>
        </section>

        {/* Como funciona — three alternating shelf rows, in the product's
            real order (mark status -> list forms itself -> invite the house),
            not an interchangeable feature grid. */}
        <section id="como-funciona" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Tag variant="kicker">Como funciona</Tag>
            <h2 className="mt-4 text-[2rem] font-bold font-serif text-foreground">
              Do jeito que a casa realmente usa
            </h2>

            <div className="mt-10 divide-y divide-border">
              {/* Row 01 — Dispensa por status */}
              <div className="grid gap-8 py-12 first:pt-0 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                  <Tag variant="kicker">01</Tag>
                  <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                    Dispensa por status
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-muted">
                    Cada item da casa marcado como Tem, Em falta ou No
                    carrinho — um toque no app é tudo que precisa pra manter a
                    dispensa em dia.
                  </p>
                </div>
                <div aria-hidden="true" className={`${CARD_CLASSES} p-6`}>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Tag tone="tem">Tem</Tag>
                    <span className="text-subtle">→</span>
                    <Tag tone="falta">Em falta</Tag>
                    <span className="text-subtle">→</span>
                    <Tag tone="carrinho">No carrinho</Tag>
                  </div>
                </div>
              </div>

              {/* Row 02 — Lista de compras automática (flipped: text right,
                  visual left on desktop; DOM order unchanged). */}
              <div className="grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="lg:order-last">
                  <Tag variant="kicker">02</Tag>
                  <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                    Lista de compras automática
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-muted">
                    A lista de compras nasce direto da dispensa: tudo que não
                    está marcado como Tem já aparece pronto pra comprar, sem
                    precisar adicionar de novo em outro lugar.
                  </p>
                </div>
                <div aria-hidden="true" className={`${CARD_CLASSES} p-6`}>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.09em] text-subtle">
                    Lista de compras
                  </p>
                  <ul className="mt-4 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm font-medium text-foreground">
                        Café
                      </span>
                      <Tag tone="falta">Em falta</Tag>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm font-medium text-foreground">
                        Papel toalha
                      </span>
                      <Tag tone="falta">Em falta</Tag>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm font-medium text-foreground">
                        Detergente
                      </span>
                      <Tag tone="carrinho">No carrinho</Tag>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Row 03 — Casa em grupo */}
              <div className="grid gap-8 py-12 last:pb-0 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                  <Tag variant="kicker">03</Tag>
                  <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                    Casa em grupo
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-muted">
                    Convide quem mora com você por um código de 6 caracteres e
                    gerencie membros e cargos — a dispensa passa a ser da casa
                    inteira, não só sua.
                  </p>
                </div>
                <div className={`${CARD_CLASSES} flex justify-center p-8`}>
                  <span className="inline-flex items-center justify-center rounded-[6px] bg-primary-container px-6 py-3 font-serif text-[1.75rem] font-bold tracking-[0.35em] text-primary-container-foreground [font-variant-numeric:tabular-nums]">
                    K3F9QZ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive demo — the strongest piece on the page: direct
            manipulation of the real ternary status model, no forms. */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Tag variant="kicker">Experimente</Tag>
            <h2 className="mt-4 text-[2rem] font-bold font-serif text-foreground">
              Mexa na prateleira
            </h2>
            <p className="mt-3 max-w-[46ch] text-muted">
              Toque num item da dispensa pra alternar o status e veja a lista
              de compras se atualizar sozinha — do mesmo jeito que ela nasce
              no app de verdade.
            </p>
            <ArmarioDemo />
          </div>
        </section>

        {/* Baixe o Domo */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Tag variant="kicker">Baixe o Domo</Tag>
            <h2 className="mt-4 text-[2rem] font-bold font-serif text-foreground">
              Leve o armário com você
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${CARD_CLASSES} flex flex-col items-center gap-3 p-6 text-center transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-0.5 rounded-full bg-primary"
                />
                <span className="font-serif text-base font-bold text-foreground">
                  Web
                </span>
                <Tag tone="primary">Disponível agora</Tag>
              </a>
              <div
                className={`${CARD_CLASSES} flex flex-col items-center gap-3 p-6 text-center opacity-60`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-0.5 rounded-full bg-subtle"
                />
                <span className="font-serif text-base font-bold text-foreground">
                  Windows
                </span>
                <Tag tone="neutral">Em breve</Tag>
              </div>
              <div
                className={`${CARD_CLASSES} flex flex-col items-center gap-3 p-6 text-center opacity-60`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-0.5 rounded-full bg-subtle"
                />
                <span className="font-serif text-base font-bold text-foreground">
                  Android
                </span>
                <Tag tone="neutral">Em breve</Tag>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-subtle sm:flex-row sm:justify-between">
          <span>Domo — um produto Café Labs</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/CafeLabsDev/domo"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              GitHub
            </a>
            <a
              href="mailto:contato@cafelabs.net"
              className="transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              contato@cafelabs.net
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
