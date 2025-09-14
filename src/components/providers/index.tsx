import NextAuthProvider from "./components/next-auth.provider";
import {
  Locale,
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
import ReactQueryProvider from "./components/react-query.provider";
import { getFormats } from "@/i18n/request";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Check, Info, X } from "lucide-react";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // Translation
  const messages = useMessages();
  const locale = useLocale() as Locale;
  const timezone = useTimeZone();
  const now = useNow();

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="general"
      value={{
        general: "general",
        genz: "genz",
      }}
    >
      <ReactQueryProvider>
        <NextAuthProvider>
          <NextIntlClientProvider
            messages={messages}
            locale={locale}
            timeZone={timezone}
            now={now}
            formats={getFormats(locale)}
          >
            {children}
            <Toaster
              toastOptions={{
                closeButton: true,
                className: " !shadow-lg  !gap-[10px] !py-4 ",
                classNames: {
                  success: "!bg-emerald-50/50 !text-emerald-900 !border-emerald-700  ",
                  error: "!bg-red-50/50  !text-red-900 !border-red-700  ",
                  info: "!bg-zinc-50/50 !text-zinc-900 !border-zinc-400 ",
                  closeButton:
                    "!bg-transparent !text-zinc-500 !border-none   [&_svg]:!size-4 !right-0 !left-auto !top-4",
                },
              }}
              icons={{
                success: <Check size="18" />,
                error: <X size="18" />,
                info: <Info size="18" />,
              }}
            />
          </NextIntlClientProvider>
        </NextAuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
