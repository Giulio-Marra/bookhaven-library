import React, { useState } from "react";
import { addNewAuthor } from "../../services/authorService";
import Spinner from "../../components/Spinner";
import InputField from "../../components/componentsStaff/InputField";
import { useNavigate } from "react-router-dom";

const AddAuthorPage = () => {
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : sessionStorage.getItem("authToken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    dateOfDeath: "",
    nationality: "",
    urlImage: "",
    biography: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchAuthorCover = async (authorName) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?author=${authorName}&sort=new`
      );
      const data = await response.json();
      const authorKey = data.docs[0]?.author_key?.[0];
      if (!authorKey) return ""; // niente cover

      const coverUrl = `https://covers.openlibrary.org/a/olid/${authorKey}-M.jpg`;

      const imgCheck = await fetch(coverUrl);
      if (!imgCheck.ok) return "";

      return coverUrl;
    } catch (err) {
      console.error("Errore nel recupero cover:", err);
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let coverLink = "";
      if (formData.name.trim() !== "") {
        coverLink = await fetchAuthorCover(formData.name.trim());
      }
      await addNewAuthor({ ...formData, urlImage: coverLink }, token);
      alert("Autore aggiunto con successo!");
      setFormData({
        name: "",
        dateOfBirth: "",
        dateOfDeath: "",
        nationality: "",
        urlImage: "",
        biography: "",
      });
    } catch (err) {
      console.error(err.message);
      alert("Errore durante l'aggiunta dell'autore");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex justify-center py-10 px-4 min-h-screen mt-15">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6  space-y-6 transition-all duration-300"
      >
        {" "}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="  font-semibold text-red-400 cursor-pointer hover:underline "
        >
          Torna indietro
        </button>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Aggiungi Nuovo Autore
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome autore"
            required={true}
          />
          <InputField
            label="Data di Nascita"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <InputField
            label="Data di Morte"
            name="dateOfDeath"
            type="date"
            value={formData.dateOfDeath}
            onChange={handleChange}
          />
          <InputField
            label="Nazionalità"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="e.g. Italian"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex flex-col w-full">
            <span className="text-gray-800 text-sm font-medium">Biografia</span>
            <textarea
              name="biography"
              placeholder="Breve biografia..."
              value={formData.biography}
              onChange={handleChange}
              rows={4}
              className="w-full  border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>
        </div>
        {formData.urlImage && (
          <div className="flex justify-center">
            <img
              src={formData.urlImage}
              alt="Author Cover"
              className="w-32 h-auto rounded-md border border-gray-300"
            />
          </div>
        )}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          className="w-full  bg-blue-400 text-white py-2 font-semibold hover:bg-blue-600 transition cursor-pointer"
        >
          Aggiungi Autore
        </button>
      </form>
    </div>
  );
};

export default AddAuthorPage;
