**[Read in English](ARQUITETURA.md)**

# Arquitetura — domo-landing

Landing estática de página única, sem backend próprio. Este documento explica
como o site é montado e, com mais detalhe, como funciona o modelo de estado
da demo interativa — a parte com lógica real do projeto.

## Visão geral

- **Next.js (App Router), uma única rota por locale (`/pt`, `/en`)** —
  `src/app/[locale]/page.tsx` monta a página inteira (header, hero,
  download, "como funciona", demo, footer) num único componente Server
  Component assíncrono (ele dá `await` em `getTranslations` pra cada
  namespace de mensagem antes de renderizar); nada é buscado em runtime
  além disso (sem `fetch`/API routes externos) e não há roteamento
  client-side além de âncoras (`#`) e da própria troca de idioma.
- **Um único componente client (`ArmarioDemo.tsx`)** — é o único pedaço da
  página com `"use client"` e `useState`; `LanguageSwitcher.tsx` também é
  client component (precisa de `useRouter`/`usePathname`), mas não carrega
  estado próprio. Todo o resto é HTML estático gerado no build/servidor.
- **Sem backend, sem banco, sem autenticação** — a demo é uma simulação
  local; nada digitado ou clicado nela é persistido ou enviado a qualquer
  lugar (o texto "prévia local, os valores não são salvos" na própria UI é
  literal).
- **Deploy estático/SSR padrão do Next na Vercel** — ver
  [`DEPLOY.pt-br.md`](DEPLOY.pt-br.md).

## Internacionalização (`next-intl`)

O roteamento por locale (`/pt`, `/en`, PT como padrão) é implementado com
`next-intl`, ligado em quatro arquivos:

- **`src/proxy.ts`** — o ponto de entrada em tempo de request que resolve e
  redireciona pro prefixo de locale certo, construído sobre
  `next-intl/middleware`. No Next.js 16, o arquivo que nas versões
  anteriores se chamava `middleware.ts` agora se chama `proxy.ts`
  (funcionalidade igual, só mudou a convenção de nome do arquivo — ver
  `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` se
  isso parecer estranho). O `matcher` exclui `/api`, `/_next`, `/_vercel` e
  qualquer caminho com extensão de arquivo, pra assets estáticos não
  passarem pela lógica de locale.
- **`src/i18n/routing.ts`** — declara os dois locales suportados
  (`pt`, `en`) e o padrão (`pt`) via `defineRouting`; é a fonte única que
  tanto `proxy.ts` quanto `navigation.ts` leem.
- **`src/i18n/navigation.ts`** — reexporta wrappers de `Link`, `useRouter`,
  `usePathname` cientes de locale (de `next-intl/navigation`), pra qualquer
  navegação interna preservar/trocar o prefixo de locale automaticamente
  em vez de cada componente raciocinar sobre isso manualmente.
- **`src/i18n/request.ts`** — resolve qual locale está ativo em cada
  request e carrega o arquivo `messages/<locale>.json` correspondente pro
  `NextIntlClientProvider`/`getTranslations`.

`src/app/[locale]/LanguageSwitcher.tsx` é o único pedaço de UI ciente desse
mecanismo: um componente client que lê o locale atual via `useLocale()`,
calcula o outro, e chama `router.replace(pathname, { locale: nextLocale })`
usando o router já embrulhado de `navigation.ts` — trocando o locale sem
recarregar a página inteira e sem perder o caminho atual.

Toda a copy da página — incluindo nomes de item da demo interativa,
rótulos de status e as strings de acessibilidade `aria-live`/`aria-label`
— vem de `messages/pt.json`/`messages/en.json`, não hardcoded nos
componentes.

## Design tokens: CSS custom properties + Tailwind v4

`src/app/[locale]/globals.css` declara todas as cores como CSS custom properties em
`:root` (tema claro) e as sobrescreve dentro de
`@media (prefers-color-scheme: dark)` (tema escuro) — não há um mecanismo de
toggle manual de tema, o site segue a preferência do sistema operacional/
navegador.

O bloco `@theme inline` do Tailwind v4 mapeia cada variável para uma classe
utilitária (`--color-primary: var(--primary)` → `bg-primary`,
`text-primary`, etc.), então qualquer componente usa classes Tailwind
normais e ganha o tema claro/escuro automaticamente, sem lógica condicional
no JSX. O mesmo mecanismo mapeia as fontes (`--font-serif: var(--font-bitter)`,
`--font-sans: var(--font-manrope)`).

Ver [`DESIGN.pt-br.md`](DESIGN.pt-br.md) para a lista completa de tokens e o motivo de
cada valor de cor.

## Tipografia

`layout.tsx` carrega Bitter e Manrope via `next/font/google`, o que
self-hosta as fontes no build (sem requisição de rede em runtime) e expõe
cada uma como uma CSS variable (`--font-bitter`, `--font-manrope`) aplicada
na tag `<html>`. `globals.css` mapeia essas variáveis pros tokens `--font-serif`/
`--font-sans` consumidos pelas classes Tailwind (`font-serif`, `font-sans`).

## O componente `Tag`

`src/app/[locale]/Tag.tsx` é o único componente de chip/label da página — usado tanto
pros kickers de seção ("01", "Como funciona") quanto pros chips de status
(Tem/Em falta/No carrinho) na hero, nas shelves de "como funciona" e na
demo. `border-radius: 6px` fixo (nunca pílula) é a assinatura visual central
da identidade "Armário Aberto" — ver `DESIGN.pt-br.md` §4. Centralizar o chip num
único componente é o que garante essa consistência sem repetir a classe em
cada lugar que usa um status.

## Modelo de estado da demo (`ArmarioDemo.tsx` + `statuses.ts`)

Esta é a parte do projeto com lógica de verdade, então vale detalhar como e
por que ela é modelada assim.

### Fonte única do modelo: `statuses.ts`

`src/app/[locale]/statuses.ts` não pertence só à demo — é importado também por
`page.tsx` (nas visuais estáticas da hero e das shelves de "como funciona")
e por `Tag.tsx`, garantindo que o rótulo e a cor de cada status ("Tem" /
"Em falta" / "No carrinho") sejam sempre os mesmos em toda a página, estática
ou interativa.

Ele define:

- `type Status = "tem" | "falta" | "carrinho"` — o modelo ternário do item de
  despensa do app real.
- `STATUS_LABEL` / `STATUS_TONE_CLASSES` — rótulo em português e classes
  Tailwind (par preenchimento/texto já checado quanto a contraste em
  `DESIGN.pt-br.md` §2) para cada status.
- **Dois mapas de transição independentes, não um ciclo único** —
  `PANTRY_TOGGLE` (`tem <-> falta`) e `CART_TOGGLE` (`falta <-> carrinho`).

Esse último ponto é o motivo da correção feita no commit `80e1f0d`
("Corrige demo interativa: item no carrinho não sumia da despensa"): a
versão anterior usava um único ciclo compartilhado
(`tem -> falta -> carrinho -> tem`) entre as duas telas, o que fazia um item
marcado como "no carrinho" continuar aparecendo (duplicado) no painel da
despensa. O app Flutter real **não tem um toggle único** — cada tela só
conhece a transição que faz sentido nela:

- A tela de despensa (`dispensa_page.dart` no app real) só alterna
  `tem <-> falta`. Nunca é dali que um item vai pra "no carrinho".
- A tela de lista de compras (`mercado_page.dart` no app real) só alterna
  `falta <-> carrinho`.
- A volta de `carrinho` pra `tem` não é um toque item-a-item — é uma ação em
  lote ("Atualizar dispensa"), que fecha a compra movendo todo item
  `carrinho` pra `tem` de uma vez.

`ArmarioDemo.tsx` espelha essa divisão exatamente:

| Função | Transição permitida | Espelha (app real) |
| --- | --- | --- |
| `togglePantryStatus` | `tem <-> falta` (ignora clique se já é `carrinho`) | `dispensa_page.dart` |
| `toggleCartStatus` | `falta <-> carrinho` (ignora clique se já é `tem`) | `mercado_page.dart` |
| `atualizarDespensa` | todo item `carrinho` → `tem`, em lote | ação "Atualizar dispensa" |

### Derivação das duas listas visíveis

Os dois painéis da demo (Despensa / Lista de compras) não são dois pedaços de
estado separados — são duas *views* derivadas do mesmo array `items` a cada
render, igual ao app real:

```ts
const pantryItems = items.filter((item) => item.status !== "carrinho");
const shoppingList = items.filter((item) => item.status !== "tem");
```

- **Despensa** mostra tudo que não está `carrinho` (um item no carrinho já
  saiu fisicamente da despensa).
- **Lista de compras** mostra tudo que não está `tem` (é a "view" de tudo que
  falta comprar, incluindo o que já está no carrinho aguardando finalizar a
  compra).

Não existe uma ação separada de "adicionar à lista" — a lista nasce como
consequência do status, do mesmo jeito que no app real (ver `DESIGN.pt-br.md` §6,
"Por que este modelo de interação").

### Estado seedado, não vazio

O array inicial (`SEED`, 5 itens) já vem misto (2 `tem`, 2 `falta`, 1
`carrinho`) para que o resultado (uma lista de compras já populada) fique
visível antes de qualquer interação — reconhecimento em vez de exigir que o
visitante descubra que precisa "adicionar" algo primeiro.

### Acessibilidade do estado

- Cada linha é um `<button>` com `aria-label` descrevendo o status atual e a
  ação (`"Leite: Tem. Toque para alternar para Em falta."`), nunca um
  `<span>` colorido sem semântica.
- Uma região `aria-live="polite"` (visualmente oculta via `sr-only`) anuncia
  cada mudança de status e a atualização em lote, para paridade entre
  usuário de leitor de tela e usuário vidente (que vê o painel mudar).
- Transições de cor respeitam `motion-reduce:transition-none`.
- Área de toque mínima de 44px (`min-h-11`) na linha inteira, mesmo com o
  chip visual ficando em 32px (`h-8`) — ver `DESIGN.pt-br.md` §6 para o raciocínio.

## Sem `docs/BACKEND.md`

Este projeto não tem backend, banco de dados ou API própria — todo o "estado"
existente é local ao navegador (`useState` da demo) e some ao recarregar a
página. Por isso não há um `docs/BACKEND.md`; a seção correspondente do app
real vive no repo do Domo (`domo/docs/BACKEND.md`).
