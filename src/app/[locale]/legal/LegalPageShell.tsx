import Image from "next/image";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeToggle } from "../ThemeToggle";
import { SiteFooter } from "../SiteFooter";

// Shared chrome for the text pages that hang off the landing (/privacidade,
// /termos, /excluir-conta): same visual language as the home page, narrower
// column, since these are read, not scanned. `notices` renders above the H1.
export async function LegalPageShell({
  title,
  subtitle,
  notices,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  notices?: ReactNode;
  children: ReactNode;
}) {
  const tLegal = await getTranslations("Legal");

  return (
    <>
      <header className="h-16 w-full border-b border-border">
        <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Image src="/domo-logo.svg" alt="" width={32} height={16} className="dark:hidden" aria-hidden />
            <Image src="/domo-logo-dark.svg" alt="" width={32} height={16} className="hidden dark:block" aria-hidden />
            <span className="font-serif text-lg font-bold text-foreground">Domo</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-subtle transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {tLegal("backHome")}
            </Link>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-12">
          {notices}

          <h1 className="font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-sm leading-relaxed text-subtle">{subtitle}</p>}

          <article className="legal-doc">{children}</article>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
