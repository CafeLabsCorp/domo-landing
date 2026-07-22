"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "pt" ? "en" : "pt";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      aria-label={t("switchLanguage")}
      className="rounded-[6px] border border-border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.04em] text-subtle transition-colors hover:border-primary hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {nextLocale}
    </button>
  );
}
