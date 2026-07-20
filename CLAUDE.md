@AGENTS.md

Comece por [`README.md`](README.md) e pelos docs em [`docs/`](docs/)
(`ARQUITETURA.md`, `DESIGN.md`, `DEPLOY.md`) — a explicação de o que é o
projeto, como funciona e como fazer deploy vive lá, não aqui.

Específico deste repo pra quem trabalha com um agente:

- `src/app/statuses.ts` é a fonte única do modelo de status ternário
  (Tem/Em falta/No carrinho) — reusado por `page.tsx`, `Tag.tsx` e
  `ArmarioDemo.tsx`. Ao mexer em rótulo, cor ou transição de status, editar
  ali, não duplicar em cada componente.
- A demo (`ArmarioDemo.tsx`) espelha deliberadamente as duas telas do app
  Flutter real (`dispensa_page.dart`/`mercado_page.dart`) com toggles
  independentes, não um ciclo único — ver `docs/ARQUITETURA.md` antes de
  "simplificar" isso de volta a um único `cycle`, foi corrigido de propósito
  no commit `80e1f0d`.
- Trabalho é feito direto na branch `main` (sem branch de feature/PR), por
  convenção do mantenedor — não abrir branch nova por padrão.
