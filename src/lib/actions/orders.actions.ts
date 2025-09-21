"use server";

import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

type OrderResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    order_number: string;
    user: string;
    address_id: {
      id: number;
      grand_address: string;
      address: string;
      governorate: string | null;
      city: string | null;
      user_id: number;
      is_main: number;
      area: string | null;
      apartment_number: string;
      building_number: string;
      floor_number: string;
      key: string;
      latitude: string;
      longitude: string;
      address_link: string;
      created_at: string;
      updated_at: string;
    };
    total: string;
    payment_method: "cashOnDelivery" | string; // extend if you have other methods
    status: "pending" | "Completed" | "cancelled" | string; // extend as needed
    created_at: string;
    updated_at: string;
    order_detalis: {
      id: number;
      order_id: string;
      product_name: string;
      quantity: string;
      price: string;
      total: number;
      created_at: string;
      updated_at: string;
    }[];
  };
};

export const getOrderById = async (id: string | number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const locale = await getLocale();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const res = await fetch(`${process.env.API}orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get Order Details");
    }

    const payload: OrderResponse = await res.json();

    return payload;
  } catch (err) {
    throw err;
  }
};
