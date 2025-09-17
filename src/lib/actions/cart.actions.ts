"use server";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";
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

export async function addToCart(productId: number, selectedColor?: string, quantity: number = 1) {
  const token = await getToken();
  const t = await getTranslations();
  const locale = await getLocale();

  try {
    const response = await fetch(`${process.env.API}carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
        color: selectedColor,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.message || t("Failed-add"));
    }

    revalidateTag("cart");
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function decreaseQuantity(productId: string, cartId: string) {
  const token = await getToken();
  const t = await getTranslations("cart");
  const locale = await getLocale();

  try {
    const response = await fetch(`${process.env.API}carts/decreaseQuantity?cart_id=${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
      body: JSON.stringify({
        product_id: productId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.message || t("failed-to-decrease-quantity"));
    }

    revalidateTag("cart");
    revalidatePath("cart");
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function increaseQuantity(productId: string, cartId: string) {
  const token = await getToken();
  const t = await getTranslations();
  const locale = await getLocale();

  try {
    const response = await fetch(`${process.env.API}carts/increaseQuantity?cart_id=${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
      body: JSON.stringify({
        product_id: productId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.message || t("failed-to-increase-quantity"));
    }

    revalidateTag("cart");
    revalidatePath("cart");
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteFromCart(productId: string) {
  const token = await getToken();
  const t = await getTranslations();
  const locale = await getLocale();

  try {
    const response = await fetch(`${process.env.API}carts/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.message || t("failed-to-delete-from-cart"));
    }

    revalidateTag("cart");
    revalidatePath("cart");

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function toggleFavouriteProduct(productId: string | number) {
  const token = await getToken();
  const locale = await getLocale();
  const t = await getTranslations();

  if (!token) {
    throw new Error(t("unauthenticated-please-login-first"));
  }

  try {
    const res = await fetch(`${process.env.API}favorite/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to toggle favorite");
    }

    const payload = await res.json();
    revalidatePath("/");

    return payload;
  } catch (err) {
    throw err;
  }
}

export async function checkout(address_id: number, final_price: number, payment_method: string) {
  const token = await getToken();
  const t = await getTranslations();
  const locale = await getLocale();

  try {
    const response = await fetch(`${process.env.API}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
      body: JSON.stringify({
        address_id: address_id,
        final_price: final_price,
        payment_method: payment_method,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.message || t("failed-to-pay"));
    }

    revalidateTag("cart");
    revalidatePath("cart");
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
