"use server";

import { getLocale, getTranslations } from "next-intl/server";
import { getToken } from "../utils/server-cookies";

export type Product = {
  id: number;
  name: string;
  description: string;
  small_description: string;
  price: string;
  quantity: string;
  status: string;
  category: string;
  brand: string;
  product_code: string;
  tags: string[];
  main_image: string;
  images: string[];
  product_colors: {
    color: string; // HEX color code
    quantity: number;
  }[];
  is_favorite: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type ProductsResponse = {
  success: boolean;
  message: string;
  data: {
    data: Product[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
};

export const getAllProducts = async ({ pageParam = 0 }) => {
  const t = await getTranslations();
  const lang = await getLocale();
  const token = await getToken();

  try {
    const response = await fetch(`${process.env.API}products?limit=10&page=${pageParam}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang,
      },
    });

    if (!response.ok) {
      throw new Error(t("failed-to-fetch-data"));
    }

    const payload = await response.json();
    return payload as ProductsResponse;
  } catch (err) {
    throw err;
  }
};
