import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ArmarioDemo from "./ArmarioDemo";
import { Tag } from "./Tag";

const WEB_APP_URL = "https://app.domo.cafelabs.net";

const CARD_CLASSES =
  "rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.06)]";

export default async function Home() {
  const [tHeader, tHero, tDownload, tHow, tDemo, tFooter, tStatus] = await Promise.all([
    getTranslations("Header"),
    getTranslations("Hero"),
    getTranslations("Download"),
    getTranslations("HowItWorks"),
    getTranslations("Demo"),
    getTranslations("Footer"),
    getTranslations("Status"),
  ]);

  return (
    <>
      <header className="h-16 w-full border-b border-border">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
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
            {tHeader("brandBy")}
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — asymmetric two-column split. Text stays first in DOM
            order at every width; only the visual panel's placement responds
            to viewport, so reading order never depends on layout. */}
        <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Tag variant="kicker">{tHero("kicker")}</Tag>
            <h1 className="mt-5 text-[clamp(2.1rem,4vw,3.1rem)] font-bold leading-[1.12] font-serif text-foreground">
              {tHero("title")}
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-relaxed text-muted">
              {tHero.rich("description", {
                tem: (chunks) => <strong>{chunks}</strong>,
                falta: (chunks) => <strong>{chunks}</strong>,
                carrinho: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {tHero("ctaOpenApp")}
              </a>
              <a
                href="#como-funciona"
                className="scroll-cue inline-flex items-center gap-1 text-sm font-medium text-muted underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {tHero("ctaHowItWorks")}
                <span aria-hidden="true">↓</span>
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
                  {tHero("previewLeite")}
                </span>
                <Tag tone="tem">{tStatus("tem")}</Tag>
              </li>
              <li className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-medium text-foreground">
                  {tHero("previewCafe")}
                </span>
                <Tag tone="falta">{tStatus("falta")}</Tag>
              </li>
              <li className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm font-medium text-foreground">
                  {tHero("previewDetergente")}
                </span>
                <Tag tone="carrinho">{tStatus("carrinho")}</Tag>
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
                {tHero("sharedWithHouse")}
              </span>
            </div>
          </div>
        </section>

        {/* Baixe o Domo — immediately below the hero (Café Labs landing
            structural rule 3: quick access to "use the product" can't be
            buried at the bottom of the page). */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Tag variant="kicker">{tDownload("kicker")}</Tag>
            <h2 className="mt-4 text-[2rem] font-bold font-serif text-foreground">
              {tDownload("title")}
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
                  {tDownload("webLabel")}
                </span>
                <Tag tone="primary">{tDownload("webAvailable")}</Tag>
              </a>
              <div
                className={`${CARD_CLASSES} flex flex-col items-center gap-3 p-6 text-center opacity-60`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-0.5 rounded-full bg-subtle"
                />
                <span className="font-serif text-base font-bold text-foreground">
                  {tDownload("windowsLabel")}
                </span>
                <Tag tone="neutral">{tDownload("comingSoon")}</Tag>
              </div>
              <div
                className={`${CARD_CLASSES} flex flex-col items-center gap-3 p-6 text-center opacity-60`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-0.5 rounded-full bg-subtle"
                />
                <span className="font-serif text-base font-bold text-foreground">
                  {tDownload("androidLabel")}
                </span>
                <Tag tone="neutral">{tDownload("comingSoon")}</Tag>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona — three alternating shelf rows, in the product's
            real order (mark status -> list forms itself -> invite the house),
            not an interchangeable feature grid. */}
        <section id="como-funciona" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Tag variant="kicker">{tHow("kicker")}</Tag>
            <h2 className="mt-4 text-[2rem] font-bold font-serif text-foreground">
              {tHow("title")}
            </h2>

            <div className="mt-10 divide-y divide-border">
              {/* Row 01 — Dispensa por status */}
              <div className="grid gap-8 py-12 first:pt-0 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                  <Tag variant="kicker">01</Tag>
                  <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                    {tHow("step1Title")}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-muted">
                    {tHow("step1Body")}
                  </p>
                </div>
                <div aria-hidden="true" className={`${CARD_CLASSES} p-6`}>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Tag tone="tem">{tStatus("tem")}</Tag>
                    <span className="text-subtle">→</span>
                    <Tag tone="falta">{tStatus("falta")}</Tag>
                    <span className="text-subtle">→</span>
                    <Tag tone="carrinho">{tStatus("carrinho")}</Tag>
                  </div>
                </div>
              </div>

              {/* Row 02 — Lista de compras automática (flipped: text right,
                  visual left on desktop; DOM order unchanged). */}
              <div className="grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="lg:order-last">
                  <Tag variant="kicker">02</Tag>
                  <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                    {tHow("step2Title")}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-muted">
                    {tHow("step2Body")}
                  </p>
                </div>
                <div aria-hidden="true" className={`${CARD_CLASSES} p-6`}>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.09em] text-subtle">
                    {tHow("shoppingListLabel")}
                  </p>
                  <ul className="mt-4 divide-y divide-border">
                    <li className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm font-medium text-foreground">
                        {tHero("previewCafe")}
                      </span>
                      <Tag tone="falta">{tStatus("falta")}</Tag>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm font-medium text-foreground">
                        {tHow("previewPapelToalha")}
                      </span>
                      <Tag tone="falta">{tStatus("falta")}</Tag>
                    </li>
                    <li className="flex items-center justify-between gap-3 py-2">
                      <span className="text-sm font-medium text-foreground">
                        {tHero("previewDetergente")}
                      </span>
                      <Tag tone="carrinho">{tStatus("carrinho")}</Tag>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Row 03 — Casa em grupo */}
              <div className="grid gap-8 py-12 last:pb-0 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div>
                  <Tag variant="kicker">03</Tag>
                  <h3 className="mt-4 text-2xl font-bold font-serif text-foreground">
                    {tHow("step3Title")}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-muted">
                    {tHow("step3Body")}
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
            <Tag variant="kicker">{tDemo("kicker")}</Tag>
            <h2 className="mt-4 text-[2rem] font-bold font-serif text-foreground">
              {tDemo("title")}
            </h2>
            <p className="mt-3 max-w-[46ch] text-muted">
              {tDemo("description")}
            </p>
            <ArmarioDemo />
          </div>
        </section>

      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-subtle sm:flex-row sm:justify-between">
          <span>{tFooter("brand")}</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/CafeLabsCorp/domo"
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
