import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import Home3 from './pages/Home3';
import Login from './pages/Login';
import withAuth from './components/WithAuth';  // Importa el HOC
import { Navigate } from 'react-router-dom';

function App() {
  // Aquí se utilizan componentes ya envueltos por el HOC
  const AuthHome = withAuth(Home);
  const AuthHome2 = withAuth(Home2);
  const AuthHome3 = withAuth(Home3);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<AuthHome />} />
        <Route path="/home2" element={<AuthHome2 />} />
        <Route path="/home3" element={<AuthHome3 />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
