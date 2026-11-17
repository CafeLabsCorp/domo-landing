// Publication gate for the Domo legal documents (/privacidade, /termos).
//
// The texts (domo/legal/*.md, v0.2) were reviewed and approved by a lawyer on
// 2026-11-16. Everything that makes them read as finished text is driven from
// this single flag:
//
//   - LEGAL_DOCS_APPROVED === false  →  both pages show a "MINUTA" banner as
//     their first content and send `noindex, nofollow`; the sitemap leaves
//     them out.
//   - LEGAL_DOCS_APPROVED === true   →  no banner, pages are indexable.
//
// The flag cannot be flipped while PUBLICATION_BLOCKERS has entries: the
// assertion at the bottom throws at module evaluation, which fails
// `next build`. Remove an entry only when the question is actually answered.
export const LEGAL_DOCS_APPROVED: boolean = true;

export const LEGAL_DOCS_VERSION = "0.2";
export const LEGAL_DOCS_DATE = "13 de novembro de 2026";
export const LEGAL_DOCS_DATE_EN = "November 13, 2026";

export const PUBLICATION_BLOCKERS: string[] = [];

if (LEGAL_DOCS_APPROVED && PUBLICATION_BLOCKERS.length > 0) {
  throw new Error(
    "LEGAL_DOCS_APPROVED foi marcado como true, mas ainda há pendências " +
      "abertas em PUBLICATION_BLOCKERS:\n" +
      PUBLICATION_BLOCKERS.map((item) => `  - ${item}`).join("\n") +
      "\nResolva as pendências (e remova-as da lista) antes de publicar.",
  );
}
