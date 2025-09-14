import { getLocale, getTranslations } from "next-intl/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const truncatedText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const getLocaleAssets = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const direction: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";

  return { t, locale, direction };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
