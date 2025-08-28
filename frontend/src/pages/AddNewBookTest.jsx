import React, { useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";

const AddNewBookTest = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [categories, setCategories] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [numPages, setNumPages] = useState("");
  const [authorIds, setAuthorIds] = useState(""); // esempio: "1,2"
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ Nessun token trovato. Effettua il login!");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            title,
            isbn,
            categories,
            position,
            description,
            publishedYear: parseInt(publishedYear),
            numPages: parseInt(numPages),
            authorIds: authorIds.split(",").map((id) => parseInt(id)),
          }),
        ],
        { type: "application/json" }
      )
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/books/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Errore durante la creazione del libro"
        );
      }

      const data = await response.json();
      setMessage(`✅ Libro creato! ID: ${data.id}`);
    } catch (error) {
      console.error(error);
      setMessage(`❌ Errore: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-40">
      <h2>Aggiungi Nuovo Libro</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <br />
        <input
          placeholder="Categorie"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        <br />
        <input
          placeholder="Posizione"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          placeholder="Anno pubblicazione"
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />
        <br />
        <input
          placeholder="Numero pagine"
          type="number"
          value={numPages}
          onChange={(e) => setNumPages(e.target.value)}
        />
        <br />
        <input
          placeholder="ID Autori (es. 1,2)"
          value={authorIds}
          onChange={(e) => setAuthorIds(e.target.value)}
        />
        <br />
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        <br />
        <button type="submit">Aggiungi Libro</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddNewBookTest;
