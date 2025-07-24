import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getChildren } from "../services/childService";

const ChildProfile = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await getChildren();
        setChildren(response);
      } catch (error) {
        console.error("Error al cargar los perfiles de niños:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Perfiles de Niños</h1>

        {loading ? (
          <p className="text-gray-600">Cargando perfiles...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => (
              <div key={child._id} className="bg-white p-6 text-black rounded-lg shadow">
                <p><strong>Nombre:</strong> {child.name}</p>
                <p><strong>Edad:</strong> {child.age} años</p>
              
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildProfile;
