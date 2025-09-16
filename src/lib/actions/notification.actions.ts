"use server";

import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export const getUserNotifications = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const locale = await getLocale();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(`${process.env.API}user/noifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || "Error fetching notifications");
    }

    return payload;
  } catch (err) {
    throw err;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  console.log("token", token);
  const locale = await getLocale();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(`${process.env.API}user/notifications/${notificationId}/read`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || "Error Marking notification as read");
    }

    return payload;
  } catch (err) {
    throw err;
  }
};
