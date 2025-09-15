// app/[locale]/layout.tsx
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import NotFound from "./not-found";
import { Tajawal, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Types
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Arabic font configuration
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

// English font configuration
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "DEV JOY STICK",
  description: "Joy stick website",
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    return NotFound();
  }

  // Determine which font class to use as primary
  const primaryFontClass = locale === "ar" ? tajawal.className : montserrat.className;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${tajawal.variable} ${montserrat.variable} ${primaryFontClass}`}>
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
