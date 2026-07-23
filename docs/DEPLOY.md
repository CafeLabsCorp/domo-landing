**[Leia em Português](DEPLOY.pt-br.md)**

# Deploy — domo-landing

## Where it runs

- **Hosting:** Vercel.
- **Domain:** [`domo.cafelabs.net`](https://domo.cafelabs.net) (a bare Café
  Labs subdomain, dedicated to the landing — the real app lives at
  `app.domo.cafelabs.net`, hosted separately on Firebase Hosting; see
  `domo/docs/DEPLOY.md` in the app's repo).
- **Remote repository:** [`CafeLabsCorp/domo-landing`](https://github.com/CafeLabsCorp/domo-landing)
  (Café Labs organization, not a personal account).

## Pipeline

There's no CI/CD workflow in this repository — no `.github/workflows`
folder, no `vercel.json`. Deploy works through the native Git-Vercel
integration: every push to `main` on GitHub triggers an automatic build and
deploy on Vercel (the integration's default behavior, not a hand-configured
pipeline in this repo).

`TODO: confirm` — the exact Vercel project settings (production branch,
preview deployments on PRs, environment variables if any) aren't verifiable
from this repository's code; check the Vercel dashboard directly if you
need to change anything.

## Environments

A single production environment (`domo.cafelabs.net`, `main` branch). The
project doesn't use feature branches or PRs as its default workflow (work
is done directly on `main`), so there's no distinct staging environment in
use — Vercel may generate automatic preview deployments per branch/PR (the
platform's default), but that isn't used as part of this project's
workflow.

## Domain/DNS

`domo.cafelabs.net`'s DNS points to Vercel and is confirmed live (recorded
in the maintainer's personal vault, `mind/cafelabs/sites.md` — outside this
repo). No DNS configuration is versioned here; it's managed directly at the
DNS provider + Vercel dashboard.

## Rollback

No automated rollback runbook (unlike the Domo app itself, which has a
gated `scripts/deploy.sh` — see `domo/docs/DEPLOY.md`). To revert a
problematic deploy:

1. `git revert` the problematic commit on `main` and push again (triggers a
   new automatic build/deploy); or
2. Manually promote a previous deploy to production directly on the Vercel
   dashboard (instant rollback, no new build needed).

`TODO: confirm` — whether there's a recorded preference for either option;
there's no history of a rollback ever being needed on this project.

## Environment variables / secrets

None. The project has no backend, API keys, or external integration — the
only outbound link (`app.domo.cafelabs.net`) is a fixed URL hardcoded in
`src/app/[locale]/page.tsx` (`WEB_APP_URL`), not an environment variable.
