const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getStaticInfo = async (endpoint: string) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      headers: {
        lang: "ar",
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
