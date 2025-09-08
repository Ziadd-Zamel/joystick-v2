import { getLocale, getTranslations } from "next-intl/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const getAllProducts = async () => {
  const t = await getTranslations();
  const lang = await getLocale();

  const response = await fetch(`${apiUrl}products`, {
    headers: {
      "Content-Type": "application/json",
      lang,
    },
  });

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-data"));
  }

  const data = await response.json();
  return data.data.data;
};
