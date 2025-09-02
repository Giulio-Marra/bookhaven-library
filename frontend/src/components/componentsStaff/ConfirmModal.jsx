const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6  shadow-lg w-80 text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300  hover:bg-gray-400"
            onClick={onClose}
          >
            Annulla
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white  hover:bg-red-600"
            onClick={onConfirm}
          >
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
