import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e, cameraRoute) => {
        e.preventDefault();

        const storedUsername = process.env.REACT_APP_USERNAME;
        const storedPassword = process.env.REACT_APP_PASSWORD;

        if (username === storedUsername && password === storedPassword) {
            navigate(cameraRoute);
        } else {
            alert('Las credenciales son incorrectas');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl mb-6">Control de Cámaras Wolke</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <form>
                    <div className="mb-4">
                        <label htmlFor="userInput" className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            type="text"
                            id="userInput"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="passwordInput"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <button type="button" onClick={(e) => handleLogin(e, '/home')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Cámara 1
                        </button>
                        <button type="button" onClick={(e) => handleLogin(e, '/home2')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Cámara 2
                        </button>
                        <button type="button" onClick={(e) => handleLogin(e, '/home3')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Cámara 3
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
