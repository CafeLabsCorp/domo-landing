import { getTranslations } from "next-intl/server";
import {
  LEGAL_DOCS_APPROVED,
  LEGAL_DOCS_DATE,
  LEGAL_DOCS_DATE_EN,
  LEGAL_DOCS_VERSION,
} from "./status";

// Banner shown at the very top of /privacidade and /termos while the texts
// have not been through legal review. Rendered before the title on purpose:
// the first thing anyone reads has to be "this is a draft".
export async function DraftNotice({ locale }: { locale: string }) {
  if (LEGAL_DOCS_APPROVED) return null;

  const tLegal = await getTranslations("Legal");

  return (
    <div
      role="note"
      className="mb-8 rounded-[10px] border-2 border-tertiary bg-surface p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.06)] sm:p-5"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-tertiary">
        {tLegal("draftBadge")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">
        {tLegal("draftHeadline", { version: LEGAL_DOCS_VERSION, date: locale === "en" ? LEGAL_DOCS_DATE_EN : LEGAL_DOCS_DATE })}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{tLegal("draftBody")}</p>
    </div>
  );
}
