import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getMyReservations } from "../services/reservationService";
import Spinner from "../components/Spinner";

const DashBoardPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyReservations(token, page, 10);
        setReservations(data.content || []);
      } catch (err) {
        setError(
          err.message || "Errore durante il caricamento delle prenotazioni"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchReservations();
  }, [user, token, page]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 space-y-8">
      {/* Sezione informazioni utente */}
      <div className="bg-gray-50 shadow-lg p-6 border-t-4 border-blue-400">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Benvenuto, {user.name} {user.surname}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <span className="block font-medium text-gray-500 mb-1">Email</span>
            {user.email}
          </div>
          <div>
            <span className="block font-medium text-gray-500 mb-1">
              Telefono
            </span>
            {user.phoneNumber || "_"}
          </div>
          <div>
            <span className="block font-medium text-gray-500 mb-1">
              Indirizzo
            </span>
            {user.address || "_"}
          </div>
          <div>
            <span className="block font-medium text-gray-500 mb-1">
              Codice Fiscale
            </span>
            {user.taxCode}
          </div>
          <div>
            <span className="block font-medium text-gray-500 mb-1">Carta</span>
            {user.card?.cardNumber || "_"}
          </div>
        </div>
      </div>

      {/* Sezione storico prenotazioni */}
      <div className="bg-gray-50 shadow-lg p-6 border-t-4 border-blue-400">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Le tue prenotazioni
        </h2>

        {loading ? (
          <p className="text-gray-600">Caricamento prenotazioni...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : reservations.length === 0 ? (
          <p className="text-gray-600">Nessuna prenotazione trovata</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                  <th className="py-3 px-4 border-b">Titolo</th>
                  <th className="py-3 px-4 border-b">ISBN</th>
                  <th className="py-3 px-4 border-b">Data Prenotazione</th>
                  <th className="py-3 px-4 border-b">Scadenza</th>
                  <th className="py-3 px-4 border-b">Stato</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr
                    key={res.id}
                    className="border-b hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-2 px-4">{res.bookTitle}</td>
                    <td className="py-2 px-4">{res.bookIsbn}</td>
                    <td className="py-2 px-4">{res.reservationDate}</td>
                    <td className="py-2 px-4">{res.dueDate}</td>
                    <td className="py-2 px-4 font-semibold">{res.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginazione */}
        {reservations.length > 0 && (
          <div className="flex justify-between mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-5 py-2 font-medium text-white ${
                page === 0
                  ? "bg-blue-200 cursor-not-allowed opacity-50"
                  : "bg-blue-400 hover:bg-blue-600 cursor-pointer shadow-md transition-colors"
              }`}
            >
              Precedente
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={reservations.length < 10}
              className={`px-5 py-2 font-medium text-white ${
                reservations.length < 10
                  ? "bg-blue-200 cursor-not-allowed opacity-50"
                  : "bg-blue-400 hover:bg-blue-600 cursor-pointer shadow-md transition-colors"
              }`}
            >
              Successiva
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardPage;
