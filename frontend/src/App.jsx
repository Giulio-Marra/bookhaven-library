import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import MyNavbar from "./components/MyNavbar";

function LoginPage() {
  return <h1>Login Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard - Utente loggato</h1>;
}

function App() {
  const { getCurrentUser, user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, [user]);

  if (isLoading) return <p>Caricamento...</p>;

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        {/* Rotta pubblica */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotta protetta */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* Default → se non c’è nessuna route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
