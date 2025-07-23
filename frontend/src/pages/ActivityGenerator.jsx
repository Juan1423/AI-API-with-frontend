import React, { useState } from "react";
import Navbar from "../components/Navbar";

const ActivityGenerator = () => {
  const [word, setWord] = useState("");
  const [activity, setActivity] = useState(null);

  const generateActivity = () => {
    setActivity(`Dibuja un perro y escribe una historia corta usando la palabra: ${word}`);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-yellow-700 mb-4">Generador de Actividades</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Ingresa una palabra (ej: perro)"
          className="border p-3 rounded w-full max-w-md mb-4"
        />
        <button
          onClick={generateActivity}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
        >
          Generar Actividad
        </button>
        {activity && (
          <div className="mt-6 p-4 bg-white rounded shadow max-w-xl">
            <h2 className="font-semibold text-lg">Actividad:</h2>
            <p>{activity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityGenerator;

