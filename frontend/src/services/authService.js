import { API_BASE_URL } from "../config/apiConfig";

export const login = async (code, password, rememberMe) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante il login");
    }

    const data = await response.json();
    const token = data.token;
    if (rememberMe) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }

    return token;
  } catch (error) {
    console.error("Login fallito:", error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      throw new Error("Impossibile ottenere l'utente, token non valido");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Errore nel recupero dell'utente:", error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
};
