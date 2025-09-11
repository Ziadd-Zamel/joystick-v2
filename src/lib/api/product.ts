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
