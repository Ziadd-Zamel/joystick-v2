"use server";

import { ContactFields } from "../schemas/contact.schema";

export async function submitContactForm(data: ContactFields) {
  try {
    const response = await fetch(`${process.env.API}contact-us/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit contact form");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to submit contact form");
    }

    return result;
  } catch (error) {
    console.error("Contact form error:", error);
    throw error;
  }
}
