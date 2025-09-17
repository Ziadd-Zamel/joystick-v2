"use server";

import { getLocale, getTranslations } from "next-intl/server";
import { getToken } from "../utils/server-cookies";
import { getLocaleAssets } from "../utils/index";

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

export const getAllProducts = async (limit = 10) => {
  const t = await getTranslations();
  const lang = await getLocale();
  const token = await getToken();

  try {
    const response = await fetch(`${process.env.API}products?limit=${limit}`, {
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

export const getPaginatedProducts = async ({ pageParam = 0 }) => {
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

export const getProductById = async (id: string) => {
  const token = await getToken();
  const { locale } = await getLocaleAssets();

  try {
    const response = await fetch(`${process.env.API}products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getFilteredProduct = async ({
  name,
  price_from,
  price_to,
  brand_id,
  category_id,
  tags,
  page,
  limit,
}: {
  name?: string;
  price_from?: string;
  price_to?: string;
  brand_id?: string;
  category_id?: string;
  tags?: number | string;
  page?: number;
  limit?: number;
}) => {
  const token = await getToken();
  const { locale } = await getLocaleAssets();

  try {
    const query = new URLSearchParams();

    if (name) query.append("name", name);
    if (price_from) query.append("price_from", String(price_from));
    if (price_to) query.append("price_to", String(price_to));
    if (brand_id) query.append("brand_id", String(brand_id));
    if (category_id) query.append("category_id", String(category_id));
    if (tags) query.append("tags", String(tags));
    if (page) query.append("page", String(page));
    if (limit) query.append("limit", String(limit));

    const response = await fetch(`${process.env.API}get/products/filter/?${query.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
