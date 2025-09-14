"use server";
import { getLocale, getTranslations } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getToken } from "../utils/server-cookies";

export async function addToCart(productId: number, selectedColor?: string, quantity: number = 1) {
  const token = await getToken();
  const t = await getTranslations();

  if (!token) {
    return {
      status: false,
      message: t("unauthenticated-please-login-first"),
      data: null,
    };
  }

  try {
    const response = await fetch(`${process.env.API}carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    console.error("Error adding to cart:", error);
    return {
      status: false,
      message: error instanceof Error ? error.message : t("Failed-add"),
      data: null,
    };
  }
}

export async function decreaseQuantity(productId: string, cartId: string) {
  const token = await getToken();
  const t = await getTranslations();

  if (!token) {
    return {
      status: false,
      message: t("unauthenticated-please-login-first"),
      data: null,
    };
  }

  try {
    const response = await fetch(`${process.env.API}carts/decreaseQuantity?cart_id=${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: "ar",
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
    console.error("Error decreasing quantity:", error);
    return {
      status: false,
      message: error instanceof Error ? error.message : t("failed-to-decrease-quantity"),
      data: null,
    };
  }
}

export async function increaseQuantity(productId: string, cartId: string) {
  const token = await getToken();
  const t = await getTranslations();

  if (!token) {
    return {
      status: false,
      message: t("unauthenticated-please-login-first"),
      data: null,
    };
  }

  try {
    const response = await fetch(`${process.env.API}carts/increaseQuantity?cart_id=${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: "ar",
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
    console.error("Error increasing quantity:", error);
    return {
      status: false,
      message: error instanceof Error ? error.message : t("failed-to-increase-quantity"),
      data: null,
    };
  }
}

export async function deleteFromCart(productId: string) {
  const token = await getToken();
  const t = await getTranslations();

  if (!token) {
    return {
      status: false,
      message: t("unauthenticated-please-login-first"),
      data: null,
    };
  }

  try {
    const response = await fetch(`${process.env.API}carts/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: "ar",
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
    console.log("Item deleted from cart:", result);
    return result;
  } catch (error) {
    console.error("Error deleting from cart:", error);
    return {
      status: false,
      message: error instanceof Error ? error.message : t("failed-to-delete-from-cart"),
      data: null,
    };
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
