import { getLocaleAssets } from "../utils/index";
import { getToken } from "../utils/server-cookies";

export async function getProductById(id: string) {
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
}

export async function getFilteredProduct({
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
}) {
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

    const response = await fetch(`${process.env.API}get/products/filter?${query.toString()}`, {
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
}
