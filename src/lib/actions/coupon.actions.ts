"use server";
import { getLocale } from "next-intl/server";
import { getToken } from "../utils/server-cookies";

export interface ApplyCouponFields {
  code: string;
  total_price: number;
}

export interface CouponResponse {
  success: boolean;
  data?: {
    discount: number;
    message?: string;
  };
  message?: string;
}

export async function applyCoupon(data: ApplyCouponFields): Promise<CouponResponse> {
  const token = await getToken();
  const locale = await getLocale();
  try {
    const response = await fetch(`${process.env.API}coupons/apply-coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        lang: locale,
      },
      body: JSON.stringify({
        code: data.code,
        total_price: data.total_price,
      }),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }
    console.log(result);
    return result;
  } catch (error) {
    console.error("Apply coupon error:", error);
    throw error;
  }
}
