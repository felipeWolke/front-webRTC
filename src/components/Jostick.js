import React, { useMemo, useState } from 'react';
import Connect from '../connect/Connect';

function Joystick({ numberCamera }) {
    const connect = useMemo(() => new Connect(), []);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleMove = async (x, y, zoom) => {
        setIsDisabled(true);

        try {
            const path = `/move`;
            const queryParams = { x, y, zoom, camera: numberCamera };
            console.log('Sending move command to camera');
            const response = await connect.get(path, queryParams);
            console.log('Respuesta de la API:', response);
        } catch (error) {
            console.error('Error al mover la cámara:', error);
        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0, -0.2, 0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Arriba
            </button>
            <div className="flex space-x-10">  {/* Aumento del espacio entre botones */}
                <button
                    disabled={isDisabled}
                    onClick={() => handleMove(-0.2, 0, 0)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                    Izquierda
                </button>
                <button
                    disabled={isDisabled}
                    onClick={() => handleMove(0.2, 0, 0)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                    Derecha
                </button>
            </div>
            <button
                disabled={isDisabled}
                onClick={() => handleMove(0, 0.2, 0)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
                Abajo
            </button>
            <div className="flex space-x-4 mt-4">  {/* Zoom In y Zoom Out al lado del otro */}
                <button
                    disabled={isDisabled}
                    onClick={() => handleMove(0, 0, 0.1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                    Zoom In
                </button>
                <button
                    disabled={isDisabled}
                    onClick={() => handleMove(0, 0, -0.1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                    Zoom Out
                </button>
            </div>
        </div>
    );
}

export default Joystick;
