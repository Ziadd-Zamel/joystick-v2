/* eslint-disable no-undef */
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Get all notifications with pagination
export const getAllNotifications = async ({ pageParam = 1 }) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Unauthorized: No token found")
    }

    const response = await fetch(`${API_URL}user/noifications?page=${pageParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch notifications")
    }

    const data = await response.json()
    return {
      notifications: data.data.data,
      nextPage: data.data.current_page < data.data.last_page ? data.data.current_page + 1 : undefined,
      totalPages: data.data.last_page,
      totalUnread: data.data.total_unread || data.data.data.filter(n => !n.read_at).length // Fallback if API doesn't provide total_unread
    }
  } catch (error) {
    throw new Error(error.message || "Error fetching notifications")
  }
}

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Unauthorized: No token found")
    }

    const response = await fetch(
      `${API_URL}user/notifications/${notificationId}/read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to mark notification as read")
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message || "Error marking notification as read")
  }
} 