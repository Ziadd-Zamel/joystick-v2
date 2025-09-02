import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import NotFound from "./not-found";
export const metadata = {
  title: "JOY STICK",
  description: "Joy stick website",
};
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return NotFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={``}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
