# domo-landing

Landing page de download do [Domo](https://github.com/CafeLabsDev/domo), app de
gestão doméstica em grupo da Café Labs (despensa compartilhada por status,
lista de compras derivada, gerenciamento de casa/membros). Site estático
(Next.js), hospedado separado do app real, sob a identidade visual própria do
produto — **"Armário Aberto"** (Azul Louça `#2C4A7C`, tipografia Bitter +
Manrope) — não a do portfólio institucional da Café Labs nem a de outros
produtos da casa (ex. Dindin, que é verde/Fraunces).

Para quem está vendo este repo pela primeira vez: é uma página de marketing
de uma única rota (`/`), sem backend próprio, cujo ponto mais interessante é
uma demo interativa client-side que reproduz fielmente o modelo de status
ternário (Tem / Em falta / No carrinho) do app real. Ver
[`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) para como isso funciona por
dentro.

## Stack

| Camada          | Tecnologia                                    |
| --------------- | ---------------------------------------------- |
| Framework       | Next.js 16 (App Router)                        |
| UI              | React 19                                       |
| Estilo          | Tailwind CSS v4 (tokens via CSS custom properties + `@theme inline`) |
| Tipografia      | Bitter (headings) + Manrope (corpo), via `next/font/google` (self-hosted no build, sem fetch em runtime) |
| Linguagem       | TypeScript                                      |
| Lint            | ESLint (`eslint-config-next`)                   |
| Hospedagem      | Vercel                                          |

Mesmo padrão de stack do site institucional (`cafelabs-portifolio`) e do
[`dindin-landing`](https://github.com/CafeLabsDev/dindin-landing) — só a
identidade visual e o conteúdo divergem por produto.

## Rodando localmente

Pré-requisito: Node.js (versão compatível com Next.js 16 / React 19 —
`TODO: confirmar` versão mínima exata, não fixada em `package.json` nem em
`.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros scripts:

```bash
npm run build    # build de produção
npm run start    # serve o build de produção
npm run lint     # eslint
```

Não há variáveis de ambiente nem backend próprio — o projeto roda igual em
qualquer máquina só com `npm install`.

## Estrutura de pastas

```
src/app/
  page.tsx        # única página: header, hero, seção de download, "como
                   # funciona" (3 shelves), demo interativa, footer
  layout.tsx       # fontes (Bitter/Manrope), metadata, <html>/<body>
  globals.css       # tokens de design (cores claro/escuro) + @theme inline
  ArmarioDemo.tsx   # demo client-side (despensa + lista de compras)
  statuses.ts       # modelo de status ternário compartilhado (fonte única)
  Tag.tsx           # componente do chip/tag quadrado (assinatura visual)
public/
  domo-logo.svg
docs/
  ARQUITETURA.md    # como o site e a demo funcionam por dentro
  DESIGN.md         # spec de identidade visual "Armário Aberto"
  DEPLOY.md         # como o deploy no Vercel funciona
```

## Identidade visual

Paleta e tipografia da identidade **"Armário Aberto"**, já aplicada em todo o
site — ver [`docs/DESIGN.md`](docs/DESIGN.md) para a spec completa (tokens de
cor claro/escuro, tipografia, motivo de cada escolha e a divergência
deliberada em relação à landing do Dindin).

## Deploy

Vercel, domínio `domo.cafelabs.net`. Ver [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Status

- [x] Hero, seção "Baixe o Domo", "Como funciona" (3 shelves alternadas) e
      demo interativa "Mexa na prateleira" implementados sob a identidade
      "Armário Aberto" (2026-07-18).
- [x] Botão "Web" ativo, linkando pro app (`app.domo.cafelabs.net`).
- [x] Deploy no ar em [domo.cafelabs.net](https://domo.cafelabs.net).
- [ ] Download Windows — placeholder "em breve". O app Domo ainda não tem o
      target Windows configurado no Flutter (só Android + Web hoje); a
      landing já reserva o espaço antecipando o suporte.
- [ ] Download Android — placeholder "em breve", depende de decidir onde
      hospedar o `.apk` de release.
