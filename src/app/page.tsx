import Image from "next/image";

const WEB_APP_URL = "https://app.domo.cafelabs.net";

const features = [
  {
    title: "Despensa por status",
    description:
      "Cada item da casa marcado como Tem, Em falta ou No carrinho — sem duplicar lista em planilha ou grupo de mensagens.",
  },
  {
    title: "Lista de compras automática",
    description:
      "A lista de compras nasce direto da despensa: o que está em falta já aparece pronto pra comprar.",
  },
  {
    title: "Casa em grupo",
    description:
      "Convide quem mora com você por um código de 6 caracteres e gerencie membros e cargos.",
  },
  {
    title: "Sempre sincronizado",
    description:
      "Web e Android compartilham a mesma despensa em tempo real, então todo mundo vê a mesma coisa.",
  },
];

export default function Home() {
  return (
    <>
      <header className="w-full border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image src="/domo-logo.svg" alt="Domo" width={28} height={28} />
            <span className="text-lg font-semibold">Domo</span>
          </div>
          <a
            href="https://cafelabs.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-subtle transition-colors hover:text-foreground"
          >
            por Café Labs
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center">
          <Image src="/domo-logo.svg" alt="" width={72} height={72} aria-hidden />
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Despensa e compras, organizadas em grupo
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Cadastre os itens da casa, acompanhe o que tem, o que falta e o que já
            está no carrinho — tudo sincronizado entre quem mora com você.
          </p>
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Abrir Domo na web
          </a>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <h2 className="text-lg font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-2xl font-semibold">Baixe o Domo</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-6 text-center transition-colors hover:border-primary"
            >
              <span className="text-base font-medium">Web</span>
              <span className="text-sm text-subtle">Disponível agora</span>
            </a>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border p-6 text-center text-subtle">
              <span className="text-base font-medium">Windows</span>
              <span className="text-sm">Em breve</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border p-6 text-center text-subtle">
              <span className="text-base font-medium">Android</span>
              <span className="text-sm">Em breve</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-sm text-subtle sm:flex-row sm:justify-between">
          <span>Domo — um produto Café Labs</span>
          <a
            href="mailto:contato@cafelabs.net"
            className="transition-colors hover:text-foreground"
          >
            contato@cafelabs.net
          </a>
        </div>
      </footer>
    </>
  );
}
