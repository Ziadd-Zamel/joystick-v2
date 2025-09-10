import { getLocale } from "next-intl/server";
import { getToken } from "../utils/server-cookies";

export async function getAllCart() {
  const token = await getToken(); //get token from cookies

  const lang = await getLocale(); //get locale

  const response = await fetch(`${process.env.API}carts?page=1&limit=100`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      lang,
    },
    next: {
      tags: ["cart"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  return response.json();
}
