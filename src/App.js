import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import Login from './pages/Login';
import withAuth from './components/WithAuth';  // Importa el HOC
import Secondary from './pages/Secondary';
import Secondary2 from './pages/Secondary2';
import Secondary3 from './pages/Secondary3';

function App() {
  // Aquí se utilizan componentes ya envueltos por el HOC
  const AuthHome = withAuth(Home);
  const AuthHome2 = withAuth(Home2);
  const AuthHome3 = withAuth(Home3);
  const AuthSecondary = withAuth(Secondary);
  const AuthSecondary2 = withAuth(Secondary2);
  const AuthSecondary3 = withAuth(Secondary3);

  return (
    <Router>
      <Routes>
        <Route path="/login/:cameraId" element={<Login />} />
        <Route path="/primary" element={<AuthHome />} />
        <Route path="/primary2" element={<AuthHome2 />} />
        <Route path="/primary3" element={<AuthHome3 />} />
        <Route path="/secondary" element={<AuthSecondary />} />
        <Route path="/secondary2" element={<AuthSecondary2 />} />
        <Route path="/secondary3" element={<AuthSecondary3 />} />
        <Route path="/" element={<Navigate replace to="/login/primary" />} /> {/* Cambio para redirigir a un login específico */}
      </Routes>
    </Router>
  );
}

export default App;
