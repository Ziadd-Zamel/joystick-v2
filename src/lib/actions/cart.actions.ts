"use server";

import { getAuthToken } from "@/lib/utils/get-auth-token";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: number) {
  const token = await getAuthToken();
  const t = await getTranslations();

  if (!token) {
    return { status: false, message: t("unauthenticated-please-login-first"), data: null };
  }

  // Add authorization header to the FormData by creating a new request
  const response = await fetch(`${process.env.API}/client/addProductToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6NSwiY2xpZW50RnVsbE5hbWUiOiJtb3N0YWZhIiwiY2xpZW50Q2l0eSI6ImNhaXJvIiwiaWF0IjoxNzUwNTE4NjcyLCJleHAiOjE3NTkwNzIyNzJ9.4j_oGZbBrqljKCxcoG6IJzPJxv9gcCiI7IpjyhMIQ3M`,
    },
    body: JSON.stringify({ productId }),
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
