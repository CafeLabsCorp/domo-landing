# Deploy — domo-landing

## Onde roda

- **Hosting:** Vercel.
- **Domínio:** [`domo.cafelabs.net`](https://domo.cafelabs.net) (subdomínio
  nu da Café Labs, dedicado à landing — o app real vive em
  `app.domo.cafelabs.net`, hospedado à parte no Firebase Hosting; ver
  `domo/docs/DEPLOY.md` no repo do app).
- **Repositório remoto:** [`CafeLabsDev/domo-landing`](https://github.com/CafeLabsDev/domo-landing)
  (organização Café Labs, não conta pessoal).

## Pipeline

Não há workflow de CI/CD neste repositório — sem pasta `.github/workflows`,
sem `vercel.json`. O deploy funciona pela integração nativa Git-Vercel: todo
push pra `main` no GitHub aciona um build e deploy automático na Vercel
(comportamento padrão da integração, não uma pipeline configurada à mão
neste repo).

`TODO: confirmar` — settings exatos do projeto na Vercel (branch de produção,
preview deployments em PRs, variáveis de ambiente se houver) não são
verificáveis a partir do código deste repositório; conferir direto no
dashboard da Vercel se precisar alterar algo.

## Ambientes

Um único ambiente de produção (`domo.cafelabs.net`, branch `main`). O projeto
não usa branches de feature nem PRs como fluxo padrão (trabalho é feito
direto em `main`), então não há ambiente de staging distinto em uso — a
Vercel pode gerar preview deployments automáticos por branch/PR (padrão da
plataforma), mas isso não é usado como parte do fluxo de trabalho deste
projeto.

## Domínio/DNS

DNS de `domo.cafelabs.net` apontado pra Vercel e confirmado no ar (registro
em `mind/cafelabs/sites.md` do vault pessoal do mantenedor — fora deste
repo). Sem configuração de DNS versionada aqui; é gerenciada direto no
provedor de DNS + dashboard da Vercel.

## Rollback

Sem runbook de rollback automatizado (diferente do app Domo em si, que tem
`scripts/deploy.sh` com gate — ver `domo/docs/DEPLOY.md`). Pra reverter um
deploy problemático:

1. `git revert` do commit problemático em `main` e novo push (aciona um novo
   build/deploy automático); ou
2. Promover manualmente um deploy anterior pra produção direto no dashboard
   da Vercel (rollback instantâneo, sem precisar de novo build).

`TODO: confirmar` — se há preferência registrada por uma das duas opções;
não há histórico de um rollback já ter sido necessário neste projeto.

## Variáveis de ambiente / segredos

Nenhuma. O projeto não tem backend, API keys ou integração externa — o único
link para fora (`app.domo.cafelabs.net`) é uma URL fixa hardcoded em
`src/app/page.tsx` (`WEB_APP_URL`), não uma variável de ambiente.
