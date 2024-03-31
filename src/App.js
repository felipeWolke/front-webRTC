import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'; // Asume que tienes un componente Home

function App() {
  return (
    
    <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </Router>
  );
}

export default App;
