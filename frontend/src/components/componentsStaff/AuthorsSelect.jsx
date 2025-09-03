import { useEffect, useState } from "react";
import { getAllAuthorsName } from "../../services/authorService";

const AuthorsSelectModal = ({
  selectedAuthors,
  setSelectedAuthors,
  onClose,
  token,
}) => {
  const [authors, setAuthors] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllAuthorsName(token).then(setAuthors).catch(console.error);
  }, [token]);

  const toggleSelect = (author) => {
    if (selectedAuthors.find((a) => a.id === author.id)) {
      setSelectedAuthors(selectedAuthors.filter((a) => a.id !== author.id));
    } else {
      setSelectedAuthors([...selectedAuthors, author]);
    }
  };

  const filteredAuthors = authors.filter((a) =>
    a.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white shadow-lg w-96 max-w-full p-6">
        <h2 className="text-xl font-bold mb-4">Seleziona autori</h2>
        <input
          type="text"
          placeholder="Cerca autori..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full mb-3 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="max-h-64 overflow-y-auto mb-4">
          {filteredAuthors.map((author) => (
            <label
              key={author.id}
              className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-100 rounded"
            >
              <input
                type="checkbox"
                checked={!!selectedAuthors.find((a) => a.id === author.id)}
                onChange={() => toggleSelect(author)}
                className="w-4 h-4 text-blue-600"
              />
              <span>{author.name}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2  bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancella
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2  bg-blue-400 text-white hover:bg-blue-600 cursor-pointer"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorsSelectModal;
