import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import CatalogPage from "./pages/CatalogPage";
import BookDetailPage from "./pages/BookDetailPage";
import AddNewBookTest from "./pages/AddNewBookTest";
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

function App() {
  const { getCurrentUser, isLoading, role, error } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
          <h2 className="text-xl font-bold text-red-500">Errore</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Riprova
          </button>
        </div>
      </div>
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
          path="/book/add"
          element={
            <MainLayout>
              <AddNewBookTest />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
