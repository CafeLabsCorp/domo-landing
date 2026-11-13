import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/site";
import { LegalPageShell } from "../legal/LegalPageShell";
import { DraftNotice } from "../legal/Notices";
import { LEGAL_CONTENT } from "../legal/content.generated";
import { LEGAL_DOCS_APPROVED } from "../legal/status";

// Text comes from domo/legal/*.md via scripts/gen-legal.py (Markdown → HTML,
// no wording changed). Both locales are the drafts' own PT / EN versions.
// noindex + draft banner while LEGAL_DOCS_APPROVED is false (../legal/status.ts).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}/${l}/privacidade`]),
  );

  return {
    title: t("privacyTitle"),
    description: t("privacyMetaDescription"),
    robots: { index: LEGAL_DOCS_APPROVED, follow: LEGAL_DOCS_APPROVED },
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacidade`,
      languages: { ...languages, "x-default": `${BASE_URL}/${routing.defaultLocale}/privacidade` },
    },
    openGraph: {
      title: t("privacyTitle"),
      description: t("privacyMetaDescription"),
      url: `${BASE_URL}/${locale}/privacidade`,
      siteName: "Domo",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  const html = LEGAL_CONTENT.privacy[locale === "en" ? "en" : "pt"];

  return (
    <LegalPageShell title={t("privacyTitle")} notices={<DraftNotice locale={locale} />}>
      <div lang={locale === "en" ? "en" : "pt-BR"} dangerouslySetInnerHTML={{ __html: html }} />
    </LegalPageShell>
  );
}
