import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomepAge";
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

function App() {
  const { getCurrentUser, isLoading, role } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) return <Spinner />;

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
        <Route
          path="/book/detail/:id"
          element={
            <MainLayout>
              <BookDetailPage />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
