import { API_BASE_URL } from "../config/apiConfig";

// CREA NUOVO ARTICOLO
export const addNewArticle = async (articleData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error("Errore durante la creazione dell'articolo");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TROVA ARTICOLO PER ID
export const getArticleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// AGGIORNA ARTICOLO
export const updateArticle = async (id, articleData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Errore durante l'aggiornamento dell'articolo"
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CANCELLA ARTICOLO
export const deleteArticle = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete article");
    }

    return response.status === 204; // NoContent response
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// LISTA TUTTI GLI ARTICOLI ORDINATI PER UPDATED AT CRESCENTE
export const getArticlesAsc = async (page = 0, size = 10) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/articles/public/asc?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// LISTA TUTTI GLI ARTICOLI ORDINATI PER UPDATED AT DECRESCENTE
export const getArticlesDesc = async (page = 0, size = 20) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/articles/public/desc?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ULTIMI 5 ARTICOLI AGGIORNATI
export const getLatestArticles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/public/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch latest articles");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// FILTRA ARTICOLI PER INTERVALLO DI DATE
export const getArticlesByDateRange = async (
  startDate,
  endDate,
  page = 0,
  size = 10
) => {
  try {
    const params = new URLSearchParams();
    params.append("start", startDate);
    params.append("end", endDate);
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/articles/public/updated-between?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles by date range");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// FILTRA ARTICOLI PER INTERVALLO DI DATE E/O TIPO
export const getArticlesByFilters = async (
  type = null,
  startDate = null,
  endDate = null,
  page = 0,
  size = 10
) => {
  try {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (startDate) params.append("start", startDate);
    if (endDate) params.append("end", endDate);
    params.append("page", page);
    params.append("size", size);

    const response = await fetch(
      `${API_BASE_URL}/api/articles/public/filter?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles by filters");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
