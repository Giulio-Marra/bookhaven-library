import React from "react";

const ConfirmReservationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-11/12 max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Conferma prenotazione</h2>
        <p className="text-gray-600 mb-4">
          Sei sicuro di voler prenotare questo libro? Dovrai ritirarlo in
          biblioteca entro 2 giorni.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2"
            onClick={onCancel}
          >
            Annulla
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={onConfirm}
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReservationModal;
