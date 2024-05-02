import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e, cameraRoute) => {
        e.preventDefault();
    
        const credentials = { username, password };
        const response = await fetch('https://cams.wolkelab.com/api/login', {  // Asegúrate de tener la URL correcta
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
    
        if (response.ok) {
            const { accessToken } = await response.json();
            localStorage.setItem('token', accessToken);
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
                            WATC001-Cam
                        </button>
                        <button type="button" onClick={(e) => handleLogin(e, '/hom2')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            WATC002-Cam
                        </button>
                        <button type="button" onClick={(e) => handleLogin(e, '/home3')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            WATC003-Cam
                        </button>



                        <button type="button" onClick={(e) => handleLogin(e, '/secondary')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            WATC001-Cam-Secondary
                        </button>
                        <button type="button" onClick={(e) => handleLogin(e, '/secondary2')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            WATC002-Cam-Secondary
                        </button>
                        <button type="button" onClick={(e) => handleLogin(e, '/secondary3')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            WATC003-Cam-Secondary
                        </button>


                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
