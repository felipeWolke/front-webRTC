import React from 'react';

function Login() {

    



    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl mb-6">Control de Cámaras Wolke</h1>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="mb-4">
                        <label htmlFor="userInput" className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input type="text" id="userInput" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="usuario" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input type="password" id="passwordInput" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="contraseña" />
                    </div>
                    <div className="flex justify-center"> 
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Enviar</button>
                    </div>
                </div>
        </div>

    );
}

export default Login;
