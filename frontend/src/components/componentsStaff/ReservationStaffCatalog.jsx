import React, { useEffect, useState } from "react";
import { getFilteredReservations } from "../../services/reservationService";
import Spinner from "../Spinner";
import { Navigate } from "react-router-dom";

const ReservationsStaffCatalog = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expiredFilter, setExpiredFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  const loadReservations = async (page = 0) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFilteredReservations(token, {
        cardNumber: searchQuery,
        status: statusFilter,
        expired: expiredFilter,
        page: page,
        size: 20,
      });
      setReservations(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations(0);
  }, []);

  useEffect(() => {
    loadReservations(0);
  }, [searchQuery, statusFilter, expiredFilter]);

  const handleSearchKey = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(search);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage < 2) end = Math.min(totalPages - 1, maxVisible - 1);
    if (currentPage > totalPages - 3)
      start = Math.max(0, totalPages - maxVisible);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => loadReservations(i)}
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
          onClick={() => loadReservations(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Precedente
        </button>
        {pages}
        <button
          onClick={() => loadReservations(currentPage + 1)}
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
      <h1 className="text-2xl font-bold">Gestione Prenotazioni</h1>

      {/* Filtri */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          className="p-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
          placeholder="Cerca per codice tessera"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKey}
        />
        <select
          className="p-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tutti gli stati</option>
          <option value="PENDING">Pending</option>
          <option value="ACTIVE">Active</option>
          <option value="RETURNED">Returned</option>
          <option value="DECLINED">Declined</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={expiredFilter}
            onChange={(e) => setExpiredFilter(e.target.checked)}
            className="accent-blue-400"
          />
          Mostra solo scadute
        </label>
      </div>

      {/* Intestazione tabella */}
      <div className="grid grid-cols-7 gap-4 bg-gray-100 p-3 font-semibold border border-gray-300">
        <p>ISBN</p>
        <p>Codice Tessera</p>
        <p>Data Prenotazione</p>
        <p>Scadenza</p>
        <p>Riconsegna</p>
        <p>Stato</p>
        <p>Azioni</p>
      </div>

      {/* Contenuto */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : reservations.length === 0 ? (
        <p className="p-4 text-center text-gray-500">
          Nessuna prenotazione trovata.
        </p>
      ) : (
        reservations.map((res, index) => (
          <div
            key={res.id}
            className={`grid grid-cols-7 gap-4 p-3 items-center border-x border-gray-300 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <p className="font-mono">{res.bookIsbn}</p>
            <p className="font-mono">{res.cardNumber}</p>
            <p>{res.reservationDate}</p>
            <p>{res.dueDate}</p>
            <p>{res.returnDate || "-"}</p>
            <p className="font-semibold">{res.status}</p>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700 font-medium transition"
                onClick={() => Navigate(`/admin/update-book/${res.id}`)}
              >
                Visualizza/Aggiorna
              </button>
            </div>
          </div>
        ))
      )}

      {renderPagination()}
    </div>
  );
};

export default ReservationsStaffCatalog;
