import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const success = await login(
        formData.code,
        formData.password,
        formData.rememberMe
      );
      if (success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Errore login:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading || isLoading) return <Spinner />;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-10 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Accedi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Codice
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Inserisci il tuo codice"
              className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Inserisci la password"
              className="w-full p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300"
              />
              <span>Ricordami</span>
            </label>

            <a
              href="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Password dimenticata?
            </a>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">
              Credenziali errate, riprova.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-400 text-white font-semibold hover:bg-blue-600 transition cursor-pointer"
          >
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
