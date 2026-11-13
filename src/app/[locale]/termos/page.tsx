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
    routing.locales.map((l) => [l, `${BASE_URL}/${l}/termos`]),
  );

  return {
    title: t("termsTitle"),
    description: t("termsMetaDescription"),
    robots: { index: LEGAL_DOCS_APPROVED, follow: LEGAL_DOCS_APPROVED },
    alternates: {
      canonical: `${BASE_URL}/${locale}/termos`,
      languages: { ...languages, "x-default": `${BASE_URL}/${routing.defaultLocale}/termos` },
    },
    openGraph: {
      title: t("termsTitle"),
      description: t("termsMetaDescription"),
      url: `${BASE_URL}/${locale}/termos`,
      siteName: "Domo",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  const html = LEGAL_CONTENT.terms[locale === "en" ? "en" : "pt"];

  return (
    <LegalPageShell title={t("termsTitle")} notices={<DraftNotice locale={locale} />}>
      <div lang={locale === "en" ? "en" : "pt-BR"} dangerouslySetInnerHTML={{ __html: html }} />
    </LegalPageShell>
  );
}
