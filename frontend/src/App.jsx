import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import MyNavbar from "./components/MyNavbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomepAge";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import CatalogPage from "./pages/CatalogPage";

function App() {
  const { getCurrentUser, isLoading } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) return <p>Caricamento...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/homepage"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/catalog"
          element={
            <MainLayout>
              <CatalogPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
