import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BASE_URL } from "@/lib/site";
import { LEGAL_DOCS_APPROVED } from "./[locale]/legal/status";

// /privacidade and /termos stay out while they are unreviewed drafts: those
// pages send `noindex`, and listing them here would be a contradictory signal.
const ROUTES = ["", "/excluir-conta", ...(LEGAL_DOCS_APPROVED ? ["/privacidade", "/termos"] : [])];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) =>
    routing.locales.map((locale) => {
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}${route}`]),
      );
      return {
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: { ...languages, "x-default": `${BASE_URL}/${routing.defaultLocale}${route}` },
        },
      };
    }),
  );
}
