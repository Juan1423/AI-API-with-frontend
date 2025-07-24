import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ActivityGenerator from "./pages/ActivityGenerator";
import ChildProfile from "./pages/ChildProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { login } from "./services/authService";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si ya hay un token en localStorage
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

const handleLogin = async (email, password) => {
  try {
    const { token } = await login(email, password);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  } catch (err) {
    console.error("Fallo al inciar sesion: ",err);
  }
};


  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/generator" element={<ProtectedRoute><ActivityGenerator /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ChildProfile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
