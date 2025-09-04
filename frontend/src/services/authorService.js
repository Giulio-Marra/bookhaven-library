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

export const addNewAuthor = async (authorData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData),
    });

    if (!response.ok) {
      throw new Error("Failed to add author");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding author:", error);
    throw error;
  }
};

export const getAuthors = async (searchAuthor, page, size, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/authors/search?name=${searchAuthor}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch authors");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

export const deleteAuthor = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete author");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
};

export const updateAuthor = async (id, authorData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authors/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData),
    });

    if (!response.ok) {
      throw new Error("Failed to update author");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};
