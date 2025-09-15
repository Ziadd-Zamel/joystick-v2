"use server";

import { getLocale, getTranslations } from "next-intl/server";
import { getToken } from "../utils/server-cookies";

export const getAllProducts = async () => {
  const t = await getTranslations();
  const lang = await getLocale();
  const token = await getToken();

  const response = await fetch(`${process.env.API}products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      lang,
    },
  });

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-data"));
  }

  const data = await response.json();
  return data.data.data;
};
