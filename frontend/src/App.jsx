import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import CatalogPage from "./pages/CatalogPage";
import BookDetailPage from "./pages/BookDetailPage";

import AdminPage from "./pages/admin/AdminPage";
import AdminRoute from "./pages/admin/AdminRoute";
import AddBooksPage from "./pages/admin/AddBooksPage";
import Spinner from "./components/Spinner";
import AuthorDetailpage from "./pages/AuthorDetailpage";
import ContactPage from "./pages/ContactPage";
import UpdateBooksPage from "./pages/admin/UpdateBookPage";
import AddAuthorPage from "./pages/admin/AddAuthorPage";
import UpdateAuthorPage from "./pages/admin/UpdateAuthorPage";
import AddArticlePage from "./pages/admin/AddArticlePage";
import MainPage from "./pages/MainPage";
import UpdateArticlePage from "./pages/admin/UpdateArticlePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ArticlesPage from "./pages/ArticlesPage";
import AddUserPage from "./pages/admin/AddUserPage";
import UpdateUserPage from "./pages/admin/UpdateUserPage";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
  const { getCurrentUser, isLoading, role } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading)
    return (
      <Spinner
        text="Attendi mentre carichiamo i dati...
  Se è il primo avvio potrebbe richiedere qualche minuto."
      />
    );

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
          path="/"
          element={
            <MainLayout>
              <MainPage />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <DashBoardPage />
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
        <Route
          path="/articles"
          element={
            <MainLayout>
              <ArticlesPage />
            </MainLayout>
          }
        />
        <Route
          path="/book/detail/:id"
          element={
            <MainLayout>
              <BookDetailPage />
            </MainLayout>
          }
        />
        <Route
          path="/article/detail/:id"
          element={
            <MainLayout>
              <ArticleDetailPage />
            </MainLayout>
          }
        />
        <Route
          path="/author/detail/:id"
          element={
            <MainLayout>
              <AuthorDetailpage />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <AdminPage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <AddBooksPage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-author"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <AddAuthorPage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-article"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <AddArticlePage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <AddUserPage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-book/:id"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <UpdateBooksPage />
              </MainLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-author/:id"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <UpdateAuthorPage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-article/:id"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <UpdateArticlePage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-user/:id"
          element={
            <AdminRoute role={role}>
              <MainLayout>
                <UpdateUserPage />
              </MainLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
