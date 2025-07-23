import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Iniciar Sesión
        </h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;


