import { useParams } from 'react-router-dom';

function ChildProfile() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Perfil del Niño</h2>
      <p>ID del niño: {id}</p>
      <p>Aquí puedes mostrar el historial de actividades, métricas de progreso y configuración personalizada.</p>
    </div>
  );
}
export default ChildProfile;