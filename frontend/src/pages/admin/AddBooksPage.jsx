import React, { useState } from "react";
import { addNewBook } from "../../services/bookService";
import AuthorsSelectModal from "../../components/componentsStaff/AuthorsSelect";
import Spinner from "../../components/Spinner";
import InputField from "../../components/componentsStaff/InputField";
import { useNavigate } from "react-router-dom";

const AddBooksPage = () => {
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : sessionStorage.getItem("authToken");
  const navigate = useNavigate();
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    categories: "",
    position: "",
    description: "",
    publishedYear: "",
    numPages: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [authorsModalOpen, setAuthorsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImageFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addNewBook(
        { ...formData, authorIds: selectedAuthors.map((a) => a.id) },
        token,
        imageFile
      );
      alert("Libro aggiunto con successo!");
      setFormData({
        title: "",
        isbn: "",
        categories: "",
        position: "",
        description: "",
        publishedYear: "",
        numPages: "",
      });
      setPreview(null);
      setSelectedAuthors([]);
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio del libro");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spinner />;
  return (
    <div className="flex justify-center py-10 px-4 min-h-screen mt-15">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 rounded-xl space-y-6 transition-all duration-300"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="  font-semibold text-red-400 cursor-pointer hover:underline "
        >
          Torna indietro
        </button>
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Aggiungi nuovo libro
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Titolo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Esempio: Il Signore degli Anelli"
            required={true}
          />
          <InputField
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Esempio: 978-3-16-148410-0"
            required={true}
          />
          <InputField
            label="Categorie"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Fantasy, Sci-Fi..."
            required={true}
          />
          <InputField
            label="Posizione in Biblioteca"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Shelf A2"
            required={true}
          />
          <InputField
            label="Anno di Pubblicazione"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            placeholder="2025"
            type="number"
          />
          <InputField
            label="Numero di Pagine"
            name="numPages"
            value={formData.numPages}
            onChange={handleChange}
            placeholder="350"
            type="number"
          />
        </div>

        {/* Authors Modal Trigger + Tag */}
        <div className="flex flex-col gap-2">
          <span className="text-gray-800 text-sm font-medium mb-1">Autori</span>
          <div className="flex flex-wrap gap-2">
            {selectedAuthors.map((author) => (
              <span
                key={author.id}
                className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-sm"
              >
                {author.name}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedAuthors(
                      selectedAuthors.filter((a) => a.id !== author.id)
                    )
                  }
                  className="font-bold text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAuthorsModalOpen(true)}
            className="bg-blue-50 border border-blue-300 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-100 transition w-full text-left"
          >
            Seleziona Autori
          </button>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="flex flex-col w-full">
            <span className="text-gray-800 text-sm font-medium">
              Descrizione
            </span>
            <textarea
              name="description"
              placeholder="Sinossi del libro..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </label>
        </div>

        {/* Cover Upload */}
        <div className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-300 p-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg shadow-sm mb-2 h-72 object-contain transition-transform hover:scale-105"
            />
          ) : (
            <p className="text-gray-500 text-sm mb-2 text-center">
              Anteprima copertina del libro
            </p>
          )}
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleChange}
            className="w-full cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full  bg-blue-400 text-white py-2 font-semibold hover:bg-blue-600 transition cursor-pointer"
        >
          Aggiungi Libro
        </button>

        {/* Authors Modal */}
        {authorsModalOpen && (
          <AuthorsSelectModal
            selectedAuthors={selectedAuthors}
            setSelectedAuthors={setSelectedAuthors}
            onClose={() => setAuthorsModalOpen(false)}
            token={token}
          />
        )}
      </form>
    </div>
  );
};

export default AddBooksPage;
