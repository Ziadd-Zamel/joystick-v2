import { getLocale, getTranslations } from "next-intl/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Get All Advantages
export const getAdvantages = async () => {
  const t = await getTranslations();
  const lang = await getLocale();

  const res = await fetch(`${apiUrl}allAdvantages`, { headers: { lang } });

  if (!res.ok) throw new Error(t("failed-to-fetch-data"));
  const data = await res.json();

  return Array.isArray(data?.data?.data) ? data.data.data : [];
};

// Get Advantages Text
export const getAdvantageText = async () => {
  const t = await getTranslations();
  const lang = await getLocale();

  const res = await fetch(`${apiUrl}about-us/section-two`, {
    headers: { lang },
  });

  if (!res.ok) throw new Error(t("failed-to-fetch-data"));
  const data = await res.json();

  return data?.data || {};
};

// Get Home
export const getHome = async () => {
  const t = await getTranslations();
  const lang = await getLocale();

  const response = await fetch(`${apiUrl}HomePage`, { headers: { lang } });

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-data"));
  }

  const data = await response.json();

  return data;
};
