import { API_BASE_URL } from "../config/apiConfig";

export const reservationBook = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reservation/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to book reservation");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMyReservations = async (token, page = 0, size = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/reservation/me?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to fetch reservations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

export const getFilteredReservations = async (
  token,
  { cardNumber = "", status = "", expired = null, page = 0, size = 10 } = {}
) => {
  try {
    const params = new URLSearchParams();
    if (cardNumber.trim() !== "") params.append("cardNumber", cardNumber);
    if (status !== "") params.append("status", status);
    if (expired) params.append("expired", "true"); // solo se true
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/reservation/filter?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Failed to fetch filtered reservations"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered reservations:", error);
    throw error;
  }
};
