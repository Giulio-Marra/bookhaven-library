import React, { useEffect, useState } from "react";
import { deleteBooks, getBooks } from "../../services/bookService";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const BooksStaffCatalog = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : sessionStorage.getItem("authToken");
  const [modalOpen, setModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate();

  const loadBooks = async (page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks(searchQuery, "", page, 20, token);
      setBooks(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(0);
  }, [searchQuery]);

  const handleSearchKey = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(search);
    }
  };

  const handleDeleteClick = (bookId) => {
    setBookToDelete(bookId);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      setLoading(true);
      setModalOpen(false);
      await deleteBooks(bookToDelete, token);
      await loadBooks();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);

      setBookToDelete(null);
      alert("Libro eliminato con successo");
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage < 2) {
      end = Math.min(totalPages - 1, maxVisible - 1);
    }
    if (currentPage > totalPages - 3) {
      start = Math.max(0, totalPages - maxVisible);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => loadBooks(i)}
          className={`px-3 py-1 border border-gray-300 ${
            i === currentPage
              ? "bg-blue-500 text-white font-bold"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center space-x-1 mt-4">
        <button
          onClick={() => loadBooks(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Precedente
        </button>
        {pages}
        <button
          onClick={() => loadBooks(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Successivo
        </button>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Intestazione + Aggiungi Libro */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestione Libri</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => navigate("/admin/add-book")}
        >
          Aggiungi Nuovo Libro
        </button>
      </div>

      {/* Barra di ricerca */}
      <input
        className="w-full p-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        type="text"
        placeholder="Cerca per titolo, autore o ISBN"
        value={search}
        onKeyDown={handleSearchKey}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Intestazione tabella */}
      <div className="grid grid-cols-6 gap-4 bg-gray-100 p-3 font-semibold border border-gray-300">
        <p>Titolo</p>
        <p>Autore</p>
        <p>ISBN</p>
        <p>Stato</p>
        <p>Posizione</p>
        <p>Azioni</p>
      </div>

      {/* Contenuto tabella */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">Errore: {error.message}</p>
      ) : books.length === 0 ? (
        <p className="p-4 text-center text-gray-500">Nessun libro trovato.</p>
      ) : (
        books.map((book, index) => (
          <div
            key={book.id}
            className={`grid grid-cols-6 gap-4 p-3 items-center border-x border-gray-300 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <p className="font-medium">{book.title}</p>
            <p className="text-blue-500">
              {book.authors.map((author) => author.name).join(", ")}
            </p>
            <p className="font-mono">{book.isbn}</p>
            <p className="capitalize font-medium">
              {book.status.toLowerCase()}
            </p>
            <p>{book.position || "-"}</p>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700 font-medium transition"
                onClick={() => navigate(`/admin/update-book/${book.id}`)}
              >
                Modifica
              </button>
              <span className="text-gray-400">|</span>
              <button
                className="text-red-500 hover:text-red-700 font-medium transition"
                onClick={() => handleDeleteClick(book.id)}
              >
                Elimina
              </button>
            </div>
          </div>
        ))
      )}

      {/* Paginazione */}
      {renderPagination()}

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Sei sicuro di voler eliminare questo libro?"
      />
    </div>
  );
};

export default BooksStaffCatalog;
