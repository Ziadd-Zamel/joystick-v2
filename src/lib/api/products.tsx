export const fetchProducts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const response = await fetch(`${apiUrl}products`, {
    headers: {
      "Content-Type": "application/json",
      lang: "ar",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.data.data;
};
