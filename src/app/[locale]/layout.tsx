import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import NotFound from "./not-found";
import { Tajawal, Montserrat } from "next/font/google";

// Arabic font
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

// English font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "DEV JOY STICK",
  description: "Joy stick website",
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return NotFound();
  }

  // ✅ Choose font depending on locale
  const font = locale === "ar" ? tajawal : montserrat;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
