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
    console.log("🎯 Risposta completa login:", data); // DEBUG

    const token = data.token;
    console.log("🔑 Token ricevuto:", token); // DEBUG
    console.log("🔑 Token length:", token?.length); // DEBUG

    if (rememberMe) {
      localStorage.setItem("authToken", token);
      console.log("💾 Token salvato in localStorage"); // DEBUG
    } else {
      sessionStorage.setItem("authToken", token);
      console.log("💾 Token salvato in sessionStorage"); // DEBUG
    }

    return token;
  } catch (error) {
    console.error("Login fallito:", error.message);
    throw error;
  }
};

export const getCurrentUser = async (token) => {
  console.log("🔍 getCurrentUser chiamata con token:", token); // DEBUG
  console.log("🔍 Token type:", typeof token); // DEBUG

  if (!token) {
    console.log("❌ Nessun token fornito");
    return null;
  }

  try {
    console.log("🌐 Chiamata a:", `${API_BASE_URL}/users/me`); // DEBUG
    console.log("🔐 Authorization header:", `Bearer ${token}`); // DEBUG

    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📊 Status risposta getCurrentUser:", response.status); // DEBUG

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Risposta errore getCurrentUser:", errorText); // DEBUG

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      throw new Error("Impossibile ottenere l'utente, token non valido");
    }

    const user = await response.json();
    console.log("✅ Utente ricevuto:", user); // DEBUG
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
