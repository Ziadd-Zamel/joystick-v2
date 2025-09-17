"use server";

import { getLocale, getTranslations } from "next-intl/server";

export const getAllCategories = async (limit = 10) => {
  const t = await getTranslations();
  const lang = await getLocale();

  const response = await fetch(`${process.env.API}categories?limit=${limit}`, {
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

export type Category = {
  id: number;
  name: string;
  tags: string[];
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type CategoryResponse = {
  success: boolean;
  message: string;
  data: {
    data: Category[];
    meta: PaginationMeta;
  };
};

export const getPaginatedCategories = async ({ pageParam = 0 }) => {
  const t = await getTranslations();
  const lang = await getLocale();

  const response = await fetch(`${process.env.API}categories?limit=8&page=${pageParam}`, {
    headers: {
      "Content-Type": "application/json",
      lang,
    },
  });

  if (!response.ok) {
    throw new Error(t("failed-to-fetch-data"));
  }

  const payload: CategoryResponse = await response.json();
  return payload;
};
