import { API_BASE_URL } from "../config/apiConfig";

export const getUsers = async (searchItem, page, size, token) => {
  try {
    const params = new URLSearchParams();
    if (searchItem) params.append("query", searchItem);
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/staff/user/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch users");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/staff/user/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete user");

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const addUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/staff/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage =
        data?.message || "Errore durante la creazione dell'utente";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getUserById = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/staff/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/staff/user/update/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
