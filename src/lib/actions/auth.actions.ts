"use server";

import { RegisterFields } from "../schemas/auth.schema";

export async function registerUser(data: RegisterFields) {
  try {
    const response = await fetch(`${process.env.API}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.name,
        password: data.password,
        phone: data.phone,
        governorate: data.governorate || "",
        city: data.city || "",
        password_confirmation: data.confirmPassword,
        apartment_number: data.apartment_number,
        building_number: data.building_number,
        floor_number: data.floor_number,
        addresses: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };
  }
}
