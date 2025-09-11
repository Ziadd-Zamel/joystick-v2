"use server";

import { cookies } from "next/headers";
import { ProfileEmailFormValues, ProfilePasswordFormValues } from "../schemas/profile.schema";
import { UserAddressFormValues } from "@/app/[locale]/profile/added-locations/_components/add-new-address-dialog";
import { getLocale } from "next-intl/server";

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

export const fetchUserAddresses = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(`${process.env.API}user/get-details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized: Please log in again");
    }

    const data = await response.json();
    if (!data.success) throw new Error("Failed to fetch addresses");

    return data.data.addresses || [];
  } catch (err) {
    throw err;
  }
};

export const addNewAddress = async (values: UserAddressFormValues) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  try {
    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await fetch(`${process.env.API}addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        building_number: values.buildingNumber,
        apartment_number: values.apartmentNumber,
        floor_number: values.floorNumber,
        key: values.addressType,
        latitude: values.latitude,
        longitude: values.longitude,
        address: values.address,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add address");
    }

    const payload = await response.json();

    return payload;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (values: UserAddressFormValues, addressId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const res = await fetch(`${process.env.API}addresses-update/${addressId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        building_number: values.buildingNumber,
        apartment_number: values.apartmentNumber,
        floor_number: values.floorNumber,
        key: values.addressType,
        latitude: values.latitude,
        longitude: values.longitude,
        address: values.address,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error details:", errorData);
      throw new Error(errorData.message || "Failed to update address");
    }

    const payload = res.json();

    return payload;
  } catch (err) {
    throw err;
  }
};

export const deleteAddress = async (addressId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const res = await fetch(`${process.env.API}addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete address");
    }

    const payload = await res.json();

    return payload;
  } catch (err) {
    throw err;
  }
};

// Prev Orders
export const getPrevOrders = async (type: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const locale = await getLocale();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  // type == 'store' || 'repair'
  try {
    const res = await fetch(`${process.env.API}History/GetAll?type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get history");
    }

    const payload = await res.json();

    return payload;
  } catch (err) {
    throw err;
  }
};

// Favorites
export const getUserFavourites = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const locale = await getLocale();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const res = await fetch(`${process.env.API}products/favorited`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        lang: locale || "ar",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch favourites");
    }

    const payload = await res.json();

    return payload;
  } catch (error) {
    throw error;
  }
};
