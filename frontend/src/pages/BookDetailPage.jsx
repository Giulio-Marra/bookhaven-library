import React, { use, useEffect, useState } from "react";
import { getBookById } from "../services/bookService";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";
import { reservationBook } from "../services/reservationService";
import ConfirmReservationModal from "../components/ConfirmReservationModal";
import SuccessReservationModal from "../components/SuccessReservationModal";

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: bookId } = useParams();
  const { user } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const loadBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (err) {
      setError(err.message || "Errore durante il caricamento del libro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const handleReservation = () => {
    if (!user) {
      alert("Devi essere loggato per prenotare un libro.");
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmReservation = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      await reservationBook(bookId, token);
      setShowSuccessModal(true);
    } catch (error) {
      let errorMessage = "Errore durante la prenotazione.";
      if (user && user.role === "DEMO") {
        errorMessage += " Gli utenti demo non possono prenotare libri.";
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = async () => {
    setShowSuccessModal(false);
    await loadBook();
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600 text-center mt-20">{error}</p>;
  if (!book)
    return <p className="text-gray-600 text-center mt-20">Libro non trovato</p>;

  const statusColors = {
    AVAILABLE: "bg-green-50 text-green-700 border border-green-200",
    BOOKED: "bg-blue-50 text-blue-700 border border-blue-200",
    BORROWED: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    UNAVAILABLE: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <h1 className="mb-6 text-gray-400">
        Books / <span className="text-black font-bold">{book.title}</span>
      </h1>
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-12">
        <img
          src={book.image}
          alt={book.title}
          className="w-52 h-80 object-cover rounded-lg shadow-sm border border-gray-100"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Autori</p>
            <div className="flex flex-wrap gap-2">
              {book.authors && book.authors.length > 0 ? (
                book.authors.map((author) => (
                  <button
                    key={author.id}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    onClick={() => navigate(`/author/detail/${author.id}`)}
                  >
                    {author.name ?? "Sconosciuto"}
                  </button>
                ))
              ) : (
                <span className="text-gray-500 italic">Nessun autore</span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {book.description}
          </p>

          <div>
            <span
              className={`inline-block px-4 py-2 text-sm font-medium rounded-md ${
                statusColors[book.status] ||
                "bg-gray-50 text-gray-700 border border-gray-200"
              }`}
            >
              {book.status}
            </span>
            {user ? (
              <button
                disabled={book.status !== "AVAILABLE"}
                className={`ml-4 mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white ${
                  book.status === "AVAILABLE"
                    ? "bg-blue-400 hover:bg-blue-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                } border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                onClick={handleReservation}
              >
                Prenota Libro
              </button>
            ) : (
              <>
                <button className="ml-4 mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400 border border-transparent cursor-pointer shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Prenota Libro
                </button>
                <p className="text-gray-600 ">
                  Accedi per prenotare questo libro.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
          Dettagli:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Pubblicato
            </span>
            {book.publishedYear ? (
              <span className="text-lg font-semibold text-gray-900">
                {book.publishedYear}
              </span>
            ) : (
              <span className="text-lg font-semibold text-gray-900">_</span>
            )}
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Pagine
            </span>
            {book.numPages ? (
              <span className="text-lg font-semibold text-gray-900">
                {book.numPages}
              </span>
            ) : (
              <span className="text-lg font-semibold text-gray-900">_</span>
            )}
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              Categorie
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {book.categories}
            </span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500 mb-1">
              ISBN
            </span>
            <span className="text-lg font-mono text-gray-900">{book.isbn}</span>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmReservationModal
          onConfirm={confirmReservation}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      {showSuccessModal && (
        <SuccessReservationModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default BookDetailPage;
