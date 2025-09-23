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
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero degli autori"
      );
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
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero dell'autore"
      );
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
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante la creazione dell'autore"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding author:", error);
    throw error;
  }
};

export const getAuthors = async (searchAuthor, page, size) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/authors/public/search?name=${searchAuthor}&page=${page}&size=${size}`,
      { method: "GET" }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero degli autori"
      );
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
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante la cancellazione dell'autore"
      );
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
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante l'aggiornamento dell'autore"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};
