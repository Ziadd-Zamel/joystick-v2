"use server";

import { getAuthToken } from "@/lib/utils/get-auth-token";
import { getTranslations } from "next-intl/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getToken } from "../utils/server-cookies";

export async function addToCart(productId: number, selectedColor?: string, quantity: number = 1) {
  const token = await getToken();
  const t = await getTranslations();

  if (!token) {
    return { status: false, message: t("unauthenticated-please-login-first"), data: null };
  }

  const response = await fetch(`${process.env.API}carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId, quantity: quantity, color: selectedColor }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || t("Failed-add"));
  }

  revalidateTag("cart");
  const result = await response.json();
  return result;
}

export default async function removeItem(productId: number) {
  // Translation
  const token = await getAuthToken();
  const t = await getTranslations();

  // Variables
  const baseUrl = `${process.env.API}/client/removeProductFromCart`;

  if (!token) {
    return { status: false, message: t("unauthenticated-please-login-first"), data: null };
  }

  // Request options
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  };

  const response = await fetch(baseUrl, requestOptions);

  const data = await response.json();

  // Check if request is not ok, throw this
  if (!response.ok) {
    throw new Error(t("Failed-update-quantity"));
  }

  // Update the UI after delete
  revalidatePath("/cart");

  return data;
}

export async function addOfferToCart(offerId: number) {
  const token = await getAuthToken();
  const t = await getTranslations();

  if (!token) {
    return { status: false, message: t("unauthenticated-please-login-first"), data: null };
  }

  // Add authorization header to the FormData by creating a new request
  const response = await fetch(`${process.env.API}/client/addOfferToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ offerId }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.log("Result: ", result);
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add the product.");
  }

  // const result = await response.json();
  return result;
}
