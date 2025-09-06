import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { deleteUser, getUsers } from "../../services/userService";

const UserStaffManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers(searchQuery, page, 20, token);
      setUsers(data.content || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [searchQuery, page]);

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(search);
      setPage(0);
    }
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setModalOpen(false);
      setLoading(true);
      await deleteUser(userToDelete, token);
      alert("Utente eliminato con successo");
      await loadUsers();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestione Utenti</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          onClick={() => navigate("/admin/add-user")}
        >
          Aggiungi utente
        </button>
      </div>

      <input
        className="w-full p-3 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        type="text"
        placeholder="Cerca per email, codice fiscale o numero carta"
        value={search}
        onKeyDown={handleSearchKey}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-7 gap-4 bg-gray-100 p-3 font-semibold border border-gray-300">
        <p>Codice Fiscale</p>
        <p>Email</p>
        <p>Numero Carta</p>
        <p>Data Creazione</p>
        <p>Data Scadenza</p>
        <p>Nome</p>
        <p>Azioni</p>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : users.length === 0 ? (
        <p className="p-4 text-center text-gray-500">Nessun utente trovato.</p>
      ) : (
        <>
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`grid grid-cols-7 gap-4 p-3 items-center border-x border-gray-300 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <p className="font-medium">{user.taxCode}</p>
              <p>{user.email}</p>
              <p>{user.card?.cardNumber || "-"}</p>
              <p>
                {user.card?.creationDate
                  ? new Date(user.card.creationDate).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                {user.card?.expirationDate
                  ? new Date(user.card.expirationDate).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                {user.name} {user.surname}
              </p>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700 font-medium transition"
                  onClick={() => navigate(`/admin/update-user/${user.id}`)}
                >
                  Modifica
                </button>
                <span className="text-gray-400">|</span>
                <button
                  className="text-red-500 hover:text-red-700 font-medium transition"
                  onClick={() => handleDeleteClick(user.id)}
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => setPage(0)}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            «
          </button>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i)
            .filter(
              (i) =>
                i === 0 ||
                i === totalPages - 1 ||
                (i >= page - 2 && i <= page + 2)
            )
            .map((i, idx, arr) => {
              const prev = arr[idx - 1];
              const showDots = prev !== undefined && i - prev > 1;
              return (
                <React.Fragment key={i}>
                  {showDots && <span className="px-2">...</span>}
                  <button
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 border rounded ${
                      page === i
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ›
          </button>
          <button
            onClick={() => setPage(totalPages - 1)}
            disabled={page === totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Sei sicuro di voler eliminare questo utente?"
      />
    </div>
  );
};

export default UserStaffManage;
