interface response {
  data: {
    data: Category[];
  };
}
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${process.env.API}categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data: APIResponse<response> = await response.json();
    if (!("data" in data)) {
      throw new Error(`Error Fetching the categories `);
    }
    return data;
  } catch (error) {
    throw new Error(`Error Fetching the categories ${error}`);
  }
};
