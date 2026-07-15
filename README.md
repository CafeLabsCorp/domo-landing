# domo-landing

Landing page de download do [Domo](https://github.com/CafeLabsDev/domo), app de
gestão doméstica em grupo da Café Labs. Site estático (Next.js), hospedado separado
do app real — identidade visual herdada do app (não a do portfólio nem a da Café
Labs institucional).

## Stack

Next.js (App Router) + Tailwind CSS v4, mesmo padrão do site institucional
(`cafelabs-portifolio`) e do [`dindin-landing`](https://github.com/CafeLabsDev/dindin-landing).

## Identidade visual

Paleta e logo copiados 1:1 do app Flutter (`domo/lib/core/theme/app_colors.dart` e
`domo/assets/icons/domo_icon.svg`), design system "Sage Home":

- Cor primária: verde sálvia `#4A7C59` no claro, `#87D7A2` no escuro (mesmos tons do
  `ColorScheme` do app).
- Tokens de superfície (fundo, bordas, texto) iguais aos do app, claro e escuro.

## Rodando localmente

```bash
npm install
npm run dev
```

## Deploy

Vercel, apontado pro domínio `domo.cafelabs.net` (subdomínio nu já liberado — o app
migrou pra `app.domo.cafelabs.net`). Deploy e repositório remoto ainda não
configurados.

## Status

- [x] Hero, features e seção de downloads.
- [x] Botão "Web" ativo, linkando pro app (`app.domo.cafelabs.net`).
- [ ] Download Android — placeholder "em breve", depende de decidir onde hospedar o
      `.apk` de release.
