import { useEffect, useState } from "react";
import { getAllAuthorsName } from "../../services/authorService";

const AuthorsSelect = ({ selectedAuthors, setSelectedAuthors, token }) => {
  const [authors, setAuthors] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllAuthorsName(token).then(setAuthors).catch(console.error);
  }, [token]);

  const filteredAuthors = authors
    .filter((a) => !selectedAuthors.includes(a.id))
    .filter((a) => a.name.toLowerCase().includes(filter.toLowerCase()));

  const handleSelect = (author) => {
    setSelectedAuthors([...selectedAuthors, author.id]);
  };

  const handleRemove = (id) => {
    setSelectedAuthors(selectedAuthors.filter((sid) => sid !== id));
  };

  const selectedAuthorsObjects = authors.filter((a) =>
    selectedAuthors.includes(a.id)
  );

  return (
    <div className="flex flex-col gap-2 py-2 w-full">
      <p className="text-sm font-medium pb-1">Authors</p>

      {/* Tag autori selezionati */}
      <div className="flex flex-wrap gap-2 mb-1">
        {selectedAuthorsObjects.map((author) => (
          <div
            key={author.id}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
          >
            <span>{author.name}</span>
            <button
              type="button"
              onClick={() => handleRemove(author.id)}
              className="text-blue-600 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Input di ricerca */}
      <input
        type="text"
        placeholder="Search authors..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-1 w-full rounded-md border border-[#d0dbe7] px-3 py-1 text-sm"
      />

      {/* Lista autori filtrati */}
      <div className="max-h-10 overflow-y-auto border rounded-md p-1">
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded"
            onClick={() => handleSelect(author)}
          >
            <span>{author.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsSelect;
