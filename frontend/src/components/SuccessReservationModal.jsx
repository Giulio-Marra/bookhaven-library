import React from "react";

const SuccessReservationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white  p-6 w-11/12 max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Prenotazione effettuata</h2>
        <p className="text-gray-600 mb-4">
          Il tuo libro è stato prenotato con successo! Recati in biblioteca
          entro 2 giorni per il ritiro.
        </p>
        <button className="bg-blue-400 text-white  px-4 py-2" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default SuccessReservationModal;
