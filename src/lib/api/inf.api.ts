import { getLocale } from "next-intl/server";

const apiUrl = process.env.API;

export const getStaticInfo = async (endpoint: string) => {
  const locale = await getLocale();
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      headers: {
        lang: locale,
      },
    });

    if (!response.ok) {
      throw new Error("فشل في جلب البيانات من الخادم");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
