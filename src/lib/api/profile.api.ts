import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Profile settings action
export const updateProfile = async (formData: FormData) => {
  try {
    const response = await fetch(`${apiUrl}user/update-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
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

export const updateUserPhone = async (phone: string) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${apiUrl}user/update-user-phone`, {
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

// Profile Email action
export const updateUserEmail = async (email: string) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${apiUrl}user/update-user-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData?.message || "حدث خطأ أثناء إرسال OTP");
    }

    return responseData;
  } catch (error) {
    console.error("Error sending OTP:", (error as Error).message);
    throw error;
  }
};

// Profile password actions
export const updateUserPassword = async (values: string) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const responseData = await fetch(`${apiUrl}user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${values}`,
      },
      body: JSON.stringify(values),
    });

    const data = await responseData.json();

    if (!responseData.ok) {
      throw new Error(data.message || "حدث خطأ أثناء تغيير كلمة المرور");
    }

    return responseData;
  } catch (error) {
    console.error("Error Changing password", (error as Error).message);
    throw error;
  }
};

export const getUserDetails = async () => {
  const response = await fetch(`${apiUrl}user/get-details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  const data = await response.json();
  return data;
};
