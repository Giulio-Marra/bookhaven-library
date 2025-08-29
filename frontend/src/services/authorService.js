import { API_BASE_URL } from "../config/apiConfig";

export const getAllAuthorsName = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/names`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch authors");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

export const getAuthorById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch author");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching author:", error);
    throw error;
  }
};
