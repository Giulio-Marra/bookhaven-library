import React, { useState } from "react";
import { addNewBook } from "../../services/bookService";
import AuthorsSelect from "../../components/componentsStaff/AuthorsSelect";

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1 py-2">
    <label className="flex flex-col w-full">
      <p className="text-[#0e141b] text-sm font-medium pb-1">{label}</p>
      <input
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#d0dbe7] bg-slate-50 h-10 px-3 text-sm text-blue-600"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

const AddBooksPage = () => {
  const token = localStorage.getItem("authToken");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    categories: "",
    position: "",
    description: "",
    publishedYear: "",
    numPages: "",
    authorIds: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImageFile(files[0]);
      setPreview(URL.createObjectURL(files[0])); // genera l'anteprima
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewBook(
        { ...formData, authorIds: selectedAuthors },
        token,
        imageFile
      );
      alert("Libro aggiunto con successo!");
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio del libro");
    }
  };

  return (
    <div className="flex justify-center py-5 px-6 mt-15">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[700px] gap-4"
      >
        <h1 className="text-[#0e141b] text-2xl font-bold mb-2">Add New Book</h1>

        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
        />
        <InputField
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN"
        />
        <InputField
          label="Categories"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="Fantasy, Sci-Fi..."
        />
        <InputField
          label="Library Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Shelf A2"
        />
        <InputField
          label="Published Year"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          placeholder="2025"
        />
        <InputField
          label="Number of Pages"
          name="numPages"
          value={formData.numPages}
          onChange={handleChange}
          placeholder="350"
        />
        <AuthorsSelect
          selectedAuthors={selectedAuthors}
          setSelectedAuthors={setSelectedAuthors}
          token={token}
        />

        <div className="flex flex-col gap-1">
          <label className="flex flex-col w-full">
            <p className="text-[#0e141b] text-sm font-medium pb-1">
              Description
            </p>
            <textarea
              name="description"
              placeholder="Book synopsis..."
              className="w-full rounded-md border border-[#d0dbe7] bg-slate-50 px-3 py-2 text-sm"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </label>
        </div>

        {/* Cover upload con anteprima */}
        <div className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-[#d0dbe7] mt-2 p-2">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg shadow-md mb-2 h-80  object-contain"
            />
          ) : (
            <p className="text-sm font-medium mb-2 text-center">Upload Cover</p>
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
          className="w-full rounded-md bg-[#1980e6] text-white py-2 mt-2 font-semibold"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooksPage;
