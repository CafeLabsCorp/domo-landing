import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { BASE_URL } from "@/lib/site";
import { LegalPageShell } from "../legal/LegalPageShell";

// Public account-deletion page, required by Google Play for apps with accounts:
// loads without login, names app and developer, and gives a working way to
// request deletion (in-app and by email).
const PRIVACY_EMAIL = "privacidade@cafelabs.net";
const GENERAL_EMAIL = "contato@cafelabs.net";
const WEB_APP_URL = "https://app.domo.cafelabs.net";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DeleteAccount" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}/${l}/excluir-conta`]),
  );

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/excluir-conta`,
      languages: {
        ...languages,
        "x-default": `${BASE_URL}/${routing.defaultLocale}/excluir-conta`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: `${BASE_URL}/${locale}/excluir-conta`,
      siteName: "Domo",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("metaDescription"),
    },
  };
}

export default async function ExcluirContaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DeleteAccount" });

  const bold = (chunks: ReactNode) => <strong>{chunks}</strong>;

  const mailtoHref =
    `mailto:${PRIVACY_EMAIL}` +
    `?subject=${encodeURIComponent(t("emailSubject"))}` +
    `&body=${encodeURIComponent(t("emailBodyTemplate"))}`;

  const deletedItems = [
    t("deletedItem1"),
    t("deletedItem2"),
    t("deletedItem3"),
    t("deletedItem4"),
    t("deletedItem5"),
  ];

  return (
    <LegalPageShell title={t("title")}>
      {/* App + developer identification, exactly as on the Play Store listing.
          A dl rather than a paragraph so the pairing is explicit for a screen
          reader as well as visually. */}
      <dl className="mt-6 grid gap-3 rounded-[10px] border border-border bg-surface p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_14px_rgba(0,0,0,0.06)] sm:grid-cols-[auto_1fr] sm:gap-x-6 sm:p-5">
        <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">
          {t("appLabel")}
        </dt>
        <dd className="text-sm font-semibold text-foreground">{t("appValue")}</dd>
        <dt className="text-xs font-semibold uppercase tracking-wide text-subtle">
          {t("developerLabel")}
        </dt>
        <dd className="text-sm font-semibold text-foreground">
          {t("developerValue")}
        </dd>
      </dl>

      <p>{t.rich("intro", { b: bold })}</p>

      <h2>{t("warnTitle")}</h2>
      <p>{t.rich("warnBody", { b: bold })}</p>

      <h2>{t("inAppTitle")}</h2>
      <ol>
        <li>
          {t.rich("inAppStep1", {
            app: (chunks) => (
              <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer">
                {chunks}
              </a>
            ),
          })}
        </li>
        <li>{t.rich("inAppStep2", { b: bold })}</li>
        <li>{t.rich("inAppStep3", { b: bold })}</li>
        <li>{t("inAppStep4")}</li>
      </ol>
      <p>{t("inAppFallback")}</p>

      <h2>{t("emailTitle")}</h2>
      <p>
        {t.rich("emailBody", {
          mail: (chunks) => <a href={`mailto:${PRIVACY_EMAIL}`}>{chunks}</a>,
        })}
      </p>
      <p>
        <a
          href={mailtoHref}
          className="legal-cta mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 py-2 text-base font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          {t("emailCta")}
        </a>
      </p>
      <p>{t.rich("emailDeadline", { b: bold })}</p>
      <p>{t("emailIdentity")}</p>

      <h2>{t("deletedTitle")}</h2>
      <p>{t("deletedIntro")}</p>
      <ul>
        {deletedItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{t("deletedOutro")}</p>

      <h2>{t("retainedTitle")}</h2>
      <ul>
        <li>{t.rich("retainedItem1", { b: bold })}</li>
        <li>{t.rich("retainedItem2", { b: bold })}</li>
      </ul>
      <p>{t("retainedOutro")}</p>

      <h2>{t("contactTitle")}</h2>
      <p>
        {t.rich("contactBody", {
          privacy: (chunks) => <a href={`mailto:${PRIVACY_EMAIL}`}>{chunks}</a>,
          general: (chunks) => <a href={`mailto:${GENERAL_EMAIL}`}>{chunks}</a>,
        })}
      </p>
      <p>
        {t.rich("contactPolicy", {
          link: (chunks) => <Link href="/privacidade">{chunks}</Link>,
        })}
      </p>
    </LegalPageShell>
  );
}
