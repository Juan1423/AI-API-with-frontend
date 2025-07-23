import { useState } from 'react';
import axios from 'axios';

function ActivityGenerator() {
  const [word, setWord] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:5000/api/ai/generate', { palabra: word });
    setResponse(res.data.resultado);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Generar actividad con IA</h2>
      <input
        className="border p-2"
        type="text"
        placeholder="Escribe una palabra (ej: perro)"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={handleGenerate} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Generar
      </button>
      {response && <div className="mt-4 p-4 bg-gray-100 rounded">{response}</div>}
    </div>
  );
}
export default ActivityGenerator;