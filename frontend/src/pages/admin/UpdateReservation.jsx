import React, { useEffect, useState } from "react";
import {
  getReservationById,
  updateReservationStatus,
} from "../../services/reservationService";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SelectField from "../../components/componentsStaff/SelectField";

const UpdateReservation = () => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(reservation);

  const fetchReservation = async () => {
    setLoading(true);
    try {
      const data = await getReservationById(id, token);
      setReservation(data);
      setNewStatus(data.status);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await updateReservationStatus(reservation.id, newStatus, token);
      alert("Stato aggiornato con successo!");
      navigate("/admin");
    } catch (error) {
      alert("Errore durante l'aggiornamento: " + error.message);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!reservation) return <div>Prenotazione non trovata..</div>;

  return (
    <div className="flex justify-center py-10 px-4 min-h-screen mt-15">
      <form
        onSubmit={handleUpdateStatus}
        className="w-full max-w-4xl bg-white p-6 space-y-6 transition-all duration-300"
      >
        {/* Torna indietro */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-semibold text-red-400 cursor-pointer hover:underline"
        >
          Torna indietro
        </button>

        {/* Titolo */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Aggiorna Prenotazione
        </h1>

        {/* Griglia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Utente */}
          <div className="flex flex-col gap-2 border p-4">
            <span className="text-gray-800 text-sm font-medium mb-1">
              Dati Utente
            </span>
            <p>
              <strong>Nome:</strong> {reservation.user.name}{" "}
              {reservation.user.surname}
            </p>
            <p>
              <strong>Email:</strong> {reservation.user.email}
            </p>
            <p>
              <strong>Tessera:</strong> {reservation.user.card.cardNumber}
            </p>
          </div>

          {/* Libro */}
          <div className="flex flex-col gap-2 border p-4">
            <span className="text-gray-800 text-sm font-medium mb-1">
              Dati Libro
            </span>
            <p>
              <strong>Titolo:</strong> {reservation.book.title}
            </p>
            <p>
              <strong>ISBN:</strong> {reservation.book.isbn}
            </p>
            <p>
              <strong>Categorie:</strong> {reservation.book.categories}
            </p>
            <img
              src={reservation.book.image}
              alt={reservation.book.title}
              className="mt-2 h-60 object-contain"
            />
          </div>
        </div>

        {/* Dati Prenotazione */}
        <div className="flex flex-col gap-2 border p-4">
          <span className="text-gray-800 text-sm font-medium mb-1">
            Dati Prenotazione
          </span>
          <p>
            <strong>Data Prenotazione:</strong>{" "}
            {reservation.reservationDate || "-"}
          </p>
          <p>
            <strong>Scadenza:</strong> {reservation.dueDate || "-"}
          </p>
          <p>
            <strong>Riconsegna:</strong> {reservation.returnDate || "-"}
          </p>
          <p>
            <strong>Stato attuale:</strong>{" "}
            <span className="font-semibold">{reservation.status}</span>
          </p>
        </div>

        {/* Stato */}
        <SelectField
          label="Aggiorna Stato"
          name="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          options={["PENDING", "ACTIVE", "RETURNED", "DECLINED"]}
        />

        {/* Bottone Salva */}
        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 font-semibold hover:bg-blue-600 transition"
        >
          Aggiorna Stato
        </button>
      </form>
    </div>
  );
};

export default UpdateReservation;
