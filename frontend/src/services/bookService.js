import { API_BASE_URL } from "../config/apiConfig";

export const getBooks = async (searchItem, category, page, size) => {
  try {
    const params = new URLSearchParams();
    if (searchItem) params.append("q", searchItem);
    if (category) params.append("category", category);
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/books/public/search?${params.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero dei libri"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero del libro"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addNewBook = async (bookData, token, imageFile) => {
  const {
    title,
    isbn,
    categories,
    position,
    description,
    publishedYear,
    numPages,
    authorIds,
  } = bookData;

  const formData = new FormData();
  formData.append(
    "data",
    new Blob(
      [
        JSON.stringify({
          title,
          isbn,
          categories,
          position,
          description,
          publishedYear: parseInt(publishedYear),
          numPages: parseInt(numPages),
          authorIds: authorIds.map((id) => parseInt(id)),
        }),
      ],
      { type: "application/json" }
    )
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/books/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante la creazione del libro"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBook = async (id, bookData, token, imageFile) => {
  const {
    title,
    isbn,
    categories,
    position,
    description,
    publishedYear,
    numPages,
    authorIds,
    image,
  } = bookData;

  const formData = new FormData();
  formData.append(
    "data",
    new Blob(
      [
        JSON.stringify({
          title,
          isbn,
          categories,
          position,
          description,
          publishedYear: parseInt(publishedYear),
          numPages: parseInt(numPages),
          authorIds: authorIds.map((id) => parseInt(id)),
          image,
        }),
      ],
      { type: "application/json" }
    )
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/books/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante l'aggiornamento del libro"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBookByAuthorId = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/books/public/author/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero dei libri per autore"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecentBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/public/recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante il recupero dei libri recenti"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBooks = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante l'eliminazione del libro"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
