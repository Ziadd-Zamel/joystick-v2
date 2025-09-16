"use server";

type RepairRequestData = {
  message: string;
  code: string;
  date: string; // "2025-09-14 15:30:41"
};

type CustomNotificationData = {
  title: string;
  body: string;
  product_id: number;
  image: string;
};

type BaseNotification<T extends string, D> = {
  id: string;
  type: T;
  data: D;
  read_at: string | null;
  created_at: string;
};

export type Notification =
  | BaseNotification<"RepairRequestNotification", RepairRequestData>
  | BaseNotification<"CustomNotification", CustomNotificationData>;

export type NotificationResponse = {
  success: boolean;
  message: string;
  data: {
    data: Notification[];
    unread_count: number;
    pagination: {
      page: number;
      total_pages: number;
      total_items: number;
      limit: number;
    };
  };
};

import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export const getUserNotifications = async ({ pageParam = 0 }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const locale = await getLocale();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(
      `${process.env.API}user/noifications?per_page=7&page=${pageParam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          lang: locale || "ar",
        },
      },
    );

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || "Error fetching notifications");
    }

    return payload as NotificationResponse;
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
