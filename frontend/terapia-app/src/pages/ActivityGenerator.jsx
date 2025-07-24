import React, { useState, useEffect } from "react";
import { getChildren } from "../services/childService";
import { createActivity } from "../services/activityService";
import Navbar from "../components/Navbar";
import { Volume2, VolumeX } from "lucide-react";
import { generateSpeech } from "../services/ttsServices"; // Import the TTS service

const ActivityGenerator = () => {

  const TIPO_ACTIVIDAD = {
    CUENTO: 'cuento',
    JUEGO: 'juego',
    REPETICION: 'repeticion',
    DIALOGO: 'dialogo',
    RUTINA: 'rutina',
    EMOCIONES: 'emociones'
  };

  const NIVELES_DIFICULTAD = {
    BASICO: 'basico',
    INTERMEDIO: 'intermedio',
    AVANZADO: 'avanzado'
  };

  const [textoGenerado, setTextoGenerado] = useState("");

  const [children, setChildren] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [tema, setTema] = useState([]);
  const [edad, setEdad] = useState([]);
  const [nivelDificultad, setNivelDificultad] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [loading, setLoading] = useState(true);
  const [audioLoading, setAudioLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSelectedChildAge = (childId) => {
    if (!childId) return "";

    const child = children.find(c => c._id === childId);
    return child ? child.age : "";
  };

  const handleChildSelection = (childId) => {
    setSelectedChild(childId);

    // Automáticamente actualizar la edad
    const childAge = getSelectedChildAge(childId);
    setEdad(childAge);
  };

  const fetchChildren = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getChildren();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading

      setChildren(data);
    } catch (err) {
      setError("Error al cargar los niños. Por favor, intenta de nuevo.");
      console.error("Error fetching children:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const generateActivity = async () => {
    try {
      const data = await createActivity({
        child: selectedChild,
        tipo: actividad,
        tema: tema,
        edad: edad,
        nivel: nivelDificultad
      });
      setTextoGenerado(data.contenido);
    } catch (err) {
      console.error("Error generating activity:", err);
      setError("Error al generar la actividad. Por favor, intenta de nuevo.");
      return;
    }
  };

  const playAudioFromAPI = async () => {
  setAudioLoading(true);

  try {
    const response = await generateSpeech(textoGenerado);

    const contentType = response.headers['content-type'];
    if (!contentType.includes('audio')) {
      throw new Error(`Contenido no es audio: ${contentType}`);
    }

    const audioBlob = response.data;
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };

    await audio.play();
    console.log("🔊 Audio reproducido correctamente");

  } catch (error) {
    console.error("Error detallado:", error);
    alert(`No se pudo reproducir el audio: ${error.message}`);
  } finally {
    setAudioLoading(false);
  }
};




  const handleRetry = () => {
    fetchChildren();
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Navbar />
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-700 mb-6 lg:mb-8">
          Generador de Actividades
        </h1>

        <div className="space-y-4 sm:space-y-6 max-w-2xl">
          {/* Children Selection Dropdown */}
          <div>
            <label htmlFor="child-select" className="block text-sm sm:text-base font-medium text-black-700 mb-2">
              Seleccionar Niño:
            </label>

            {loading ? (
              <div className="border border-gray-300 p-3 rounded-lg bg-gray-100 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-700 mr-2"></div>
                <span className="text-black-600">Cargando niños...</span>
              </div>
            ) : error ? (
              <div className="border border-red-300 p-3 rounded-lg bg-red-50">
                <p className="text-red-600 text-sm mb-2">{error}</p>
                <button
                  onClick={handleRetry}
                  className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <select
                id="child-select"
                value={selectedChild}
                onChange={(e) => handleChildSelection(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-sm sm:text-base"
              >
                <option value="">-- Selecciona un niño --</option>
                {children.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.name} ({child.age} años)
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="word-input" className="block text-sm sm:text-base font-medium text-yellow-700 mb-2">
              Tipo Actividad:
            </label>
            <select
              id="actividad"
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-sm sm:text-base"
            >
              <option value="">-- Selecciona un tipo de actividad --</option>
              {Object.values(TIPO_ACTIVIDAD).map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label htmlFor="word-input" className="block text-sm sm:text-base font-medium text-yellow-700 mb-2">
              Tema:
            </label>
            <input
              id="tema"
              type="text"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ingresa una tematica (ej: animales)"
              className="w-full text-black border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="word-input" className="block text-sm sm:text-base font-medium text-yellow-700 mb-2">
              Edad:
            </label>
            <input
              id="edad"
              type="text"
              disabled
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="w-full text-black border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black-sm sm:text-base"
            />
          </div>

          <div>
            <label htmlFor="word-input" className="block text-sm sm:text-base font-medium text-yellow-700 mb-2">
              Nivel:
            </label>
            <select
              id="nivelDificultad"
              value={nivelDificultad}
              onChange={(e) => setNivelDificultad(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-sm sm:text-base"
            >
              <option value="">-- Selecciona el nivel de la actividad--</option>
              {Object.values(NIVELES_DIFICULTAD).map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Generated Activity */}
          {textoGenerado && (
            <div className="mt-6 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <h2 className="font-semibold text-yellow-700 text-lg sm:text-xl mb-3">
                Actividad Generada:
              </h2>
              <p className="text-gray-800 leading-relaxed">{textoGenerado}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Generate Button */}
            <button
              onClick={generateActivity}
              disabled={loading}
              className="w-full sm:w-auto bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              {loading ? "Cargando..." : "Generar Actividad"}
            </button>

            {/* Botón con ícono de bocina */}
            {textoGenerado && (
              <button
                onClick={playAudioFromAPI}
                disabled={audioLoading}
                className="w-full sm:w-auto bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                aria-label={audioLoading ? "Cargando..." : "Generar Actividad"}
              >
                {loading ? (
                  <VolumeX className="w-5 h-5 animate-pulse" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default ActivityGenerator;
