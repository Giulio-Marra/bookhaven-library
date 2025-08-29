import { API_BASE_URL } from "../config/apiConfig";

export const getBooks = async (searchItem, page, size) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/books/public/search?q=${searchItem}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data;
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
      throw new Error("Failed to fetch book");
    }
    const data = await response.json();
    return data;
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
      throw new Error("Failed to fetch book");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
