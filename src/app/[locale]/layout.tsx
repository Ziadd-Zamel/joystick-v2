import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import NotFound from "./not-found";
import { Tajawal, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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

  const font = locale === "ar" ? tajawal : montserrat;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={font.className}>
        <Providers>
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
