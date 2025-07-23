import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Bienvenido</h1>
        <p className="text-lg text-gray-700 mb-8">Selecciona una opción para continuar:</p>
        <div className="space-x-4">
          <Link to="/generator" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow">
            Generar Actividades
          </Link>
          <Link to="/profile" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg shadow">
            Ver Perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

