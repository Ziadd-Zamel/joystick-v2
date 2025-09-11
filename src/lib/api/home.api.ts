import { getLocale, getTranslations } from "next-intl/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Get Home
export const getHeroImage = async () => {
  const t = await getTranslations();
  const lang = await getLocale();

  const response = await fetch(`${apiUrl}homepage-banner`, { headers: { lang } });

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-data"));
  }

  const data = await response.json();

  return data.data;
};

// Get Home
export const getHomeSlides = async () => {
  const t = await getTranslations();

  const response = await fetch(`${apiUrl}slider-homepage`);

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-data"));
  }

  const data = await response.json();

  return data.data.data;
};
