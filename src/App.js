import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'; // Asume que tienes un componente Home
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';

function App() {
  return (
    
    <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home2" element={<Home2 />} />
                <Route path="/home3" element={<Home3 />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </Router>
  );
}

export default App;
