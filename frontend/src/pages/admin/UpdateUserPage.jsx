import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../services/userService";
import Spinner from "../../components/Spinner";
import InputField from "../../components/componentsStaff/InputField";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUserPage = () => {
  const { id } = useParams();
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    address: "",
    taxCode: "",
    card: {
      cardNumber: "",
      creationDate: "",
      expirationDate: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const user = await getUserById(id, token);
        setFormData({
          name: user.name,
          surname: user.surname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          taxCode: user.taxCode,
          card: {
            cardNumber: user.card?.cardNumber || "",
            creationDate: user.card?.creationDate || "",
            expirationDate: user.card?.expirationDate || "",
          },
        });
      } catch (err) {
        setError("Errore nel caricare i dati utente");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await updateUser(id, formData, token);
      alert("Utente aggiornato con successo");
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("Errore durante l'aggiornamento dell'utente");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center py-10 px-4 min-h-screen mt-15">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 space-y-6"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-semibold text-red-400 cursor-pointer hover:underline"
        >
          Torna indietro
        </button>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Aggiorna Utente
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campi editabili */}
          <InputField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <InputField
            label="Cognome"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Cognome"
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <InputField
            label="Telefono"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+39 1234567890"
            required
          />
          <InputField
            label="Indirizzo"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Via Roma 123, Milano"
            required
          />

          {/* Campi solo visualizzazione */}
          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">Codice Fiscale</span>
            <span className="text-gray-800 bg-gray-100 px-3 py-2 rounded">
              {formData.taxCode || "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">Numero Tessera</span>
            <span className="text-gray-800 bg-gray-100 px-3 py-2 rounded">
              {formData.card.cardNumber || "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">
              Data Creazione Tessera
            </span>
            <span className="text-gray-800 bg-gray-100 px-3 py-2 rounded">
              {formData.card.creationDate
                ? new Date(formData.card.creationDate).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">
              Data Scadenza Tessera
            </span>
            <span className="text-gray-800 bg-gray-100 px-3 py-2 rounded">
              {formData.card.expirationDate
                ? new Date(formData.card.expirationDate).toLocaleDateString()
                : "-"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 font-semibold hover:bg-blue-600 transition"
        >
          Aggiorna Utente
        </button>
      </form>
    </div>
  );
};

export default UpdateUserPage;
