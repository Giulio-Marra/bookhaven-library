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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Errore durante il recupero degli utenti"
      );
    }

    return await response.json();
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Errore durante l'eliminazione dell'utente"
      );
    }

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
      throw new Error(
        data?.message || "Errore durante la creazione dell'utente"
      );
    }

    return data;
  } catch (error) {
    console.error("Error adding user:", error);
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
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Errore durante il recupero dell'utente"
      );
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
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Errore durante l'aggiornamento dell'utente"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
