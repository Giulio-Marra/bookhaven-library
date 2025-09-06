import React, { useState } from "react";
import { addUser } from "../../services/userService";
import Spinner from "../../components/Spinner";
import InputField from "../../components/componentsStaff/InputField";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    address: "",
    taxCode: "",
    card: {
      cardNumber: "",
      confirmCardNumber: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber" || name === "confirmCardNumber") {
      setFormData((prev) => ({
        ...prev,
        card: { ...prev.card, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.email !== formData.confirmEmail) {
      setError("Le email non corrispondono");
      return;
    }

    if (formData.card.cardNumber !== formData.card.confirmCardNumber) {
      setError("I numeri della carta non corrispondono");
      return;
    }

    setLoading(true);

    try {
      const response = await addUser(formData, token);
      alert(
        `Utente creato! Controlla la mail ${response.email} per le credenziali.`
      );
      setFormData({
        name: "",
        surname: "",
        email: "",
        confirmEmail: "",
        phoneNumber: "",
        address: "",
        taxCode: "",
        card: { cardNumber: "", confirmCardNumber: "" },
      });
    } catch (err) {
      console.error(err);
      setError("Errore durante la creazione dell'utente");
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
        className="w-full max-w-2xl bg-white p-6 space-y-6 transition-all duration-300"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-semibold text-red-400 cursor-pointer hover:underline"
        >
          Torna indietro
        </button>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Registra Nuovo Utente
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            label="Conferma Email"
            name="confirmEmail"
            type="email"
            value={formData.confirmEmail}
            onChange={handleChange}
            placeholder="Conferma Email"
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
          <InputField
            label="Codice Fiscale"
            name="taxCode"
            value={formData.taxCode}
            onChange={handleChange}
            placeholder="Codice Fiscale"
            required
          />
          <InputField
            label="Numero Tessera"
            name="cardNumber"
            value={formData.card.cardNumber}
            onChange={handleChange}
            placeholder="Numero Tessera"
            required
          />
          <InputField
            label="Conferma Numero Tessera"
            name="confirmCardNumber"
            value={formData.card.confirmCardNumber}
            onChange={handleChange}
            placeholder="Conferma Numero Tessera"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 font-semibold hover:bg-blue-600 transition cursor-pointer"
        >
          Aggiungi Utente
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
