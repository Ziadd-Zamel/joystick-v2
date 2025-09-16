"use server";
import { getLocale, getTranslations } from "next-intl/server";

export const getAllCategories = async () => {
  const t = await getTranslations();
  const lang = await getLocale();

  const response = await fetch(`${process.env.API}categories`, {
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
