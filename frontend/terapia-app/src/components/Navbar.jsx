import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
    <div className="font-bold text-lg">Mi Plataforma</div>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Inicio</Link>
      <Link to="/generator" className="hover:underline">Actividades</Link>
      <Link to="/profile" className="hover:underline">Perfil</Link>
    </div>
  </nav>
);

export default Navbar;
