**[Read in English](DESIGN.md)**

# Domo landing — spec do redesign ("Armário Aberto")

Status: **implementado** (commits `d7ed472`, `ab0f7bd`, `ea1d6ed`, `80e1f0d`
em `src/app/`) — este documento é mantido como a referência viva de tokens
de design (cor, tipografia, forma) e do raciocínio por trás de cada decisão,
não só como spec histórica. Ao alterar um token de cor/tipografia no código,
atualizar aqui também.

Texto original abaixo, escrito como spec pré-implementação pela especialista
de design (scope owner) para a `frontend-web` (implementation owner)
executar — mantido como está por ainda descrever fielmente o que foi
construído; ver `docs/ARQUITETURA.pt-br.md` para como o modelo de estado da
demo funciona na prática.

Isto substitui a landing atual (`src/app/page.tsx` + `globals.css`), que foi
construída copiando a paleta verde antiga "Sage Home" e a fonte Inter 1:1
sobre um esqueleto genérico de hero → grade de features → cards de download →
footer. O resultado lia como "um template de landing com o logo antigo
trocado," não como o Domo. Esta spec refaz composição, ritmo e mensagem sob a
identidade **"Armário Aberto"** já aprovada para o app
(`/home/felip/projetos/domo/docs/DESIGN.pt-br.md`, doravante "a spec do
app") — os mesmos tokens de cor/tipografia, traduzidos pra uma página que
tem sua própria razão de ser moldada do jeito que é, não um re-skin da
estrutura antiga e nem uma cópia da estrutura da landing do Dindin (ver §1).

Li, e reaproveitei valores já verificados, da spec do app em vez de
re-derivar razões de contraste: todo hex abaixo é citado de lá, não
recalculado, exceto onde indicado.

---

## 0. Conceito: a página *é* uma prateleira, não uma pilha hero-depois-grade

**Recapitulando a metáfora (da spec do app):** o Domo é o armário/despensa
única que a casa inteira consegue ver e reabastecer junto — cerâmica
vitrificada, uma etiqueta de giz/papel amarrada no gargalo do pote, um cesto
de vime perto da porta. Azul cobalto (`#2C4A7C`), destaque mostarda, uma
fonte serifada slab "etiqueta carimbada" pros títulos, e **chips/tags de
etiqueta quadrados** (não pílulas) como a assinatura de forma mais repetida
e de maior retorno.

**Como isso vira uma composição de landing, não só uma troca de cor:** a
página é estruturada como uma sequência de *prateleiras*, cada uma
introduzida por uma pequena tag quadrada (um rótulo numerado ou nomeado,
exatamente a forma "etiqueta presa no pote" do app), com **layout alternado
esquerda/direita** entre prateleiras em vez de cada seção ser uma pilha
centralizada de cards de peso igual. Uma linha fina (`border` token) corre
entre prateleiras como a borda física de uma tábua de prateleira — o único
fio visual contínuo amarrando a página, em vez de espaço em branco vertical
simples entre blocos sem relação.

Concretamente, três divergências deliberadas de "landing SaaS genérica" e do
padrão da landing do Dindin, em ordem de custo de construção:

1. **Hero assimétrico, não uma pilha centralizada com decoração flutuante.**
   Coluna de texto + uma preview *literal e legível* da linguagem real da UI
   (três linhas de dispensa com chips de status quadrados reais:
   Tem/Em falta/No carrinho) — não uma forma abstrata espalhada atrás de
   texto centralizado. A decoração *é* o produto, não papel de parede atrás
   dele.
2. **Prateleiras alternadas de "como funciona" em vez de uma grade simétrica
   de N features.** Três linhas, cada uma emparelhando uma tag numerada
   quadrada + texto curto com um visual concreto pequeno (um ciclo de chip
   de status, uma lista de compras se formando, uma tag de código de
   convite), invertendo lados a cada linha. Isso segue a sequência real do
   próprio produto (marcar status → lista se forma sozinha → convidar a
   casa) em vez de uma grade intercambiável de 2×2/3×3 de features que
   poderia pertencer a qualquer app.
3. **Uma demo de manipulação direta enraizada no modelo ternário de status**,
   não um formulário transacional. Ver §6 — esta é a peça com maior chance
   de ser comparada à `CaixinhasDemo` do Dindin, então sua divergência é
   detalhada.

**O que isto explicitamente não faz:** nenhum estilo de ilustração novo que
exija repasse pra um designer/ilustrador (todos os visuais são feitos dos
mesmos componentes — chips, tags, linhas, cards — usados no resto da página,
então a `frontend-web` constrói eles do mesmo jeito que tudo mais); nenhuma
biblioteca de animação disparada por scroll; nenhum roteamento client-side
além do single-page app existente. Isso fica dentro do território
"mantenedor solo, seguro/comprovado" (ambição padrão, não especificada de
outra forma pelo orquestrador) — ousado na *composição*, seguro na *técnica
de implementação*.

---

## 1. Divergência da landing do Dindin — explícita, checada ponto a ponto

A landing do Dindin (`/home/felip/projetos/dindin-landing/src/app/page.tsx` +
`CaixinhasDemo.tsx`) foi lida **só como anti-referência**. Ponto a ponto:

| Dimensão | Landing do Dindin | Landing do Domo (esta spec) |
|---|---|---|
| Layout do hero | Altura 100% da viewport, pilha de texto totalmente centralizada, formas decorativas abstratas ("abas de envelope," 6 retângulos arredondados rotacionados) espalhadas atrás, aria-hidden, puramente cosméticas | Divisão assimétrica de duas colunas (não centralizada em altura total); a coluna da direita é uma preview **concreta e significativa** da UI real da dispensa, não decoração abstrata |
| Ritmo das seções | Hero → cards de download → demo interativa → grade simétrica de 3 features → footer | Hero → 3 linhas narrativas alternadas de "prateleira" (layout próprio, não uma grade) → demo interativa → cards de download → footer. Ordem diferente *e* forma interna diferente pra seção explicativa |
| Explicador de features | Grade simétrica de cards de peso igual, sem ordem inerente | Linhas alternadas esquerda/direita, numeradas 01/02/03, ordenadas pra bater com o fluxo real do produto |
| Assinatura de forma repetida | Pílula/estádio total em tudo, incluindo badges ("Disponível agora") | Tag/chip quadrado de 6px (ver §3) em todo rótulo repetido — o maior diferenciador tátil da página, mesmo raciocínio da spec do app |
| Modelo de interação da demo | Trocador de modo (3 botões de aba: Adicionar/Alocar/Transferir) → formulários de input numérico → submit → deltas/pulsos animados de moeda | Sem formulários, sem trocador de modo: toque-pra-ciclar de manipulação direta nos chips de status reais, lista derivada atualizando ao vivo (§6) |
| Tom de fundo | Marfim quente (`#faf4ea` claro / `#16130f` escuro) | Cinza-azulado "pedra cerâmica" frio (`#EEF1F1` claro / `#12171C` escuro) — tom oposto, per spec do app §1 |
| Fonte de título | Fraunces (serifada caligráfica/old-style suave) | Bitter (slab serif, "etiqueta carimbada") — uma *classe* diferente de serifada, não um corte diferente, per spec do app §2 |
| Fonte do corpo | Work Sans | Manrope — mais geométrica/nítida, per spec do app §2 |

As únicas coisas intencionalmente **mantidas** iguais à landing do Dindin
(porque são convenção da casa Café Labs, não "design do Dindin," e divergir
custaria reconhecimento sem ganho nenhum): o link do header "por Café Labs,"
o padrão de texto honesto de disclaimer da demo "prévia local, não é salva,"
e a estrutura do footer (linha de marca + GitHub + e-mail). Essas são
convenções de utilidade/casa, não parte do que fazia os dois apps *parecerem*
iguais.

---

## 2. Tokens de cor → variáveis CSS do Tailwind v4

A landing do Domo já declara tokens do mesmo jeito que a landing do Dindin
(`:root { --background: ... }` + `@theme inline { --color-background: var(...) }`
+ um bloco de override `@media (prefers-color-scheme: dark)`) — reaproveitar
esse mesmo mecanismo, só trocando os valores e adicionando os papéis novos
abaixo. Todos os valores hex são citados da spec do app §1.1/§1.2
(claro/escuro) — não re-derivar; as razões citadas já são calculadas lá
contra `surface`/`background`.

### `globals.css` — claro (`:root`)

```css
--background: #EEF1F1;       /* tela "pedra cerâmica", spec do app §1.1 */
--surface: #FFFFFF;
--foreground: #1B2024;       /* inkPrimary, sobre background: 14.46:1 */
--muted: #4F5A61;            /* inkSecondary, sobre background: 6.23:1, sobre surface: 7.08:1 */
--subtle: #5A6469;           /* inkSubtle, sobre background: 5.34:1, sobre surface: 6.07:1 */
--border: rgba(27, 32, 36, 0.12);   /* inkPrimary @ 12% — só linha divisória decorativa */
--outline: #5C6B78;          /* contornos reais de componente, sobre background: 4.83:1 */

--primary: #2C4A7C;          /* Azul Louça */
--primary-foreground: #FFFFFF;      /* onPrimary: 8.83:1 */
--primary-container: #D7E1F0;
--primary-container-foreground: #16233D;  /* onPrimaryContainer: 11.86:1 */

--secondary: #63584A;        /* Grafite Quente */

--tertiary: #8A5F12;         /* Mostarda — uso comedido, só momentos de destaque/coletividade */
--tertiary-foreground: #FFFFFF;     /* onTertiary: 5.64:1 */
--tertiary-container: #F4E7C8;
--tertiary-container-foreground: #3E2E10;  /* onTertiaryContainer: 10.67:1 */

--status-tem: #286B5C;
--status-tem-container: #D9EDE7;
--status-tem-container-foreground: #124338;   /* 9.13:1 */

--status-falta: #B83A2A;
--status-falta-container: #F9DCD6;
--status-falta-container-foreground: #5A2318; /* 9.62:1 */

--status-carrinho: #8A5F12;   /* = tertiary, deliberadamente (spec do app §1.1) */
--status-carrinho-container: #F4E7C8;
--status-carrinho-container-foreground: #3E2E10; /* 10.67:1 */

/* Cores de membro — só #1/#2/#3 são necessárias na landing (pilha de avatar
   do hero, §5.2); o conjunto completo de 6 tons vive na spec do app §1.3 se
   uma seção futura precisar de mais. */
--member-1: #2C4A7C;  /* Azul Louça, texto branco: 8.83:1 */
--member-2: #8A5F12;  /* Mostarda, texto branco: 5.64:1 */
--member-3: #286B5C;  /* Verde Jade, texto branco: 6.27:1 */
```

### `globals.css` — escuro (dentro do bloco `@media (prefers-color-scheme: dark)` existente)

```css
--background: #12171C;
--surface: #1B2128;
--foreground: #EDEFF1;       /* sobre background: 15.64:1 */
--muted: #B9C1C7;             /* sobre background: 9.88:1 */
--subtle: #8F9AA1;             /* sobre background: 6.27:1, sobre surface: 5.64:1 */
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

--member-1: #9BB8DE;  /* texto de tinta escura em cima, per spec do app §1.3 se usado como fundo de rótulo */
--member-2: #E0B84A;
--member-3: #6FC2AC;
```

Mapear cada um destes no bloco `@theme inline` do mesmo jeito que os dois
tokens existentes já são (`--color-status-tem: var(--status-tem);` etc.) pra
que as classes utilitárias do Tailwind (`bg-status-tem-container`,
`text-primary`, …) resolvam direto — mesmo padrão já no arquivo, só mais
entradas.

**Nenhum par de cor novo foi inventado pra landing** — toda combinação acima
é um par já checado quanto a contraste na spec do app. O único posicionamento
novo na landing (chips/tags direto sobre `--background`, não só sobre
`--surface`/branco como nas telas mobile do app) ainda é seguro: os pares de
preenchimento-de-container/texto-sobre-container já são checados contra
branco (9–11:1), e `--background` (`#EEF1F1`) é mais claro que branco por
menos de um ponto de luminância na direção errada pra inverter isso — sem
caminho realista pra falhar 4.5:1 aí. Se a `frontend-web` quiser isso
reconfirmado com um script antes de lançar, tratar como uma passada barata
de confirmação, não um redesign.

---

## 3. Tipografia

**Bitter** (títulos) + **Manrope** (corpo/UI) — mesmo pareamento e raciocínio
da spec do app §2 (slab-serif "etiqueta carimbada" vs. a Fraunces
caligráfica do Dindin; corpo geométrico-humanista vs. a Work Sans mais
arredondada do Dindin).

**Entrega:** usar `next/font/google` exatamente como o `layout.tsx` atual faz
pro Inter (`Bitter({ variable: "--font-bitter", subsets: ["latin"] })`,
`Manrope({ variable: "--font-manrope", subsets: ["latin"] })`) — isso
auto-hospeda em tempo de build (sem fetch em runtime, sem requisição de rede
no primeiro carregamento), então não há trade-off de offline/latência pra
pesar aqui do jeito que houve pra chamada dinâmica do pacote `google_fonts`
do app Flutter. Adicionar as duas variáveis à string `<html className>` ao
lado da existente, e mapear `--font-serif: var(--font-bitter)`,
`--font-sans: var(--font-manrope)` em `@theme inline` (remover o mapeamento
antigo `--font-sans: var(--font-inter)`, remover o import do `Inter`).

### Escala tipográfica específica da landing (independente da `TextTheme` mobile do app —
isto é uma página de marketing, permitido rodar maior que a escala do próprio app):

| Uso | Fonte | Peso | Tamanho (responsivo) |
|---|---|---|---|
| H1 (hero) | Bitter | 700 | `clamp(2.1rem, 4vw, 3.1rem)` / altura de linha 1.12 |
| H2 (seção) | Bitter | 700 | `2rem` / 1.2 |
| H3 (título de linha de prateleira, título de card de demo) | Bitter | 700 | `1.5rem` (linha) / `1.05rem` (card de demo) |
| Tag kicker | Manrope | 700 | `0.72rem`, maiúsculas, `letter-spacing: 0.09em` |
| Parágrafo de abertura | Manrope | 400 | `1.1rem` / 1.5, máx `46ch` |
| Corpo | Manrope | 400 | `1rem` / 1.5 |
| Rótulo de chip/tag | Manrope | 700 | `0.72–0.78rem` |
| Footer/legenda | Manrope | 400 | `0.85rem` |

Exibição do código de convite (§5.3, §5.4): Bitter 700,
`letter-spacing: 0.35em`, `font-variant-numeric: tabular-nums` — mesmo
raciocínio da spec do app (letras/dígitos misturados precisam de algarismos
tabulares pra que o letter-spacing fixo leia uniformemente).

---

## 4. Forma e motivo — a tag quadrada é a assinatura

Reaproveitando diretamente as decisões da spec do app §3, aplicadas à web:

- **Cards: `border-radius: 10px`.** Qualquer bloco de conteúdo com borda
  (painel visual do hero, visual da linha de prateleira, cards de demo,
  cards de download).
- **Tag/chip quadrado: `border-radius: 6px` — nunca uma pílula completa.**
  Aplica-se a todo chip de status, todo rótulo kicker ("01," "Como
  funciona," "Experimente"), todo badge de disponibilidade de plataforma na
  seção de download. Esta é a decisão de forma mais barata, de maior
  retorno e mais repetida na página — é o que faz a silhueta da página ler
  como "Domo" mesmo num screenshot borrado/reduzido, e é o oposto da regra
  "tudo é um estádio" do Dindin.
- **Botão CTA primário: manter a forma de pílula/estádio**
  (`border-radius: 999px`), igual ao CTA do Dindin. Deliberadamente *não*
  quadrado — isso espelha o próprio raciocínio da spec do app (botões são
  grandes, de baixa frequência, já diferenciados por cor; quadrar o chip
  pequeno de alta frequência em vez de tudo) e mantém uma convenção
  compartilhada entre a família Café Labs (o botão CTA primário deles parece
  um botão) enquanto a forma de tag pequena repetida é o que realmente
  diverge.
- **Divisores de prateleira com linha fina** (token `border`, 1px) entre
  cada seção principal — o único fio visual conectivo pela página abaixo,
  substituindo a "borda da prateleira" sem precisar de uma ilustração
  desenhada à mão.
- **Elevação:** cards usam uma borda de linha fina **e** uma sombra suave
  juntas (`0 1px 2px rgba(ink,.05), 0 4px 14px rgba(ink,.06)`), mesmo
  raciocínio "descansando numa prateleira" da spec do app §3 (só borda lê
  plano/genérico, só sombra lê "flutuante," os dois juntos lê como um objeto
  pousado em algo).

---

## 5. Estrutura do site — seções, propósito, estados

### 5.1 Header

- Logo (`domo-logo.svg`, já atualizado — reaproveitar como está) + wordmark
  "Domo," à esquerda. Link de texto "por Café Labs," à direita — mantido da
  implementação atual (convenção da casa, não um visual específico do
  Dindin).
- **Estados:** nenhum além de default/hover/focus-visible no link. Sem
  auth, sem menu — esta é uma página estática única.

### 5.2 Hero

- **Propósito:** dizer o que o Domo é, nas próprias palavras do produto, e
  mostrar — não só contar — o sistema de status ternário nos primeiros
  cinco segundos.
- **Layout:** duas colunas a partir de ≥900px (divisão `1.05fr 0.95fr`);
  empilha texto primeiro, visual depois em viewports mais estreitos (o texto
  fica primeiro na ordem do DOM independente da viewport, então a ordem de
  leitura nunca depende de `order`/posicionamento de grid do CSS — leitores
  de tela recebem a mesma sequência em qualquer largura).
- **Coluna esquerda:** tag kicker quadrada ("Gestão doméstica
  compartilhada") → H1 ("A casa inteira sabe o que tem no armário.") →
  parágrafo de abertura (nomeia os três status, e a dor de "sem grupo de
  chat/planilha") → CTA primário ("Abrir Domo na web," pílula, preenchimento
  `primary`) + link âncora discreto pra seção "como funciona" ("veja como
  funciona ↓").
- **Coluna direita ("painel de prateleira"):** um card, `aria-hidden="true"`
  (seu conteúdo é uma preview decorativa-mas-precisa; a mesma informação — os
  três nomes de status — já é dita no parágrafo de abertura adjacente,
  então escondê-la de tecnologia assistiva evita anúncio redundante em vez
  de perder informação). Três linhas de dispensa (Leite/Tem, Café/Em falta,
  Detergente/No carrinho) usando os chips de status quadrados reais, mais
  uma pequena fileira de avatares sobrepostos (3 círculos, cores de membro
  #1–#3, iniciais brancas, contraste ≥5:1 per §2) legendada "Compartilhado
  com a casa" — o sinal de coletividade que o briefing do produto vive
  pedindo, mostrado em vez de afirmado.
- **Estados:** conteúdo estático, sem loading/erro (sem busca de dados
  nesta seção). Responsivo: a largura do painel visual do hero tem teto na
  própria coluna; no mobile ele fica abaixo do CTA em largura total da
  coluna, sem mudança interna.

### 5.3 "Como funciona" — três linhas de prateleira alternadas

- **Propósito:** explicar o fluxo real do produto na ordem real, substituindo
  a antiga grade simétrica de 4 cards de feature (que listava "sempre
  sincronizado" como um 4º item de peso igual — cortado aqui: sincronização
  é uma propriedade de implementação, não algo que precisa ser vendido como
  feature de destaque pra um visitante de primeira vez).
- **Linha 01 — Dispensa por status.** Tag numerada → título → texto.
  Visual: uma pequena sequência de chips `Tem → Em falta → No carrinho` com
  setas, num card com borda — o modelo ternário mostrado como ele mesmo, sem
  iconografia inventada.
- **Linha 02 — Lista de compras automática** (invertida: texto à direita,
  visual à esquerda). Visual: 3 linhas de uma mini "lista de compras" (nome
  + chip de status), o mesmo componente de linha exato que a demo e o
  próprio app usam.
- **Linha 03 — Casa em grupo.** Visual: o código de convite de 6 caracteres
  mostrado como uma única tag grande de algarismo tabular (`K3F9QZ`) no tom
  `primary-container` — o único momento "numérico de destaque" da página,
  batendo com o próprio tratamento do código de convite na spec do app
  (nota de §4.6/§2 sobre algarismos tabulares).
- **Estados:** estático; o visual de cada linha é só ilustrativo (não
  interativo) — interatividade vive na demo de §6, então esta seção fica
  barata de construir (sem gerenciamento de estado) enquanto ainda é
  concreta em vez de abstrata.
- **Responsivo:** linhas colapsam pra uma única coluna abaixo de 900px, em
  ordem natural do DOM (tag numerada → título → texto → visual), linhas
  "invertidas" perdem sua troca de lado visual esquerda/direita (reset do
  `order` do CSS) já que não sobra "lado" pra alternar numa coluna única.

### 5.4 Demo interativa — "Mexa na prateleira"

Ver §6 pra spec completa de interação/acessibilidade. Propósito: deixar um
visitante *fazer* a única coisa que define o Domo (mudar o status de um
item, ver a lista de compras se escrever sozinha) em vez de ler sobre isso.

### 5.5 "Baixe o Domo"

- As mesmas três plataformas de hoje (Web disponível agora / Windows,
  Android "em breve"), reestilizadas: tag quadrada de disponibilidade em
  vez do badge de pílula completa "Disponível agora" do Dindin, e uma
  pequena marca vertical em "cordão de etiqueta" (uma barra de 2×14px)
  acima do rótulo de cada card, ecoando uma etiqueta amarrada no gargalo de
  um pote — uma div de 2px puramente decorativa (`aria-hidden`) e barata,
  não um asset de ilustração novo.
- **Estados:** os dois cards "em breve" são não-interativos (sem `href`,
  tratamento visual equivalente a `disabled`: opacidade reduzida + tag
  cinza neutra em vez da tag "disponível" colorida) — mesmo padrão honesto
  de hoje, só reestilizado. Não é um link quebrado/morto; markup
  genuinamente inerte.

### 5.6 Footer

- Mantido estruturalmente idêntico a hoje (linha de marca à esquerda,
  GitHub + e-mail à direita) — esta é convenção de footer da casa Café
  Labs, compartilhada de propósito, não um visual específico do Dindin.
  Só recolorir/refontar.

---

## 6. Spec da demo interativa — "Mexa na prateleira"

**Recomendação: construir.** Custa menos que a `CaixinhasDemo` do Dindin
(sem formulários, sem parsing/validação numérica, sem trocador multi-modo —
ver o componente abaixo), e demonstra a mecânica exata que faz o Domo valer
a pena usar (a lista de compras *não* ser uma segunda coisa pra manter) de
forma mais convincente do que um parágrafo de texto conseguiria. Se o
orquestrador quiser cortar escopo, isto é a coisa mais defensável de manter,
e o texto da grade de features é o que cortar em vez disso — a demo *é* o
pitch.

### O que ela mostra

Uma **lista de dispensa** (5 itens semeados: Leite/Tem, Café/Em falta,
Detergente/No carrinho, Papel toalha/Em falta, Arroz/Tem — semeada
**não-vazia e já misturada**, diferente da demo do Dindin que começa num
saldo zero e exige uma ação antes de qualquer coisa interessante ficar
visível) ao lado de um **painel "Lista de compras"** que é *só* uma view
computada da lista de dispensa (todo item cujo status não é "Tem"). Clicar
no chip de status de um item cicla `Tem → Em falta → No carrinho → Tem`; o
painel de lista de compras rerenderiza imediatamente a partir dos mesmos
dados, sem uma ação separada de "adicionar à lista" — porque não existe uma
no produto real tampouco.

### Por que este modelo de interação, não o do Dindin

- **Manipulação direta, não um formulário.** A demo do Dindin precisa de
  abas de troca de modo + inputs numéricos + um botão de submit porque uma
  transação financeira tem uma direção, um valor e (pra transferências)
  dois pontos de destino. O status de um item de dispensa é um toggle único
  de três vias — modelá-lo como algo mais que "toque pra ciclar" seria
  inventar complexidade que a interação real não tem. Tocar um chip **é** o
  gesto central do app real (o app atual hoje alcança isso via uma folha de
  edição, não um toque único — sinalizar isso explicitamente pra
  `frontend-web` e no próprio texto de dica da demo, "toque pra simular,"
  pra que a simplificação leia como um atalho intencional de demo, não uma
  afirmação sobre o alvo de toque exato do app real).
- **Sem estados de erro necessários, por construção — não porque foram
  pulados.** Ciclar por 3 estados fixos não pode produzir um input
  inválido, então não há texto de validação pra escrever, diferente das
  mensagens de saldo insuficiente/`"Informe um valor maior que zero"` do
  Dindin. Isto é *prevenção* de erro via o próprio modelo de interação (um
  ganho heurístico, não um corte de canto).
- **Chips quadrados como botões**, não o trocador de modo em pílula do
  Dindin — mesma assinatura de forma do resto da página (§4).
- **Semeada não-vazia**, então o retorno (uma lista de compras
  auto-populada) fica visível ao carregar, antes de qualquer interação —
  reconhecimento em vez de recordação; um visitante de primeira vez não
  deveria ter que descobrir que precisa "adicionar saldo" primeiro pra ver
  o ponto, do jeito que a demo semeada em zero do Dindin exige.

### Acessibilidade

- Todo chip é um `<button>` real com um nome acessível que declara o status
  atual e a ação (`"Leite: Tem. Toque para alternar."`), não um `<span>`
  colorido nu.
- Uma região `aria-live="polite"` (visualmente escondida, mesmo padrão do
  `liveMessage` do Dindin) anuncia cada mudança ("Leite marcado como Em
  falta.") pra que um usuário de leitor de tela receba o mesmo retorno que
  um usuário vidente recebe da atualização do painel de lista.
- Alvo mínimo de toque: chips têm ≥32px de altura com padding horizontal
  generoso; aumentar pra uma área de toque `min-height: 44px` via padding
  se os tokens de espaçamento da `frontend-web` deixarem isso de graça (a
  altura visual de 32px do mockup está boa visualmente, mas o *alvo de
  toque*, não só o chip visível, deveria passar de 44px — preencher a área
  de toque do botão com padding/margem negativa invisível se necessário em
  vez de encolher as linhas ao redor pra caber um chip visual mais alto).
- Disclaimer explícito "prévia local, os valores não são salvos" — mesma
  convenção honesta do Dindin, mantida por ser boa prática, não um visual.
- `prefers-reduced-motion`: qualquer transição na cor/rótulo do chip ao
  mudar é um fade simples de opacidade/cor (~150ms), controlado do mesmo
  jeito que as animações `value-pulse`/`delta-pill` do Dindin — pular a
  transição inteiramente sob movimento reduzido, não só encurtá-la.
- **Botão de reset** restaura o estado semeado — mesma convenção do
  "Reiniciar demo" do Dindin.

### Explicitamente fora de escopo pra esta demo

- Sem interação de código de convite (digitar/validar um código de 6
  caracteres não é uma interação inerentemente interessante — a linha 03 de
  §5.3 já mostra o conceito de código como um visual estático; adicionar um
  segundo widget interativo aqui seria complexidade sem retorno).
- Sem interação de avatar de membro (a fileira de avatares do hero já carrega
  esse sinal; sem necessidade de duplicá-lo como um elemento interativo).

---

## 7. Breakpoints responsivos e resumo de estados

- **Breakpoint:** ponto de colapso único em `900px` (bate com o mockup) —
  abaixo dele, as grades de hero/como-funciona/demo/download vão todas pra
  uma coluna única. Nenhum layout intermediário específico de tablet foi
  desenhado; se a config Tailwind existente da `frontend-web` usa
  breakpoints `sm/md/lg` em vez disso, `900px` fica entre o `md` padrão do
  Tailwind (768px) e o `lg` (1024px) — escolher o que estiver mais perto da
  convenção existente do projeto em vez de introduzir um valor de breakpoint
  sob medida, este não é um número que sustenta nada crítico.
- **Loading:** nenhum — esta é uma página estática de marketing sem busca
  de dados; o único "estado" é o estado de toggle client-side da demo, que
  começa semeado (§6), não vazio/carregando.
- **Erro:** nenhum aplicável — sem formulários, sem chamadas de rede
  desta página.
- **Vazio:** o painel de lista de compras da demo *tem* um estado vazio
  real (`"Nada em falta — a lista está vazia."`) alcançável ciclando todo
  item pra "Tem" — especificar este texto explicitamente pra que a
  `frontend-web` não deixe um painel em branco quando um visitante chegar
  lá.
- **Restrito por permissão:** nenhum — sem auth nesta página.
- **Modo escuro:** dirigido por `prefers-color-scheme`, mesmo mecanismo já
  em vigor; verificado via screenshot renderizado (ver §8) que hero, chips e
  tags mantêm contraste correto em ambos os modos usando as tabelas de
  token de §2.
- **Movimento reduzido:** respeitado em todo lugar onde existe uma
  transição (§6); esta página não tem nenhum outro movimento pra controlar
  (sem animação disparada por scroll, sem carrossel com autoplay).

---

## 8. O que eu de fato fiz

- Escrevi esta spec em `/home/felip/projetos/domo-landing/docs/DESIGN.md`.
- **Não toquei** em nada sob `src/` — só spec, per o limite de propriedade
  de arquivos da tarefa.
- Construí um mockup estático HTML/CSS/JS (não a implementação Next.js, uma
  referência independente) implementando a página completa — hero, linhas
  alternadas de "como funciona," a demo interativa funcionando (ciclo real
  por clique + lista derivada atualizando ao vivo + anúncio `aria-live`), e
  as seções de download/footer — e renderizei via Chrome headless (desktop
  1400px, mobile 390px) e Playwright (emulação de `colorScheme` modo escuro,
  mais um clique roteirizado na demo pra confirmar que a região ao vivo e a
  lista derivada de fato atualizam) antes de finalizar esta spec, em vez de
  raciocinar sobre o CSS só a partir do markup. Todas as renderizações
  voltaram limpas: sem clipping, sem surpresas de contraste, linhas
  alternadas perdem corretamente a inversão de lado no mobile, o modo
  escuro mantém o contraste de token de §2.
  - Arquivo do mockup: `/tmp/claude-1000/-home-felip-projetos-mind/2f872951-32f1-43be-b9f4-37a904c0570d/scratchpad/domo-mockup/index.html`
  - Publicado como um artifact: https://claude.ai/code/artifact/76ac7da6-cced-48b8-877e-3d0e9743906a
  - **Ressalva de tipografia específica do mockup:** este sandbox não tem
    Bitter/Manrope instaladas localmente, então o mockup substitui por
    DejaVu Serif/DejaVu Sans (ambas disponíveis localmente) puramente pra
    verificar composição, ritmo e contraste renderizando. Isto **não** é
    uma referência de fidelidade tipográfica — a `frontend-web` deveria
    carregar a Bitter/Manrope reais via `next/font/google` per §3, não
    igualar as fontes de fallback do mockup.

## Perguntas em aberto / sinalizações pro orquestrador

1. **Custo vs. valor de construir a demo** (§6): recomendando que seja
   construída — genuinamente mais barata que a demo do Dindin (sem
   formulários/validação) e um pitch mais forte que texto estático — mas
   sinalizando que se o escopo precisar encolher, isto é o que manter, e os
   *visuais* da seção "como funciona" (não seu texto/estrutura) são o que
   simplificar primeiro (ex.: descartar os gráficos mini de
   sequência-de-chip/preview-de-lista, manter as linhas de texto numeradas).
2. **Alvo de toque nos chips da demo** (§6, acessibilidade): a altura
   *visual* do chip (32px) está abaixo da orientação mínima de alvo de
   toque de 44px; a spec exige preencher a área de toque até 44px sem
   crescer o chip visual — sinalizando pra que isso não seja lançado
   silenciosamente em 32px de qualquer jeito.
3. **Breakpoint de 900px** (§7): não é um valor da config Tailwind existente
   do projeto (que não precisei abrir — nenhuma customização de
   `tailwind.config` existe além de `@theme inline` em `globals.css`,
   confirmado lendo o `globals.css` atual); a `frontend-web` deveria
   reconciliar isso com qualquer convenção de breakpoint que usaria por
   padrão em vez de tratar `900px` como um requisito rígido.
4. **Conteúdo cortado da landing antiga:** descartei "Sempre sincronizado"
   como uma 4ª feature de destaque (§5.3) — sincronização em tempo real é
   uma propriedade de implementação, não algo que um visitante de primeira
   vez avalia o produto por; se houver uma razão pra manter isso visível
   (ex.: uma preocupação de suporte/FAQ sobre comportamento offline), pode
   ser dobrado em texto de corpo em vez de restaurado como item de
   destaque.
