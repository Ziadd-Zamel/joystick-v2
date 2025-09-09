"use server";

import { cookies } from "next/headers";
import { ProfileEmailFormValues, ProfilePasswordFormValues } from "../schemas/profile.schema";
import { revalidatePath } from "next/cache";

export const getUserDetails = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const res = await fetch(`${process.env.API}user/get-details`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await res.json();

  return payload.data;
};

export const updateUserEmail = async (values: ProfileEmailFormValues) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  try {
    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch(`${process.env.API}user/update-user-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const payload = await res.json();

    if (!res.ok) {
      throw new Error(payload?.message || "حدث خطأ أثناء إرسال OTP");
    }

    return payload;
  } catch (error) {
    console.error("Error sending OTP:", (error as Error).message);
    throw error;
  }
};

export const updateUserPassword = async (values: ProfilePasswordFormValues) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  try {
    if (!token) {
      throw new Error("User not authenticated");
    }

    const res = await fetch(`${process.env.API}user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: values.oldPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmNewPassword,
      }),
    });

    const payload = await res.json();

    if (!res.ok) {
      throw new Error(payload.message || "حدث خطأ أثناء تغيير كلمة المرور");
    }

    return payload;
  } catch (error) {
    console.error("Error Changing password", (error as Error).message);
    throw error;
  }
};

export const updateProfile = async (username: string | undefined) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  try {
    if (!token) {
      throw new Error("User not authenticated");
    }
    const formData = new FormData();
    formData.append("username", username!);

    const response = await fetch(`${process.env.API}user/update-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserPhone = async (phone: string | undefined) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  try {
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${process.env.API}user/update-user-phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phone }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "حدث خطأ أثناء إرسال OTP");
    }

    return responseData;
  } catch (error) {
    console.error("Error sending OTP:", (error as Error).message);
    throw error;
  }
};
