import React from "react";
import Navbar from "../components/Navbar";

const ChildProfile = () => {
  const profile = {
    name: "Luciana Pérez",
    age: 7,
    level: "Intermedio",
    progress: "65%",
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Perfil del Niño</h1>
        <div className="bg-white p-6 rounded-lg shadow max-w-md">
          <p><strong>Nombre:</strong> {profile.name}</p>
          <p><strong>Edad:</strong> {profile.age} años</p>
          <p><strong>Nivel:</strong> {profile.level}</p>
          <p><strong>Progreso:</strong> {profile.progress}</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div className="bg-indigo-600 h-4 rounded-full" style={{ width: profile.progress }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;

