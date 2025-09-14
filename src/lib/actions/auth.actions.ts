"use server";

import {
  ForgotPasswordFields,
  LoginFields,
  NewPasswordFields,
  RegisterFields,
} from "../schemas/auth.schema";

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
    console.log(data);
    console.log(result);

    return { success: true, data: result };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };
  }
}
interface LoginResponse {
  data: User;
  message: string;
  success: boolean;
}
export async function loginUser(data: LoginFields) {
  try {
    const response = await fetch(`${process.env.API}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const result: LoginResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function forgotPasswordUser(data: ForgotPasswordFields) {
  try {
    const response = await fetch(`${process.env.API}user/send-otp-forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "OTP sending failed");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "OTP sending failed");
    }

    return result;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
}

import { OtpFields } from "@/lib/schemas/auth.schema";

export async function verifyOtpUser(data: OtpFields) {
  try {
    const response = await fetch(`${process.env.API}user/verify-otp-phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
        otp: data.otp,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "OTP verification failed");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "OTP verification failed");
    }

    return result;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
}

export async function confirmNewPassword(data: NewPasswordFields) {
  try {
    const response = await fetch(`${process.env.API}user/confirm-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Password reset failed");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Password reset failed");
    }

    return result;
  } catch (error) {
    console.error("Confirm password error:", error);
    throw error;
  }
}
