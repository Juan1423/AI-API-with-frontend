import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ActivityGenerator from "./pages/ActivityGenerator";
import ChildProfile from "./pages/ChildProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "1234") {
      setIsAuthenticated(true);
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