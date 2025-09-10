import { getLocale } from "next-intl/server";

export async function getProductById(id: string) {
  const lang = await getLocale();

  try {
    const response = await fetch(`${process.env.API}products/${id}`, {
      headers: {
        "Content-Type": "application/json",
        lang,
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
