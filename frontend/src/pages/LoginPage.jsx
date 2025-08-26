import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

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
      await login(formData.code, formData.password, formData.rememberMe);
      navigate("/homepage");
    } catch (err) {
      console.error("Errore login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Benvenuto
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Code */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Codice
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Inserisci il tuo codice"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Inserisci la password"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
              />
              <span>Ricordami</span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Password dimenticata?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-70"
          >
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Non hai un account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Registrati
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
