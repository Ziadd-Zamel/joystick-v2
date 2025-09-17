"use server";

import { getLocale } from "next-intl/server";

// Get about us first section data.
export async function fetchAboutJoyStick() {
  const locale = await getLocale();
  try {
    const response = await fetch(`${process.env.API}about-us/section-one`, {
      headers: {
        lang: locale,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`فشل في جلب بيانات من نحن ، حاول مرة اخرى`);
    }

    const data = await response.json();

    return data?.data;
  } catch (error) {
    throw error;
  }
}

// Get about us video
export async function getVideo() {
  const locale = await getLocale();

  try {
    const response = await fetch(`${process.env.API}about-us/video`, {
      headers: {
        lang: locale,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`فشل في جلب الفيديو التعريفي، حاول مرة اخرى.`);
    }

    const data = await response.json();

    return data?.data;
  } catch (error) {
    throw error;
  }
}
